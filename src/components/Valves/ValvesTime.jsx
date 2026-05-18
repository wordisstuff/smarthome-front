import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
    startValveTimer,
    stopValve,
    getValvesStatus,
} from '../../redux/valves/operation';
import {
    valvesSelector,
    activeSessionsSelector,
} from '../../redux/valves/selectors';
import CSS from './ValvesTime.module.css';

const ValvesTime = ({ valveNum }) => {
    const dispatch = useDispatch();
    const key = `valve${valveNum}`;

    const valves = useSelector(valvesSelector);
    const activeSessions = useSelector(activeSessionsSelector);

    const [duration, setDuration] = useState(10);
    const [timeLeft, setTimeLeft] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    const activeSession = activeSessions.find(
        session => session.relay === valveNum,
    );

    useEffect(() => {
        dispatch(getValvesStatus());

        const intervalId = setInterval(() => {
            dispatch(getValvesStatus());
        }, 10000);

        return () => clearInterval(intervalId);
    }, [dispatch]);

    useEffect(() => {
        if (!activeSession?.endsAt) {
            setTimeLeft(0);
            return;
        }

        const tick = () => {
            const diff = new Date(activeSession.endsAt).getTime() - Date.now();
            setTimeLeft(Math.max(0, Math.floor(diff / 1000)));
        };

        tick();

        const intervalId = setInterval(tick, 1000);
        return () => clearInterval(intervalId);
    }, [activeSession?.endsAt]);

    const handleStart = () => {
        dispatch(startValveTimer({ relay: valveNum, minutes: duration }));
        setIsOpen(false);
    };

    const handleStop = () => {
        dispatch(stopValve({ relay: valveNum }));
        setIsOpen(false);
    };

    const formatTime = sec => {
        const m = Math.floor(sec / 60)
            .toString()
            .padStart(2, '0');
        const s = (sec % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    return (
        <>
            <button
                className={CSS.openButton}
                onClick={() => setIsOpen(prev => !prev)}
            >
                💧
            </button>

            {valves[key] && (
                <div className={CSS.miniTimer}>{formatTime(timeLeft)}</div>
            )}

            {isOpen && (
                <div className={CSS.panel}>
                    <div className={CSS.panelHeader}>
                        <strong>Zone {valveNum}</strong>
                        <button onClick={() => setIsOpen(false)}>×</button>
                    </div>

                    <div className={CSS.quickButtons}>
                        {[5, 10, 15, 20].map(min => (
                            <button
                                key={min}
                                className={duration === min ? CSS.selected : ''}
                                onClick={() => setDuration(min)}
                                disabled={valves[key]}
                            >
                                {min}
                            </button>
                        ))}
                    </div>

                    {!valves[key] ? (
                        <button
                            className={CSS.startButton}
                            onClick={handleStart}
                        >
                            Start {duration} min
                        </button>
                    ) : (
                        <button className={CSS.stopButton} onClick={handleStop}>
                            Stop watering
                        </button>
                    )}

                    <div className={CSS.status}>
                        {valves[key]
                            ? `Watering • ${formatTime(timeLeft)} left`
                            : 'Idle'}
                    </div>
                </div>
            )}
        </>
    );
};

export default ValvesTime;

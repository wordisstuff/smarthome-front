import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import { valvesTogle } from '../../redux/valves/operation';
import { valvesSelector } from '../../redux/valves/selectors';
import CSS from './ValvesTime.module.css';

const ValvesTime = ({ valveNum }) => {
    const dispatch = useDispatch();
    const key = `valve${valveNum}`;
    const valves = useSelector(valvesSelector);

    const [duration, setDuration] = useState(10); // хвилини
    const [isTiming, setIsTiming] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0); // секунди
    const timerRef = useRef(null);

    const handleStart = () => {
        const totalSeconds = duration * 60;
        setTimeLeft(totalSeconds);
        setIsTiming(true);

        dispatch(valvesTogle({ state: true, relay: valveNum }));

        timerRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timerRef.current);
                    dispatch(valvesTogle({ state: false, relay: valveNum }));
                    setIsTiming(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    useEffect(() => {
        return () => clearInterval(timerRef.current); // очистити таймер при розмонтуванні
    }, []);

    const formatTime = sec => {
        const m = Math.floor(sec / 60)
            .toString()
            .padStart(2, '0');
        const s = (sec % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    const progress = isTiming ? 100 - (timeLeft / (duration * 60)) * 100 : 0;

    return (
        <div className={CSS.valves}>
            <label className={CSS.switch}>
                <input
                    type="checkbox"
                    checked={valves[key]}
                    onChange={() =>
                        dispatch(
                            valvesTogle({
                                state: !valves[key],
                                relay: valveNum,
                            }),
                        )
                    }
                    disabled={isTiming}
                />
                <span className={CSS.slider}></span>
            </label>

            <div className={CSS.controls}>
                <select
                    value={duration}
                    onChange={e => setDuration(Number(e.target.value))}
                    disabled={isTiming}
                >
                    <option value={20}>20 min</option>
                    <option value={10}>10 min</option>
                    <option value={15}>15 min</option>
                </select>

                <button
                    onClick={handleStart}
                    disabled={isTiming || valves[key]}
                >
                    Start {duration} min
                </button>
            </div>

            {isTiming && (
                <>
                    <div className={CSS.timer}>
                        Залишилось: <strong>{formatTime(timeLeft)}</strong>
                    </div>
                    <div className={CSS.progressBar}>
                        <div
                            className={CSS.progressFill}
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ValvesTime;

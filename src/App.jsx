import { useEffect } from 'react';
import './App.css';
import { getValvesStatus } from './redux/valves/operation';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { valvesSelector } from './redux/valves/selectors';
import ValvesTime from './components/Valves/ValvesTime';
import icons from './icons/icons.svg';

function Sprinkler({ pos, active }) {
    return (
        <svg
            className={clsx('sprinklerIcon', `sprinklPos${pos}`, {
                sprinklerOn: active,
            })}
        >
            <use xlinkHref={`${icons}#sprinkler`} />
        </svg>
    );
}

function App() {
    const dispatch = useDispatch();
    const valves = useSelector(valvesSelector);

    useEffect(() => {
        dispatch(getValvesStatus());
    }, [dispatch]);

    return (
        <main className="container">
            <header className="topBar">
                <div>
                    <p className="label">Smart irrigation</p>
                    <h1>Yard Control</h1>
                </div>

                <div className="onlineBadge">
                    <span></span>
                    Online
                </div>
            </header>

            <section className="map">
                <div className="row rowTop">
                    {/* <div className="zone garage">Garage</div> */}

                    <div
                        className={clsx('zone grass', {
                            activeZone: valves.valve1,
                        })}
                    >
                        <div className="zoneTitle">
                            <span>Grass</span>
                            <small>{valves.valve1 ? 'Watering' : 'Idle'}</small>
                        </div>

                        <ValvesTime valveNum={1} />

                        {[1, 2, 3, 4, 5, 6, 11].map(pos => (
                            <Sprinkler
                                key={pos}
                                pos={pos}
                                active={valves.valve1}
                            />
                        ))}
                    </div>
                </div>

                <div className="row rowBottom">
                    <div
                        className={clsx('zone garden', {
                            activeZone: valves.valve2,
                        })}
                    >
                        <div className="zoneTitle">
                            <span>Garden</span>
                            <small>{valves.valve2 ? 'Watering' : 'Idle'}</small>
                        </div>

                        <ValvesTime valveNum={2} />

                        {[7, 8, 9, 10].map(pos => (
                            <Sprinkler
                                key={pos}
                                pos={pos}
                                active={valves.valve2}
                            />
                        ))}
                    </div>

                    {/* <div className="zone patio">Patio</div> */}
                    {/* <div className="zone sunroom">Sun room</div> */}
                </div>
            </section>
        </main>
    );
}

export default App;

import { useEffect } from 'react';
import './App.css';
import Valves from './components/Valves/Valves';
import { getValvesStatus } from './redux/valves/operation';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { valvesSelector } from './redux/valves/selectors';
import ValvesTime from './components/Valves/ValvesTime';
import icons from './icons/icons.svg';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getValvesStatus());
    }, [dispatch]);
    const valves = useSelector(valvesSelector);

    return (
        <div className="container">
            <div className="gg">
                <div className="garage">Garage</div>
                <div className="grass">
                    Grass
                    <Valves valveNum={1} />
                    <ValvesTime valveNum={1} />
                    <span>
                        <svg
                            className={clsx('icon', {
                                sprinklPos1: true,
                                sprinkl: true,
                                sprinklOn: valves.valve1,
                            })}
                        >
                            <use xlinkHref={`${icons}#sprinkler`} />
                        </svg>
                    </span>
                    <span>
                        <svg
                            className={clsx('icon', {
                                sprinklPos2: true,
                                sprinkl: true,
                                sprinklOn: valves.valve1,
                            })}
                        >
                            <use xlinkHref={`${icons}#sprinkler`} />
                        </svg>
                    </span>
                    <span>
                        <svg
                            className={clsx('icon', {
                                sprinklPos3: true,
                                sprinkl: true,
                                sprinklOn: valves.valve1,
                            })}
                        >
                            <use xlinkHref={`${icons}#sprinkler`} />
                        </svg>
                    </span>
                    <span>
                        <svg
                            className={clsx('icon', {
                                sprinklPos4: true,
                                sprinkl: true,
                                sprinklOn: valves.valve1,
                            })}
                        >
                            <use xlinkHref={`${icons}#sprinkler`} />
                        </svg>
                    </span>
                    <span>
                        <svg
                            className={clsx('icon', {
                                sprinklPos5: true,
                                sprinkl: true,
                                sprinklOn: valves.valve1,
                            })}
                        >
                            <use xlinkHref={`${icons}#sprinkler`} />
                        </svg>
                    </span>
                    <span>
                        <svg
                            className={clsx('icon', {
                                sprinklPos6: true,
                                sprinkl: true,
                                sprinklOn: valves.valve1,
                            })}
                        >
                            <use xlinkHref={`${icons}#sprinkler`} />
                        </svg>
                    </span>
                    <span>
                        <svg
                            className={clsx('icon', {
                                sprinklPos11: true,
                                sprinkl: true,
                                sprinklOn: valves.valve1,
                            })}
                        >
                            <use xlinkHref={`${icons}#sprinkler`} />
                        </svg>
                    </span>
                </div>
            </div>
            <div className="gg">
                <div className="garden">
                    <div className="gardenTop">
                        Garden
                        <Valves valveNum={2} />
                        <ValvesTime valveNum={2} />
                    </div>
                    <div className="gardenGarag">
                        <div className="bottomGarden"></div>
                        <div className="gardenG"> Garag</div>
                    </div>
                    <span
                        className={clsx({
                            sprinklPos7: true,
                            sprinkl: true,
                            sprinklOn: valves.valve2,
                        })}
                    >
                        {' '}
                    </span>
                    <span
                        className={clsx({
                            sprinklPos8: true,
                            sprinkl: true,
                            sprinklOn: valves.valve2,
                        })}
                    >
                        {' '}
                    </span>
                    <span
                        className={clsx({
                            sprinklPos9: true,
                            sprinkl: true,
                            sprinklOn: valves.valve2,
                        })}
                    >
                        {' '}
                    </span>
                    <span
                        className={clsx({
                            sprinklPos10: true,
                            sprinkl: true,
                            sprinklOn: valves.valve2,
                        })}
                    >
                        {' '}
                    </span>
                </div>
                <div className="patio">Patio</div>
                <div className="sunroom">Sun room</div>
            </div>
        </div>
    );
}

export default App;

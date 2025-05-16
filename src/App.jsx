import { useEffect } from 'react';
import './App.css';
import Valves from './components/Valves/Valves';
import { getValvesStatus } from './redux/valves/operation';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { valvesSelector } from './redux/valves/selectors';

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
                    <span
                        className={clsx({
                            sprinklPos1: true,
                            sprinkl: true,
                            sprinklOn: valves.valve1,
                        })}
                    >
                        {' '}
                    </span>
                    <span
                        className={clsx({
                            sprinklPos2: true,
                            sprinkl: true,
                            sprinklOn: valves.valve1,
                        })}
                    >
                        {' '}
                    </span>
                    <span
                        className={clsx({
                            sprinklPos3: true,
                            sprinkl: true,
                            sprinklOn: valves.valve1,
                        })}
                    >
                        {' '}
                    </span>
                    <span
                        className={clsx({
                            sprinklPos4: true,
                            sprinkl: true,
                            sprinklOn: valves.valve1,
                        })}
                    >
                        {' '}
                    </span>
                    <span
                        className={clsx({
                            sprinklPos5: true,
                            sprinkl: true,
                            sprinklOn: valves.valve1,
                        })}
                    >
                        {' '}
                    </span>
                    <span
                        className={clsx({
                            sprinklPos6: true,
                            sprinkl: true,
                            sprinklOn: valves.valve1,
                        })}
                    >
                        {' '}
                    </span>
                </div>
            </div>
            <div>
                <div>Garden</div>
                <div>Sun room</div>
            </div>
            <Valves valveNum={2} />
        </div>
    );
}

export default App;

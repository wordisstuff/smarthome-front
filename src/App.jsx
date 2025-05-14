import axios from 'axios';
import { useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { getValvesStatus, valvesTogle } from './redux/valves/operation';
import { valvesSelector } from './redux/valves/selectors';

function App() {
    const dispatch = useDispatch();

    const valves = useSelector(valvesSelector);
    console.log('valves', valves);
    useEffect(() => {
        dispatch(getValvesStatus());
    }, [dispatch, valves]);

    return (
        <>
            <div className="card">
                <label className="switch">
                    {' '}
                    v1
                    <input
                        type="checkbox"
                        checked={valves.valve1}
                        onChange={() =>
                            dispatch(
                                valvesTogle({
                                    state: !valves.valve1,
                                    relay: 1,
                                }),
                            )
                        }
                    />
                    <span className="slider"></span>
                </label>
                <label className="switch">
                    {' '}
                    v2
                    <input
                        type="checkbox"
                        checked={valves.valve2}
                        onClick={() =>
                            dispatch(
                                valvesTogle({
                                    state: !valves.valve2,
                                    relay: 2,
                                }),
                            )
                        }
                    />
                    <span className="slider"></span>
                </label>
            </div>
        </>
    );
}

export default App;

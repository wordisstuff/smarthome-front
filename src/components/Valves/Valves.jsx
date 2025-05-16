import { useDispatch, useSelector } from 'react-redux';
import { valvesTogle } from '../../redux/valves/operation';
import { valvesSelector } from '../../redux/valves/selectors';
import CSS from './Valve.module.css';

const Valves = ({ valveNum }) => {
    const dispatch = useDispatch();
    const key = `valve${valveNum}`;
    const valves = useSelector(valvesSelector);
    console.log('valves', valves);

    return (
        <>
            <div className={CSS.valves}>
                <label className={CSS.switch}>
                    {' '}
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
                    />
                    <span className={CSS.slider}></span>
                </label>
            </div>
        </>
    );
};

export default Valves;

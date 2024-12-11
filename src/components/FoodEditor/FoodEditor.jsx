import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux';
import { removeFood } from '../../reducers/foodReducer';

function FoodEditor({ food }) {
    const dispatch = useDispatch();

    async function removeFoodHandler(food) {
        dispatch(removeFood(food));
    }

    return (
        <div>
            {food.map(e => (
                <div key={e.id} style={{ marginBottom: '20px' }}>
                    <p>{e.name}</p>
                    <p>{e.calories}</p>
                    <button style={{color: "red"}} onClick={() => removeFoodHandler(e)}>Delete</button>
                </div>
            ))}
        </div>
    );
}

export default FoodEditor

import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux';
import { removeExercise } from '../../reducers/exerciseReducer';

function ExerciseEditor({ exercises }) {
    const dispatch = useDispatch();

    async function removeExerciseHandler(exercise) {
        dispatch(removeExercise(exercise));
    }

    return (
        <div>
            {exercises.map(e => (
                <div key={e.id} style={{ marginBottom: '20px' }}>
                    <p>{e.name}</p>
                    {e.sets.map((s, idx) => (
                        <div key={s._id} style={{ marginBottom: '10px' }}>
                            <p>Set {idx + 1}:</p>
                            <p style={{ paddingLeft: '20px' }}>Reps: {s.reps}</p>
                            <p style={{ paddingLeft: '20px' }}>Weight: {s.weight} kg</p>
                            <p style={{ paddingLeft: '20px' }}>
                                Status: {s.isCompleted ? '✅ Completed' : '❌ Not Completed'}
                            </p>
                        </div>
                    ))}
                    <button style={{color: "red"}} onClick={() => removeExerciseHandler(e)}>Delete</button>
                </div>
            ))}
        </div>
    );
}

ExerciseEditor.propTypes = {
    exercises: PropTypes.arrayOf({

    })
}

export default ExerciseEditor

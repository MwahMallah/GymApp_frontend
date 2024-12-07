import PropTypes from 'prop-types'
import SetItem from '../SetItem/SetItem';

function ExerciseListItem({exercise}) {
    const date = new Date(exercise.date);  
    const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
 
    return (
        <div>
            <h3>{dayOfWeek}</h3>
            <p>{exercise.name}</p> 
            <div>
                {exercise.sets.map(set => (
                    <SetItem key={set._id} set={set} /> 
                ))}
            </div>
        </div>
    );
}

ExerciseListItem.propTypes = {
    exercise: PropTypes.shape({
        date: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        sets: PropTypes.arrayOf({
            _id: PropTypes.string.isRequired
        })
    })
}

export default ExerciseListItem

import PropTypes from "prop-types"
import ExerciseListItem from "../ExerciseListItem/ExerciseListItem"

function ExerciseList({exercises}) {
    return (
        <div>
            {exercises.map(e => <ExerciseListItem key={e.id} exercise={e}/>)}
        </div>
    )
}

ExerciseList.propTypes = {
    exercises: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    }))
}

export default ExerciseList
import PropTypes from 'prop-types'

function SetItem({set}) {
    console.log(set)
    return (
        <div>
            <p>Weight: {set.weight} kg</p>
            <p>Reps: {set.reps}</p>
            <p>Status: {set.isCompleted ? '✅ Completed' : '❌ Not Completed'}</p>
        </div>
    )
}

SetItem.propTypes = {
    set: PropTypes.shape({
        weight: PropTypes.number.isRequired,
        reps: PropTypes.number.isRequired,        
        isCompleted: PropTypes.bool.isRequired,        
    })
}

export default SetItem

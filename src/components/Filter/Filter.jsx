import PropTypes from "prop-types";

function Filter({handleInputChange}) {
    return (
        <div>
            <p>Filter by name</p>
            <input type="text" name="" onChange={handleInputChange}/>
        </div>
    )
}

Filter.propTypes = {
    handleInputChange: PropTypes.func.isRequired
}

export default Filter


import PropTypes from "prop-types"

function Input({name, label, changeHandler}) {
    return (
        <>
            <label htmlFor={name}>{label}</label>
            <input onChange={changeHandler} type="text" name={name} id={name} className='border-2 p-2 border-gray-400 rounded-lg'/>
        </>
    )
}

Input.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    changeHandler: PropTypes.func.isRequired
};

export default Input
import PropTypes from "prop-types"

function Button({name, type, enabled}) {
    return (
        <button type={type} 
            className={`px-4 py-3 rounded-xl text-white transition-colors duration-300 ${
                enabled
                    ? "bg-gray-400 hover:bg-elements cursor-pointer"
                    : "bg-gray-300 cursor-not-allowed"
            }`}
            disabled={!enabled}>{name}</button>
    )
}

Button.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    enabled: PropTypes.bool.isRequired
};

export default Button
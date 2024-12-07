import PropTypes from 'prop-types'

function Selector({options, handleSelectionChange}) {
    return (
        <select onChange={handleSelectionChange}>
            <option value="">Not chosen</option>
            {options.map(o => 
                <option key={o} value={o}>{o}</option>
            )}
        </select>
    )
}

Selector.propTypes = {
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    handleSelectionChange: PropTypes.func
}

export default Selector

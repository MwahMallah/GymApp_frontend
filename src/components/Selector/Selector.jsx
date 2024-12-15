import PropTypes from 'prop-types'

function Selector({options, handleSelectionChange}) {
    return (
        <select className='bg-background rounded-3xl p-2' onChange={handleSelectionChange}>
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

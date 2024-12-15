/*
 * Author: Maksim Dubrovin, Ilya Volkov
 * Login: xdubro01, xvolko05
 */

import PropTypes from 'prop-types'

function Selector({options, handleSelectionChange, selectedOption}) {
    return (
        <select className='bg-background rounded-3xl p-2' value={selectedOption} onChange={handleSelectionChange}>
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

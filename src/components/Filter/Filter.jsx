/*
 * Author: Maksim Dubrovin
 * Login: xdubro01
 */

import PropTypes from "prop-types";

function Filter({ handleInputChange, clearFilter, filterText }) {
    return (
        <div>
            <div className="relative">
                <input
                    placeholder="Filter..."
                    className="card w-full p-2 my-3 border-2 bg-background pr-10"
                    type="text"
                    onChange={handleInputChange}
                    value={filterText}
                />
                <button
                    onClick={clearFilter}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-black">
                    &#10005;
                </button>
            </div>
        </div>
    );
}

Filter.propTypes = {
    handleInputChange: PropTypes.func.isRequired,
    clearFilter: PropTypes.func.isRequired,
    filterText: PropTypes.string.isRequired
}

export default Filter


import { useSelector } from "react-redux";
import { useState } from "react";
import Filter from "../../components/Filter/Filter"
import PropTypes from "prop-types";

function AddedFriendsList({onDetailsClick}) {
    const [filterText, setFilterText] = useState('');
    const friends = useSelector(({user}) => user.friends);
    const filteredFriends = friends.filter(f => f.username.startsWith(filterText));    

    function filterInputChanged(e) {
        const content = e.target.value;
        setFilterText(content);
    }

    function clearFilter() {
        setFilterText("");
    }

    return (
        <>
            <h2 className="text-lg text-center pb-2 pl-5">Added users</h2>
            <Filter handleInputChange={filterInputChanged} 
                filterText={filterText} 
                clearFilter={clearFilter}/>
            <div className="flex flex-col gap-4">
                {filteredFriends.map(f =>(
                    <div key={f.id} className="flex flex-row justify-between items-center w-full px-10 border-b-2 py-4">
                        <div className="flex-grow flex flex-row items-center gap-3">
                            <img src={f.photo_url} className='w-5 h-5'/>
                            <span className='text-lg'>{f.username}</span>
                        </div>
                        <button onClick={() => onDetailsClick(f.id)} 
                            className='text-white bg-primary p-3 rounded-3xl'>
                            Details
                        </button>
                    </div>) 
                )}
            </div>
        </>
    )
}

AddedFriendsList.propTypes = {
    onDetailsClick: PropTypes.func.isRequired
};

export default AddedFriendsList
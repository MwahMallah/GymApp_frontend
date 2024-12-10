import FriendsList from "../FriendList/FriendsList"
import Filter from "../Filter/Filter"
import { useState } from "react"

function FriendsSection() {
    const [filterText, setFilterText] = useState("");
    const [swipe, setSwipe] = useState(null);
    const [selectedFriend, setSelectedFriend] = useState(null);

    function filterFriends(e) {
        const newFilterText = e.target.value;
        setFilterText(newFilterText);
    }

    function clearFilter() {
        setFilterText('');
    }

    function friendSelect(friend) {
        setSwipe('left');
        setTimeout(() => { setSwipe(null); setSelectedFriend(friend);}, 420);
    }
    
    function backToList() {
        setSelectedFriend(null);
    }

    let transform = '';
    if (swipe === 'right') {
        transform = 'translate-x-80';
    } else if (swipe === 'left') {
        transform = '-translate-x-80';
    }

    if (selectedFriend !== null) {
        return (
            <div className="card col-span-1 rounded-3xl overflow-clip">
                <div className={`transform transition-all duration-500`}> 
                    <button onClick={backToList}>Back</button>
                    <h2>Selected {selectedFriend.username}</h2>
                </div>
            </div>
        )
    }

    return (
        <div className="card col-span-1 rounded-3xl overflow-clip">
            <div className={`transform transition-all duration-500 ${transform}`}>
                <h2>Friend List</h2>
                <Filter 
                    handleInputChange={filterFriends} 
                    clearFilter={clearFilter} 
                    filterText={filterText}/>
                <FriendsList filter={filterText} onFriendClick={friendSelect}/>
            </div>
        </div>
    )
}

export default FriendsSection
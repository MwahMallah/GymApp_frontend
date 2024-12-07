import FriendsList from "../FriendList/FriendsList"
import Filter from "../Filter/Filter"
import { useState } from "react"

function FriendsSection() {
    const [filterText, setFilterText] = useState("");

    function filterFriends(e) {
        const newFilterText = e.target.value;
        setFilterText(newFilterText);
    }

    return (
        <div>
            <h2>Friend List</h2>
            <Filter handleInputChange={filterFriends}/>
            <FriendsList filter={filterText}/>
        </div>
    )
}

export default FriendsSection
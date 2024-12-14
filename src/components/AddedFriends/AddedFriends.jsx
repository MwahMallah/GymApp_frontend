import { useState } from "react";

import AddedFriendsList from "../AddedFriendsList/AddedFriendsList";
import FriendDetails from "../FriendDetails/FriendDetails";

function AddedFriends() {
    const [chosenFriendId, setChosenFriendId] = useState(null);

    function onDetailsClick(friendId) {
        setChosenFriendId(friendId);
    }

    function handleBackClick() {
        setChosenFriendId(null);
    }

    if (chosenFriendId !== null) {
        return <FriendDetails friendId={chosenFriendId} 
            handleBackClick={handleBackClick}/>
    }

    return (
        <div className="pt-4 flex-grow mr-8">
            <AddedFriendsList onDetailsClick={onDetailsClick}/>
        </div>   
    )
}

export default AddedFriends
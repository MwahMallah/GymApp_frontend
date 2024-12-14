import PropTypes from "prop-types"
import { useEffect, useState } from "react"
import { getFriendServer } from "../../services/friendService";
import { SpinnerCircular } from 'spinners-react';
import FriendVsUserGraph from "../FriendVsUserGraph/FriendVsUserGraph";


function FriendDetails({friendId, handleBackClick}) {
    const [friend, setFriend] = useState(null);

    useEffect(() => {
        getFriendServer(friendId)
            .then(retreivedFriend => setFriend(retreivedFriend));
    }, [friendId]);

    if (friend === null) {
        return <div className='bg-background flex-grow flex items-center justify-center'>
            <SpinnerCircular/>
        </div> 
    }

    return (
        <div className="relative flex flex-col items-center h-full flex-grow p-5">
            <button 
                className="absolute top-2 left-2 bg-gray-200 rounded-full px-4 py-2 hover:bg-gray-300"
                onClick={handleBackClick}>
                ← Back
            </button>
            <img src={friend.photo_url} className="w-28 h-28" alt="" />
            <h2 className="text-lg">{friend.name}</h2>

            <div className="flex-grow mr-8 w-full">
                <FriendVsUserGraph friend={friend}/>
            </div>
        </div>
    )
}

FriendDetails.propTypes = {
    friendId: PropTypes.string.isRequired,
    handleBackClick: PropTypes.func.isRequired
}

export default FriendDetails
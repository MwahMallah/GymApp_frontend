import PropTypes from "prop-types";
import { useSelector } from "react-redux"

function FriendsList({filter, onFriendClick}) {
    const friends = useSelector(({user}) => user.friends);
    const filteredFriends = friends.filter(f => f.username.startsWith(filter));

    return (
        <div className="flex flex-col gap-5 my-3">
            {filteredFriends.map(friend => 
                <div 
                    key={friend.id} 
                    className="flex flex-row gap-5 card items-center cursor-pointer 
                               border border-2 border-transparent rounded-md p-2 
                               transition-all duration-300 hover:border-primary"
                    onClick={() => onFriendClick(friend)}>
                    <img className="w-10 h-10" src={friend.photo_url} alt="friend photo" />
                    <p key={friend.id}>{friend.username}</p>
                </div>
            )}
        </div>
    )
}

FriendsList.propTypes = {
    filter: PropTypes.string,
    onFriendClick: PropTypes.func.isRequired
}

export default FriendsList
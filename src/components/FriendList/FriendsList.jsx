import PropTypes from "prop-types";
import { useSelector } from "react-redux"

function FriendsList({filter}) {
    const friends = useSelector(({user}) => user.friends);
    const filteredFriends = friends.filter(f => f.username.startsWith(filter));

    console.log(filter);
    
    return (
        <div>
            {filteredFriends.map(friend => 
                <p key={friend.id}>{friend.username}</p>
            )}
        </div>
    )
}

FriendsList.propTypes = {
    filter: PropTypes.string
}

export default FriendsList
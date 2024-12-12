import PropTypes from "prop-types";
import { useSelector } from "react-redux"
import FriendItem from "../FriendItem/FriendItem";
import { useEffect, useState } from "react";
import { getUnseenMessages } from "../../services/messageService";

function FriendsList({filter, onFriendClick}) {
    const user = useSelector(({user}) => user);
    const friends = useSelector(({user}) => user.friends);
    const [unseenMessages, setUnseenMessages] = useState([]);

    useEffect(() => {
        getUnseenMessages(user.id)
            .then(newUnseenMessages => {
                setUnseenMessages(newUnseenMessages)
            });
    }, []);

    const filteredFriends = friends.filter(f => f.username.startsWith(filter));
    
    return (
        <div className="flex flex-col gap-5 my-3">
            {filteredFriends.map(friend => {
                const msgFromFriend = unseenMessages
                    .filter(m => m.from === friend.username).length;

                return (
                    <FriendItem  
                        key={friend.id} 
                        onClick={() => onFriendClick(friend)} 
                        friend={friend}
                        unseenMessages={msgFromFriend}/>
                );
            } 
            )}
        </div>
    )
}

FriendsList.propTypes = {
    filter: PropTypes.string,
    onFriendClick: PropTypes.func.isRequired
}

export default FriendsList
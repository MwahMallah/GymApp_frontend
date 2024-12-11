import PropTypes from "prop-types";

function FriendItem({ friend, onClick, unseenMessages }) {
    return (
        <div 
            className="relative flex flex-row items-center gap-5 card cursor-pointer 
                       border-2 border-transparent rounded-md p-2 
                       transition-all duration-300 hover:border-primary"
            onClick={() => onClick(friend)}
        >
            <img 
                className="w-10 h-10 rounded-full object-cover" 
                src={friend.photo_url} 
                alt="friend photo" 
            />
            <span className="font-medium text-gray-700">{friend.username}</span>
            {unseenMessages > 0 && (
                <span 
                    className="absolute right-2 bg-primary text-white 
                               rounded-full w-10 h-10 flex items-center justify-center 
                               font-bold">
                    {unseenMessages}
                </span>
            )}
        </div>
    );
}

FriendItem.propTypes = {
    friend: PropTypes.shape({
        username: PropTypes.string.isRequired,
        photo_url: PropTypes.string.isRequired
    }).isRequired,
    unseenMessages: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired
};

export default FriendItem
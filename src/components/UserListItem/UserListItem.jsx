import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

function UserListItem({user, handleAdd, handleRemove}) {
    const authorizedUser = useSelector(({user}) => user);

    if (authorizedUser.friends.some(f => f.id === user.id)) {
        return (
            <div className="flex flex-row justify-between items-center w-full px-10 border-b-2 py-4">
                <div className="flex-grow flex flex-row items-center gap-3">
                    <img src={user.photo_url} className='w-5 h-5'/>
                    <span className='text-lg'>{user.username}</span>
                </div>
                <button className='text-white bg-red-600 p-3 rounded-3xl' 
                    onClick={handleRemove}>Remove friend</button>
            </div>
        );
    }

    return (
        <div className="flex flex-row justify-between items-center w-full px-10 border-b-2 py-4">
            <div className="flex-grow flex flex-row items-center gap-3">
                <img src={user.photo_url} className='w-5 h-5'/>
                <span className='text-lg'>{user.username}</span>
            </div>
            <button className='text-white bg-primary p-3 rounded-3xl' 
                onClick={handleAdd}>Be friends</button>
        </div>
    );
}

UserListItem.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        photo_url: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired
    }),
    handleAdd: PropTypes.func.isRequired,
    handleRemove: PropTypes.func.isRequired,
}

export default UserListItem

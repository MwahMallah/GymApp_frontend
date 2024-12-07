import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

function UserListItem({user, handleAdd, handleRemove}) {
    const authorizedUser = useSelector(({user}) => user);

    if (authorizedUser.friends.some(f => f.id === user.id)) {
        return <div>
            {user.username}
            <button onClick={handleRemove} style={{color: "red"}}>Remove friend</button>
        </div>
    }

    return (
        <div>
            {user.username}
            <button onClick={handleAdd}>Be friends</button>
        </div>
    )
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

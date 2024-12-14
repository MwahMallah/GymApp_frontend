import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getAllUsers, addFriend, removeFriend } from "../../reducers/allUsersReducer";
import UserListItem from "../UserListItem/UserListItem";


function UserList() {
    const allUsers = useSelector(({allUsers, user}) => 
        allUsers.filter(u => u.id != user.id));
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch])

    function addFriendHandler(id) {
        return function () {
            dispatch(addFriend(id));
        }
    }

    function removeFriendHandler(id) {
        return function () {
            dispatch(removeFriend(id));
        }
    }

    return (
        <div className="flex flex-col gap-4">
            {allUsers.map(user => 
                <UserListItem key={user.id} user={user} 
                    handleAdd={addFriendHandler(user.id)}
                    handleRemove={removeFriendHandler(user.id)}/>
            )}
        </div>
    )
}

export default UserList
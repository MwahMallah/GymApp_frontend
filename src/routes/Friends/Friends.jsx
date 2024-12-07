import UserList from "../../components/UserList/UserList"
import Filter from "../../components/Filter/Filter"
import { useDispatch } from "react-redux";
import { setAllUsersFiltered } from "../../reducers/allUsersReducer";

function Friends() {
    const dispatch = useDispatch();

    function filterUsers(e) {
        const content = e.target.value;
        dispatch(setAllUsersFiltered(content));
    }

    return (
        <div>
            <h2>All users</h2>
            <Filter handleInputChange={filterUsers}/>
            <UserList />
        </div>
    )
}

export default Friends
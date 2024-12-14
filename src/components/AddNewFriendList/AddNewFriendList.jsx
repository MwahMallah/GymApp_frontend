import UserList from "../../components/UserList/UserList"
import Filter from "../../components/Filter/Filter"
import { useDispatch } from "react-redux";
import { setAllUsersFiltered } from "../../reducers/allUsersReducer";
import { useState } from "react";


function AddNewFriendList() {
    const [filterText, setFilterText] = useState('');

    const dispatch = useDispatch();
    function filterUsers(e) {
        const content = e.target.value;
        dispatch(setAllUsersFiltered(content));
        setFilterText(e.target.value);
    }

    function clearFilter() {
        dispatch(setAllUsersFiltered(""));
        setFilterText("");
    }
    
    return (
        <div className="pt-4 flex-grow mr-8">
            <h2 className="text-lg text-center pb-2 pl-5">Manage friends</h2>
            <Filter handleInputChange={filterUsers} 
                filterText={filterText} 
                clearFilter={clearFilter}/>
            <UserList />
        </div>    
    )
}

export default AddNewFriendList
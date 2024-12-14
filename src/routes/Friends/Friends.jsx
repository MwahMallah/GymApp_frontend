import { useState } from "react";
import AddNewFriendList from "../../components/AddNewFriendList/AddNewFriendList";
import AddedFriends from "../../components/AddedFriends/AddedFriends";

function Friends() {
    const [section, setSection] = useState('added_friends');

    function navSectionStyle(sectionName) {
        return section === sectionName
            ? 'text-lg cursor-pointer bg-primary text-white w-full p-2 pl-5'
            : 'text-lg cursor-pointer p-2 pl-5 hover:text-primary-muted';
    }

    function mainSection() {
        switch (section) {
        case 'added_friends':
            return <AddedFriends />
        case 'new_friends':
            return <AddNewFriendList />;
        }
    }

    let addedFriendsStyle = navSectionStyle('added_friends');
    addedFriendsStyle += ' rounded-tl-3xl pt-4'
    let newFriendsStyle = navSectionStyle('new_friends');

    return (
        <div className="card px-0 py-0 h-full rounded-3xl mx-8 mb-10 flex flex-row gap-7">
            <div className="h-full w-[200px] border-r-2 border-gray-200">
                <nav className="flex flex-col items-start gap-2 w-full">
                    <p className={addedFriendsStyle} onClick={() => setSection('added_friends')}>Added friends</p>
                    <p className={newFriendsStyle} onClick={() => setSection('new_friends')}>Manage friends</p>
                </nav>
            </div>
            {mainSection()}
        </div>
    )
}

export default Friends
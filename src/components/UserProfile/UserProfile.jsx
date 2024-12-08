import { useSelector } from "react-redux"

function UserProfile() {
    const user = useSelector(({user}) => user);

    console.log(user);

    return (
        <div className="card flex flex-row gap-2">
            {user.username}
        </div>
    )
}

export default UserProfile
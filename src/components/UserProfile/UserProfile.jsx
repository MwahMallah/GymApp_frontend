import { useSelector } from "react-redux"

const default_user_url = "https://img.icons8.com/?size=100&id=x0qTmzjcFRhW&format=png&color=000000";

function UserProfile() {
    const user = useSelector(({user}) => user);

    return (
        <div className="card flex flex-row gap-2 align-center justify-center">
            <img className="w-7 h-7 rounded-full" 
                src={user.photo_url || default_user_url}  
                alt="user photo" />
            {user.username}
        </div>
    )
}

export default UserProfile
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { updateUser } from "../../reducers/userReducer";

function Settings() {
    const user = useSelector(({ user }) => user);
    const dispatch = useDispatch();

    // Local state to edit user information
    const [formData, setFormData] = useState({
        name: user.name,
        username: user.username,
        photo_url: user.photo_url,
    });

    console.log(user);

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();
        // Dispatch updated user data to Redux 
        dispatch(updateUser(formData));
    }

    function discardChanges() {
        setFormData({
            name: user.name,
            username: user.username,
            photo_url: user.photo_url,
        });
    }

    const isModified = 
        formData.username !== user.username ||
        formData.name !== user.name ||
        formData.photo_url !== user.photo_url;

    const submitBtnStyle = isModified ? 'bg-primary' : 'bg-primary-muted';
    const discardBtnStyle = isModified ? 'bg-danger' : 'bg-danger-muted';

    return (
        <div className="flex grow justify-center items-center">
            <div className="card rounded-2xl">
                <form className="h-auto flex p-10 flex-col gap-4 text-left" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="photo_url" className="block mb-1">Photo URL</label>
                        <input
                            type="text"
                            id="photo_url"
                            name="photo_url"
                            value={formData.photo_url}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div>
                        <label htmlFor="username" className="block mb-1">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div>
                        <label htmlFor="name" className="block mb-1">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <button type="submit" 
                        className={`${submitBtnStyle} text-white py-2 px-4 rounded`}
                        disabled={!isModified}>
                        Save Changes
                    </button>
                    <button 
                        className={`${discardBtnStyle} text-white py-2 px-4 rounded`}
                        disabled={!isModified}
                        onClick={discardChanges}>
                        Discard changed
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Settings;

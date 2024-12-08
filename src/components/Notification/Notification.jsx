import { useSelector } from "react-redux";

function Notification() {
    const notification = useSelector(({ notification }) => notification);

    let color = '';
    if (notification.type === 'info') {
        color = 'bg-elements'
    } else if (notification.type === 'error') {
        color = 'bg-red-600'
    }

    if (!notification || notification.message.trim() === '' || color === '') 
        return null;

    return (
        <div className={`fixed top-4 left-1/2 -translate-x-1/2 ${color} text-white px-4 py-2 rounded shadow-lg`}>
            {notification.message}
        </div>
    );
}

export default Notification
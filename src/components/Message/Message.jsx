import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { FaCheck, FaCheckDouble } from "react-icons/fa6";

function Message({ msg }) {
    const user = useSelector(({ user }) => user);

    const isMessageFromUser = user.username === msg.from;
    const messageStyle = isMessageFromUser 
        ? 'bg-primary text-white self-start' 
        : 'bg-background text-black self-end';

    // Manually parse the time (assuming msg.time is in "HH:mm" format)
    const [hours, minutes] = msg.time.split(':');
    const formattedTime = `${hours}:${minutes}`;

    const timeStyle = isMessageFromUser 
        ? 'text-primary-muted'
        : 'text-gray-500';

    return (
        <div className="flex flex-col gap-2 w-full">
            <div className={`relative rounded-lg p-2 ${messageStyle} max-w-sm flex flex-row gap-2`}>
                <p className="break-all whitespace-pre-wrap">{msg.content}</p>
                <span className={`text-xs ${timeStyle} self-end mt-1 flex items-center gap-1`}>
                    {formattedTime}
                    {isMessageFromUser && (
                        <span className="ml-2">
                            {msg.seen 
                                ? <FaCheckDouble color="text-primary-muted"/>
                                : <FaCheck color="text-primary-muted"/>}
                        </span>
                    )}
                </span>
            </div>
        </div>
    );
}
Message.propTypes = {
    msg: PropTypes.shape({
        content: PropTypes.string,
        time: PropTypes.string,
        from: PropTypes.string,
        seen: PropTypes.bool
    }).isRequired
};

export default Message
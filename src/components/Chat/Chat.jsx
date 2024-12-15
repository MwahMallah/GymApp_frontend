/*
 * Author: Maksim Dubrovin
 * Login: xdubro01
 */


import PropTypes from "prop-types"
import Button from "../Button/Button";
import { getMessagesFromChat, sawMessage, socket } from "../../services/messageService";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import Message from "../Message/Message";

function Chat({friend, handleBack}) {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const user = useSelector(({user}) => user);

    const roomName = [friend.username, user.username].sort().join('-');

    useEffect(() => {   
        //download messages from server
        getMessagesFromChat(user.username, friend.username)
            .then((messages) => {
                messages.forEach(msg => {
                    socket.emit('sawMessage', msg);
                    sawMessage(msg.id);
                });

                setMessages(messages);
            });

        socket.connect();
        //emit message to server that user joined room
        socket.emit('joinRoom', roomName);
        socket.on('sawMessage', (seenMessage) => {
            setMessages(prevMessages => prevMessages.map(msg => 
                msg.id === seenMessage.id 
                    ? seenMessage
                    : msg))
        });

        socket.on('sendMessage', (msg) => {  
            setMessages(prevMessages => [...prevMessages, msg]);    
            socket.emit('sawMessage', msg);    
        });

        return () => {
            socket.disconnect();
        };
    }, [roomName]);

    function sendMessage(e) {
        e.preventDefault();
        if (input.trim() === '')
            return;

        const timestamp = new Date().toLocaleTimeString();

        socket.emit('usrMessage', {
            from: user.username, 
            to: friend.username,
            content: input,
            time: timestamp
        });
        setInput('');
    }

    const btnEnabled = input.trim() !== '';

    return (
        <div className="flex flex-col h-full">
            <button 
                className="absolute left-1 top-2 rounded-full bg-primary-muted text-black p-2 hover:bg-primary transition-all"
                onClick={handleBack}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <div className="p-4 flex items-center text-center">
                <span className="text-center w-full">
                    {friend.username}
                </span>
            </div>
            <div className="flex-grow p-4 overflow-y-auto max-h-[calc(100vh-300px)] flex flex-col gap-2">
                {messages.map((msg) => 
                    (<Message key={msg.id} msg={msg}/>)
                )}
            </div>
            <div>
                <form className="flex flex-row gap-2" onSubmit={sendMessage}>
                    <input
                        placeholder="Message..."
                        className="card w-full p-2 border-2 bg-background pr-10"
                        type="text"
                        value={input}
                        onChange={(e) => {setInput(e.target.value)}}
                    />
                    <Button type="submit" name="Send" enabled={btnEnabled}/>
                </form>
            </div>
        </div>
    );
}

Chat.propTypes = {
    friend: PropTypes.shape({
        username: PropTypes.string.isRequired,
    }).isRequired,
    handleBack: PropTypes.func.isRequired,
};

export default Chat
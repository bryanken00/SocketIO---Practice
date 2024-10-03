import React, { useEffect, useState } from "react";
import { io } from "socket.io-client"; // Import the socket.io-client
import { useJoinRoom, useSendMessage } from "./services/request/message";
import { message as antMessage } from "antd";

const SOCKET_SERVER_URL = "http://192.168.2.29:3999"; // Replace with your server URL

const SocketComponent = () => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState(""); // State to hold the room name
  const [receivedMessages, setReceivedMessages] = useState([]);

  const joinRoomApi = useJoinRoom();
  const sendMessageApi = useSendMessage();

  // Establish connection to the server when the component mounts
  useEffect(() => {
    const newSocket = io(SOCKET_SERVER_URL); // Initialize the socket connection
    setSocket(newSocket);

    // Cleanup the socket connection when the component unmounts
    return () => {
      newSocket.close();
    };
  }, []);

  // Listen for messages from the server
  useEffect(() => {
    if (socket) {
      // Listen for room-specific messages
      socket.on("message", (data) => {
        setReceivedMessages((prevMessages) => [...prevMessages, data]);
        antMessage.info(data);
      });

      // Handle socket disconnection
      socket.on("disconnect", () => {
        console.log("Disconnected from server");
      });
    }
  }, [socket]);

  // Function to send message to the server for a specific room
  const sendMessage = () => {
    if (socket && message.trim() && room.trim()) {
      // Emit the message to the server along with the room name
      socket.emit("roomMessage", { room, message });
      setMessage(""); // Clear the input field after sending
    }
  };

  const accessRoom = () => {
    if (!socket || !room.trim()) {
      console.error("Socket or room is not defined");
      return;
    }

    joinRoomApi.mutate(
      {
        socketId: socket.id, // Pass the socket ID here
        room: room, // The room to join
      },
      {
        onSuccess: (data) => {
          console.log(`Successfully joined room: ${room}`);
          // No need to emit 'joinRoom' again from client-side
        },
        onError: (error) => {
          console.error("Failed to join room:", error);
        },
      }
    );
  };

  const sendMessage_ = () => {
    if (!socket || !room.trim() || !message.trim()) {
      console.error("Socket, room, or message is not defined");
      return;
    }

    sendMessageApi.mutate(
      {
        room: room, // Pass the room name
        message: message, // Pass the message to send
      },
      {
        onSuccess: (data) => {
          console.log(`Message sent to room: ${room}`);
          setMessage(""); // Clear the input field after sending
          // No need to emit 'roomMessage' again from client-side
        },
        onError: (error) => {
          console.error("Failed to send message:", error);
        },
      }
    );
  };

  return (
    <div>
      <h1>Socket.IO Room Example</h1>
      <div>
        <input
          type="text"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          placeholder="Enter room name"
        />
        <button onClick={accessRoom}>Join Room</button>
      </div>
      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={sendMessage_}>Send Message</button>
      </div>
      <div>
        <h2>Messages in Room:</h2>
        <ul>
          {receivedMessages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SocketComponent;

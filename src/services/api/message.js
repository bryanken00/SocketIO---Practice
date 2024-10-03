/* eslint-disable no-useless-catch */
import { axiosAuth } from "../axios";

export const getMessageApi = async () => {
  try {
    const result = await axiosAuth.get("/api/messages/message/getMessage");
    return result.data;
  } catch (error) {
    throw error;
  }
};

// Join Room API
export const joinRoomApi = async ({ socketId, room }) => {
  try {
    const result = await axiosAuth.post("/api/messages/message/joinRoom", {
      socketId,
      room,
    });
    return result.data;
  } catch (error) {
    throw error;
  }
};

// Send Message API
export const sendMessageApi = async ({ room, message }) => {
  try {
    const result = await axiosAuth.post("/api/messages/message/sendMessage", {
      roomNumber: room, // Change this to match your API structure
      message,
    });
    return result.data;
  } catch (error) {
    throw error;
  }
};

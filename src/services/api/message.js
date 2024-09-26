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

export const joinRoomApi = async () => {
  try {
    const result = await axiosAuth.post("/api/messages/message/joinRoom");
    return result.data;
  } catch (error) {
    throw error;
  }
};

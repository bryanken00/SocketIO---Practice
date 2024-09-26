import { useMutation, useQuery } from "react-query";
import { getMessageApi, joinRoomApi } from "../api/message";
import { useStoreMessage } from "../../store/message/message";

export const useGetMessage = () => {
  const { setMessage } = useStoreMessage.getState();
  return useQuery({
    queryKey: "getMessageApi",
    queryFn: getMessageApi,
    initialData: [],
    onMutate: () => {
      setMessage([]);
    },
    onSuccess: (data) => {
      setMessage(data);
    },
    onSettled: () => {},
  });
};

export const useJoinRoom = () => {
  return useMutation({
    mutationFn: joinRoomApi,
  });
};

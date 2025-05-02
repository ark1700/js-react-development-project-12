import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { channelsSelectors, channelsActions, selectActiveChannel } from "../channelSlice";
import { useDeleteChannelMutation } from "../channelApi";

export const DeleteDialog = ({ channelId }) => {
  const dispatch = useDispatch();
  const channels = useSelector(channelsSelectors.selectAll);
  const [deleteChannel, { isLoading }] = useDeleteChannelMutation();
  const { setActiveChannel } = channelsActions;
  const closeDialogRef = useRef(null);
  const activeChannel = useSelector(selectActiveChannel);
  const deleteButtonHandler = async () => {
    try {
      await deleteChannel(channelId).unwrap();

      if (closeDialogRef.current) {
        closeDialogRef.current.click();
      }
      if (activeChannel.id === channelId) {
        dispatch(setActiveChannel(channels[0].id));
      }
    }
    catch (error) {
      console.error("Ошибка при удалении канала:", error);
    }
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Удалить канал</DialogTitle>
      </DialogHeader>
      <DialogFooter>
        <DialogClose asChild ref={closeDialogRef}>
          <Button variant="outline" type="button">
            Отмена
          </Button>
        </DialogClose>
        <Button type="submit" variant="destructive" disabled={isLoading} onClick={deleteButtonHandler}>
          {isLoading ? "Удаление..." : "Удалить"}
        </Button>
      </DialogFooter>
    </>
  );
};

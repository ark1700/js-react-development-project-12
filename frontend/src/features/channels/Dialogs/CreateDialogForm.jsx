import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { useDispatch, useSelector } from "react-redux";
import { channelsSelectors, channelsActions } from "../channelSlice";
import { channelFormSchema } from "../utils/channelFormSchema";
import { useRef, useState } from "react";
import { useSendChannelMutation } from "../channelApi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export const CreateDialogForm = () => {
  const dispatch = useDispatch();
  const channels = useSelector(channelsSelectors.selectAll);
  const schema = channelFormSchema({ channels });
  const [formError, setFormError] = useState("");
  const [sendChannel, { isLoading }] = useSendChannelMutation();
  const closeDialogRef = useRef(null);
  const { setActiveChannel } = channelsActions;

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      channelName: "",
    },
  });

  const onSubmit = async ({ channelName }) => {
    try {
      setFormError("");
      const newChannel = await sendChannel({ name: channelName }).unwrap();

      form.reset();

      if (closeDialogRef.current) {
        closeDialogRef.current.click();
      }

      dispatch(setActiveChannel(newChannel.id));
    } catch (error) {
      setFormError(error.message || "Произошла ошибка при создании канала")
    }
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Создать новый канал</DialogTitle>
      </DialogHeader>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="channelName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Название канала"
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      form.handleSubmit(onSubmit)()
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {formError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{formError}</AlertDescription>
          </Alert>
        )}
        <DialogFooter>
          <DialogClose asChild ref={closeDialogRef}>
            <Button variant="outline" type="button">
              Отмена
            </Button>
          </DialogClose>
          <Button type="submit" disabled={form.formState.isSubmitting || isLoading}>
            {isLoading ? "Создание..." : "Создать"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
    </>
  );
};

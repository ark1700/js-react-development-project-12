import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { useSelector } from "react-redux";
import { channelsSelectors } from "../channelSlice";
import { channelFormSchema } from "../utils/channelFormSchema";
import { useRef, useState } from "react";
import { useUpdateChannelMutation } from "../channelApi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export const EditDialogForm = ({ channel }) => {
  const channels = useSelector(channelsSelectors.selectAll);
  const schema = channelFormSchema({ channels });
  const [formError, setFormError] = useState("");
  const [updateChannel, { isLoading }] = useUpdateChannelMutation();
  const closeDialogRef = useRef(null);

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      channelName: channel.name,
    },
  });

  const onSubmit = async ({ channelName }) => {
    try {
      setFormError("");
      await updateChannel({ channelId: channel.id, channel: {name: channelName} }).unwrap();

      form.reset();

      if (closeDialogRef.current) {
        closeDialogRef.current.click();
      }
    } catch (error) {
      setFormError(error.message || "Произошла ошибка при создании канала")
    }
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Изменить канал</DialogTitle>
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
              {isLoading ? "Изменение..." : "Изменить"}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
};

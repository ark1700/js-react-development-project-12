import * as yup from "yup";

export const channelFormSchema = ({ channels }) => {
  const schema = yup.object().shape({
    channelName: yup
      .string()
      .required("Название канала обязательно")
      .min(3, "Название канала должно содержать минимум 3 символа")
      .max(20, "Название канала должно содержать максимум 20 символов")
      .test(
        "unique-channel-name",
        "Канал с таким названием уже существует",
        (value) => !channels.some((channel) => channel?.name?.toLowerCase() === value?.toLowerCase()),
      ),
  });

  return schema;
}

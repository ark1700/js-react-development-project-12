import { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AlertCircle, Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useSignupMutation } from "./authApi";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";

const registerSchema = yup.object().shape({
  username: yup
    .string()
    .required("Имя пользователя обязательно")
    .min(3, "Имя пользователя должно содержать минимум 3 символа")
    .max(20, "Имя пользователя не должно превышать 20 символов")
    .matches(/^[a-zA-Z0-9_]+$/, "Имя пользователя может содержать только буквы, цифры и символ подчеркивания"),

  password: yup
    .string()
    .min(6, "Пароль должен содержать минимум 6 символов")
    .required("Пароль обязателен"),

  confirmPassword: yup
    .string()
    .required("Подтверждение пароля обязательно")
    .oneOf([yup.ref("password"), null], "Пароли не совпадают"),
});

export const SignupForm = () => {
  const [formError, setFormError] = useState("");
  const [signup, { isLoading }] = useSignupMutation();
  const navigate = useNavigate();

  const form = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async ({ username, password }) => {
    try {
      setFormError("");
      const response = await signup({ username, password }).unwrap();

      if (response?.status === 409) {
        console.error(response?.data?.error);
        setFormError("Пользователь с таким именем уже существует");
        return;
      }
      if (response?.data?.error) {
        setFormError("Произошла ошибка при регистрации");
        console.error(response?.data?.error);
        return;
      }

      const { token } = response;
      if (token) {
        localStorage.setItem('token', token);
      }

      form.reset();
      navigate('/');
    } catch (error) {
      setFormError(error.message || "Произошла ошибка при регистрации");
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Имя пользователя</FormLabel>
              <FormControl>
                <div className="relative space-y-2">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Username"
                    className="pl-10"
                    {...field}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        form.handleSubmit(onSubmit)()
                      }
                    }}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <div className="relative space-y-2">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Password"
                    className="pl-10"
                    {...field}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        form.handleSubmit(onSubmit)();
                      }
                    }}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Подтверждение пароля</FormLabel>
              <FormControl>
                <div className="relative space-y-2">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    {...field}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        form.handleSubmit(onSubmit)();
                      }
                    }}
                  />
                </div>
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

        <Button type="submit" className="w-full" disabled={isLoading}>
          Зарегистрироваться
        </Button>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Уже есть аккаунт?{" "}
            <a
              href="/login"
              className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 font-medium"
            >
              Войти
            </a>
          </p>
        </div>
      </form>
    </Form>
  );
};

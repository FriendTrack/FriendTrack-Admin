import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/hooks/useLogin";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const nav = useNavigate();
  const { mutate, isPending, isError } = useLogin(() => nav("/"));
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({
      login: login,
      password: password,
    });
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Вход</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="login_form" onSubmit={onSubmit}>
          <Label htmlFor="login">Логин</Label>
          <Input
            type="login"
            placeholder="Логин"
            id="login"
            onChange={(e) => setLogin(e.target.value)}
          />
          <Label htmlFor="password" className="block mt-3">
            Пароль
          </Label>
          <Input
            type="password"
            placeholder="пароль"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </form>
        <div>
          {isError && <div className="text-red-500 text-sm">Ошибка</div>}
        </div>
      </CardContent>
      <CardFooter className="flex-col  gap-3 justify-between md:flex-row">
        <Button disabled={isPending} form="login_form" className="w-full">
          {!isPending ? "Войти" : "Вход..."}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;

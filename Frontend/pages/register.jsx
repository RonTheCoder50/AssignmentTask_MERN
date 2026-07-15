import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useState } from "react";
import { registerAPI, loginAPI } from "../pages/API.jsx";
import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [info, setInfo] = useState({ name: "", email: "", password: "" });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleInput(e) {
    const { value, name } = e.target;

    setInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit() {
    if (
      info.name.trim().length === 0 ||
      info.email.trim().length === 0 ||
      info.password.trim().length === 0
    ) {
      toast.error("All fields are mandatory");
      return;
    }

    const userObj = {
      name: info.name.trim(),
      email: info.email.trim(),
      password: info.password.trim(),
    };

    setLoading(true);
    const register = await registerAPI(userObj);

    let login;
    if (register) {
      login = await loginAPI(userObj);
    }

    if (login) {
      localStorage.setItem("token", login.accessToken);
      navigate("/dashboard");
    }

    setInfo({ name: "", email: "", password: "" });
    setLoading(false);
  }

  return (
    <Card className="w-full max-w-sm flex justify-self-center absolute top-[25%] shadow-sm">
      <CardHeader>
        <CardTitle>Create your new account</CardTitle>
        <CardDescription>
          Enter name, email & password below to create to your account
        </CardDescription>
        <CardAction>
          <Button variant="link" onClick={() => navigate("/login")}>
            Log In
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Username</Label>
              <Input
                name="name"
                onChange={handleInput}
                id="name"
                type="text"
                placeholder="jon123"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                onChange={handleInput}
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input
                name="password"
                onChange={handleInput}
                id="password"
                type="password"
                required
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          disabled={loading}
          onClick={() => handleSubmit()}
          type="submit"
          className="w-full"
        >
          {loading ? "Processing..." : "Register"}
        </Button>
        <Button
          onClick={() => {
            setInfo({ name: "", email: "", password: "" });
            navigate("/login");
          }}
          variant="outline"
          className="w-full cursor-pointer"
        >
          Login
        </Button>
      </CardFooter>
    </Card>
  );
}

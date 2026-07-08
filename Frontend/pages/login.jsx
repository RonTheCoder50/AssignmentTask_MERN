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
import { loginAPI } from "../pages/API.jsx";
import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [info, setInfo] = useState({ email: "", password: "" });

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
    if (info.email.trim() === "" || info.password.trim() === "") {
      toast.error("All fields are mandatory");
      return;
    }

    const userObj = {
      email: info.email.trim(),
      password: info.password.trim(),
    };

    setLoading(true);
    const login = await loginAPI(userObj);

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
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter email & password below to log in to your account
        </CardDescription>
        <CardAction>
          <Button variant="link" onClick={() => navigate("/register")}>
            Sign Up
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
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
          {loading ? "Processing..." : "Login"}
        </Button>
        <Button
          onClick={() => {
            setInfo({ email: "", password: "" });
            navigate("/");
          }}
          variant="outline"
          className="w-full cursor-pointer"
        >
          Go Back
        </Button>
      </CardFooter>
    </Card>
  );
}

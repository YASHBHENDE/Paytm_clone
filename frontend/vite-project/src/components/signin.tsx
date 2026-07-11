import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/user/signin",
        {
          username,
          password,
        }
      );

      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("invalid username or password");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">
            Sign In
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="johndoe"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>

                <button
                  type="button"
                  className="text-sm text-muted-foreground hover:underline"
                >
                  Forgot Password?
                </button>
              </div>

              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <Button
            className="w-full"
            onClick={handleSignin}
          >
            Sign In
          </Button>

          <p className="text-sm text-muted-foreground">
            Don't have an account?
          </p>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => navigate("/signup")}
          >
            Create Account
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
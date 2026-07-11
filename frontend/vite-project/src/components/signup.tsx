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

export default function Signup() {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/user/signup",
        {
          username,
          firstname,
          lastname,
          password,
        }
      );

      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Signup failed");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">
            Sign up
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

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstname">First Name</Label>
                <Input
                  id="firstname"
                  placeholder="John"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastname">Last Name</Label>
                <Input
                  id="lastname"
                  placeholder="Doe"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
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
            onClick={handleSignup}
          >
            Create Account
          </Button>

          <p className="text-sm text-muted-foreground">
            Already have an account?
          </p>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => navigate("/signin")}
          >
            Sign In
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
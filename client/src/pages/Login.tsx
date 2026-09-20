import { Link } from "react-router";
import { useState } from "react";
import FormInput from "@/components/FormInput";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <div className="text-center mb-4">
        <h2 className="text-text-primary text-2xl font-bold">WELCOME BACK!</h2>
        <p className="text-text-muted text-sm">
          Login to your account using credentials
        </p>
      </div>
      <form className="flex flex-col gap-4">
        <FormInput
          id="email"
          label="Email"
          name="email"
          placeHolder="Enter email"
          type="email"
          value={email}
          setValue={setEmail}
        />
        <FormInput
          id="password"
          label="Password"
          name="password"
          placeHolder="Enter password"
          type="password"
          value={password}
          setValue={setPassword}
        />
        <button
          type="submit"
          className="mt-2 text-text-primary p-2 text-center font-medium rounded-md bg-blue-500 w-full cursor-pointer"
        >
          Login
        </button>

        <p className="text-text-muted text-sm text-center mt-2">
          Don't have an account?{" "}
          <Link to="/register" className="underline text-blue-500">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;

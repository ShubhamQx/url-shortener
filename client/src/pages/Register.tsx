import { Link } from "react-router";
import { useState } from "react";
import FormInput from "@/components/FormInput";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <div className="text-center mb-4">
        <h2 className="text-text-primary text-2xl font-bold">
          CREATE ACCOUNT!
        </h2>
        <p className="text-text-muted text-sm">
          Enter your credetials to create new account
        </p>
      </div>
      <form className="flex flex-col gap-4">
        <FormInput
          id="name"
          label="Name"
          name="fullName"
          placeHolder="Enter full name"
          type="text"
          value={name}
          setValue={setName}
        />
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
          className="mt-2 text-text-primary p-2 text-center font-medium rounded-md bg-blue-600 w-full cursor-pointer hover:bg-blue-500 transition-colors"
        >
          Register
        </button>
        <p className="text-text-muted text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="underline text-blue-500">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;

import axios from "axios";
import type { ApiError } from "@/types/api";
import { Link, Form, useActionData, useNavigation } from "react-router";
import type { ActionFunctionArgs } from "react-router";
import FormInput from "@/components/FormInput";
import { registerUser } from "@/api/auth";
import { useEffect, useState } from "react";

export async function registerAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  try {
    const res = await registerUser(email, password, name);
    return res.data;
  } catch (err) {
    if (axios.isAxiosError<ApiError>(err)) {
      return (
        err.response?.data ?? {
          statusCode: 0,
          message: "Something went wrong",
          success: false,
        }
      );
    }
    throw err;
  }
}

const Register = () => {
  const actionData = useActionData();
  const navigation = useNavigation();

  const [dismissError, setDismissError] = useState(false);

  let showError = actionData?.success === false && !dismissError;

  useEffect(() => {
    setDismissError(false);
  }, [actionData]);

  if (actionData?.success === true) {
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-col items-center gap-1">
          <h3 className="text-text-primary text-2xl font-bold">
            Registration Successful
          </h3>
          <p className="text-text-muted text-sm font-medium">
            {actionData?.message}
          </p>
        </div>
        <span className="text-3xl ">✅</span>
        <Link
          to="/login"
          className=" text-text-primary mt-3 p-2 text-center font-medium rounded-md bg-blue-600 hover:bg-blue-700 transition-colors w-full block"
        >
          Proceed to login
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-4">
        <h2 className="text-text-primary text-2xl font-bold">
          CREATE ACCOUNT!
        </h2>
        <p className="text-text-muted text-sm">
          Enter your credetials to create new account
        </p>

        {/* Displaying account register error */}
        {showError && (
          <p className="mt-2 text-start text-sm font-medium text-error">
            Error: {actionData?.message}
          </p>
        )}
      </div>
      <Form
        action="/register"
        method="POST"
        onChange={() => setDismissError(true)}
        className="flex flex-col gap-4"
      >
        <FormInput
          id="name"
          label="Name"
          name="name"
          placeholder="Enter full name"
          type="text"
          autoComplete="off"
          required
        />
        <FormInput
          id="email"
          label="Email"
          name="email"
          placeholder="Enter email"
          type="email"
          autoComplete="off"
          required
        />
        <FormInput
          id="password"
          label="Password"
          name="password"
          placeholder="Enter password"
          type="password"
          autoComplete="off"
          required
        />
        <button
          type="submit"
          disabled={navigation.state === "submitting"}
          className="mt-2 text-text-primary p-2 text-center font-medium rounded-md bg-blue-600 w-full cursor-pointer hover:bg-blue-700 transition-colors disabled:opacity-60"
        >
          {navigation.state === "submitting" ? "Submitting..." : "Register"}
        </button>
        <p className="text-text-muted text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="underline text-blue-500">
            Login
          </Link>
        </p>
      </Form>
    </div>
  );
};

export default Register;

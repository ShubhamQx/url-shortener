import axios from "axios";
import type { ApiError } from "@/types/api";
import {
  Link,
  Form,
  useActionData,
  useNavigation,
  redirect,
} from "react-router";
import type { ActionFunctionArgs } from "react-router";
import FormInput from "@/components/FormInput";
import { loginUser } from "@/api/auth";
import { useEffect, useState } from "react";

export async function loginAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const res = await loginUser(email, password);
    if(res.data.success === true){
      return redirect("/")
    }
    console.log(res.data);
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

const Login = () => {
  const actionData = useActionData();
  const navigation = useNavigation();

  const [dismissError, setDismissError] = useState(false);
  let showError = actionData?.success === false && !dismissError;

  useEffect(() => {
    setDismissError(false);
  }, [actionData]);

  return (
    <div>
      <div className="text-center mb-4">
        <h2 className="text-text-primary text-2xl font-bold">WELCOME BACK!</h2>
        <p className="text-text-muted text-sm">
          Login to your account using credentials
        </p>

        {/* Displaying account login error */}
        {showError && (
          <p className="mt-2 text-start text-sm font-medium text-error">
            Error: {actionData?.message}
          </p>
        )}
      </div>
      <Form
        action="/login"
        method="POST"
        onChange={() => setDismissError(true)}
        className="flex flex-col gap-4"
      >
        <FormInput
          id="email"
          label="Email"
          name="email"
          placeholder="Enter email"
          type="email"
          required
        />
        <FormInput
          id="password"
          label="Password"
          name="password"
          placeholder="Enter password"
          type="password"
          required
        />
        <button
          type="submit"
          disabled={navigation.state === "submitting"}
          className="mt-2 text-text-primary p-2 text-center font-medium rounded-md bg-blue-600 w-full cursor-pointer hover:bg-blue-700 transition-colors disabled:opacity-60"
        >
          {navigation.state === "submitting" ? "Logging in..." : "Login"}
        </button>

        <p className="text-text-muted text-sm text-center mt-2">
          Don't have an account?{" "}
          <Link to="/register" className="underline text-blue-500">
            Register
          </Link>
        </p>
      </Form>
    </div>
  );
};

export default Login;

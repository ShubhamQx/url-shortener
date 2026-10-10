import { useState } from "react";
import type { SubmitEvent } from "react";
import { useNavigate, useOutletContext } from "react-router";
import type { User } from "@/types/user";
import { createLink } from "@/api/links";
import axios from "axios";
import type { ApiError } from "@/types/api";
import type { Link } from "@/types/link";

const ShortenForm = () => {
  const user = useOutletContext<User | null>();
  const navigate = useNavigate();

  const [linkInput, setLinkInput] = useState<string>("");
  const [isInputInvalid, setIsInputInvalid] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [createdLink, setCreatedLink] = useState<Link | null>(null);
  const [error, setError] = useState<string | null>(null);
  {
    createdLink && console.log(createdLink);
  }
  {
    error && console.log(error);
  }

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (linkInput.trim() === "") {
      setIsInputInvalid(true);
      return;
    }
    setIsInputInvalid(false);

    if (!user) {
      navigate("/login");
      return;
    }

    setError(null);
    setCreatedLink(null);
    setIsSubmitting(true);

    try {
      const res = await createLink(linkInput.trim());

      setCreatedLink(res.data.data);
      setLinkInput("");
    } catch (err) {
      if (axios.isAxiosError<ApiError>(err)) {
        setError(err.response?.data.message ?? "Something went wrong...");
      } else {
        setError("Something went wrong...");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <form className="w-full flex gap-2" onSubmit={handleSubmit}>
        <input
          type="text"
          name="longURL"
          placeholder="paste your long URL here"
          value={linkInput}
          onChange={(e) => setLinkInput(e.target.value)}
          onFocus={() => setIsInputInvalid(false)}
          autoComplete="off"
          className={`flex-1 p-2 bg-foreground text-text-primary rounded-md border outline-none focus:bg-foreground/75 ${isInputInvalid ? "border-error" : "border-border"}`}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 hover:bg-blue-700 transition-colors py-2 px-4 font-medium text-text-primary rounded-md cursor-pointer disabled:opacity-60 active:bg-blue-800"
        >
          Create link
        </button>
      </form>
      {isInputInvalid && (
        <p className="text-sm text-error mt-1">Please enter a valid URL here</p>
      )}
    </div>
  );
};

export default ShortenForm;

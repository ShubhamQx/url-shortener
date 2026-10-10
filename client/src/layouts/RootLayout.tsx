import { Outlet, useLoaderData } from "react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getMe } from "@/api/auth";
import axios from "axios";
import type { ApiError } from "@/types/api";
import type { User } from "@/types/user";

export async function rootLoader() {
  try {
    const res = await getMe();

    return { user: res.data.data as User };
  } catch (err) {
    if (axios.isAxiosError<ApiError>(err)) {
      return { user: null };
    }
    throw err;
  }
}

const RootLayout = () => {
  const { user } = useLoaderData() as { user: User | null };

  return (
    <div className="w-full max-w-360 mx-auto min-h-screen bg-background flex flex-col">
      <Header user={user} />

      <main className="flex-1">
        <Outlet context={user}/>
      </main>

      <Footer />
    </div>
  );
};

export default RootLayout;

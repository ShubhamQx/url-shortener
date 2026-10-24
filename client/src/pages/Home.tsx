import type { User } from "@/types/user";
import { useOutletContext } from "react-router";
import ShortenForm from "@/components/ShortenForm";

const Home = () => {
  const user = useOutletContext<User | null>();
  
  return (
    <div>
      <div className="flex flex-col items-center justify-center mt-20 px-6 gap-8 w-full max-w-3xl mx-auto">
        <div>
          <h2 className="text-text-primary font-bold  text-5xl mb-4 text-center">
            Shorten long links in one click
          </h2>
          <p className="text-text-muted text-center">
            Turn long URLs into short, shareable links and track how they perform.
          </p>
        </div>
        <ShortenForm />
      </div>
    </div>
  );
};

export default Home;

import type { User } from "@/types/user";
import { useOutletContext } from "react-router";
import ShortenForm from "@/components/ShortenForm";

const Home = () => {
  const user = useOutletContext<User | null>();
  
  return (
    <div>
      <div className="flex flex-col items-center justify-center mt-20 px-6 gap-8 w-full max-w-3xl mx-auto">
        <div>
          <h2 className="text-text-primary font-bold  text-5xl mb-2 text-center">
            Create Shorten Link in One click
          </h2>
          <p className="text-text-muted text-center">
            Turn your long links to short urls for easy access and keep track
            with easy analytics
          </p>
        </div>
        <ShortenForm />
      </div>
    </div>
  );
};

export default Home;

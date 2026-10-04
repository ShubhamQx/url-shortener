import { Link } from "react-router";
import type { User } from "@/types/user";

interface HeaderProps {
  user: User | null;
}
const Header = ({ user }: HeaderProps) => {
  return (
    <div className="bg-foreground py-4 px-6 flex justify-between items-center">
      <span className="font-extrabold text-xl text-gray-200">Shawty</span>
      <div>
        <Link to="/login">
          <button className="text-base leading-none font-medium border text-text-primary py-2 px-6 rounded-md">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Header;

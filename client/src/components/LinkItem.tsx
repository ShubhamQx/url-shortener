import { deleteLink } from "@/api/links";
import type { ApiError } from "@/types/api";
import type { Link } from "@/types/link";
import { copyToClipboard } from "@/utils/copy";
import { getShortUrl } from "@/utils/shortUrl";
import axios from "axios";

interface LinkItemProp {
  link: Link;
}

const LinkItem = ({ link }: LinkItemProp) => {
  const shortUrl = getShortUrl(link.code);

  const handleDelete = async () => {
    try {
      await deleteLink(link.code);
      
    } catch (err) {
      if (axios.isAxiosError<ApiError>(err)) {
        console.log(err.response?.data);
      }
    }
  };

  return (
    <li className="text-text-primary odd:bg-foreground px-4 py-2 flex justify-between items-center gap-4">
      <div className="min-w-0">
        <div>
          <a
            href={shortUrl}
            target="_blank"
            rel="noreferrer" //It doesn't tell destination site which page you came from
            className="text-base font-semibold text-text-primary block truncate hover:underline"
          >
            {shortUrl}
          </a>
          <p className="text-text-muted text-sm font-normal truncate">
            {link.fullLink}
          </p>
        </div>
        <div className="mt-1 flex gap-3 text-xs text-text-primary font-normal">
          <span>
            {new Date(link.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span>clicks: {link.clickCount}</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => copyToClipboard(shortUrl)}
          className="text-sm text-text-muted border border-border rounded-md  px-2 py-1 font-medium cursor-pointer bg-bg-light hover:bg-bg-light/80 active:bg-bg-light/40 transition-colors"
        >
          Copy
        </button>
        <button
          onClick={handleDelete}
          className="text-sm text-text-muted hover:text-error transition-colors font-medium cursor-pointer"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default LinkItem;

import type { Link } from "@/types/link";

interface CreatedLinkCardProp {
  createdLink: Link;
}

const CreatedLinkCard = ({ createdLink }: CreatedLinkCardProp) => {
  const shortUrl = `${import.meta.env.VITE_SHORT_BASE_URL}/${createdLink.code}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
  };

  return (
    <div className="bg-foreground p-4 flex items-center justify-between gap-4">
      <div className="min-w-0">
        <a
          href={shortUrl}
          target="_blank"
          className="block font-semibold text-text-primary hover:underline"
        >
          {shortUrl}
        </a>
        <p className="text-sm text-text-muted/80 truncate">
          {createdLink.fullLink}
        </p>
      </div>
      <button
        onClick={handleCopy}
        className="py-2 px-6 text-sm text-text-muted font-semibold border rounded-md border-border bg-bg-light transition-colors hover:bg-bg-light/80 active:bg-bg-light/40 cursor-pointer"
      >
        Copy
      </button>
    </div>
  );
};

export default CreatedLinkCard;

import { getLinks } from "@/api/links";
import { useEffect, useState } from "react";
import LinkItem from "./LinkItem";
import type { Link } from "@/types/link";
import type { Dispatch, SetStateAction } from "react";

interface LinkListProps {
  links: Link[];
  setLinks: Dispatch<SetStateAction<Link[]>>;
  onDeleted: (code: string) => void;
}

const LinkList = ({ links, setLinks, onDeleted }: LinkListProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLink = async () => {
      try {
        const res = await getLinks();

        setLinks(res.data.data ?? []);
      } catch (err) {
        setError("Couldn't load your links");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLink();
  }, []);

  if (isLoading) {
    return (
      <p className="text-sm font-medium text-text-muted py-8 text-center">
        Loading...
      </p>
    );
  }

  if (error) {
    return <p className=" font-medium text-error text-center py-8">{error}</p>;
  }

  if (links.length === 0) {
    return (
      <p className="font-medium text-text-primary py-8 text-center">
        Create a link first
      </p>
    );
  }

  return (
    <div>
      <ul className="flex flex-col gap-1 ">
        {links.map((link) => (
          <LinkItem link={link} key={link.id} onDeleted={onDeleted} />
        ))}
      </ul>
    </div>
  );
};

export default LinkList;

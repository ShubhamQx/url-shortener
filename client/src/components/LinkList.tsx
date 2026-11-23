import { getLinks } from "@/api/links";
import type { Link } from "@/types/link";
import { useEffect, useState } from "react";
import LinkItem from "./LinkItem";

const LinkList = () => {
  const [linkList, setLinkList] = useState<Link[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLink = async () => {
      try {
        const res = await getLinks();

        setLinkList(res.data.data ?? []);
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

  if (linkList.length === 0) {
    return (
      <p className="font-medium text-text-primary py-8 text-center">
        Create a link first
      </p>
    );
  }

  return (
    <div>
      <ul className="flex flex-col gap-1 ">
        {linkList.map((link) => (
          <LinkItem link={link} key={link.id} />
        ))}
      </ul>
    </div>
  );
};

export default LinkList;

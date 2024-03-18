"use client";

import { Plus, Link, ThumbsUp } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { useState } from "react";

import { Button } from "./ui/button";

const InviteUsers = () => {
  const [copied, setCopied] = useState(false);
  const { orgId } = useParams();
  const router = useRouter();

  const textToCopy = `https://simplestack-fe.vercel.app/${orgId}/signup`;

  const handleCopy = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Nu s-a putut copia textul:", error);
    }
  };

  return (
    <>
      <div className="space-x-2 space-y-2 text-center md:space-y-0">
        <Button
          variant="outline"
          onClick={() => handleCopy(textToCopy)}
          asChild
          className="cursor-pointer"
        >
          {copied ? (
            <div className="flex">
              <ThumbsUp className="mr-2 h-4 w-4" /> Copied
            </div>
          ) : (
            <div className="flex items-center">
              <Link className="mr-2 h-4 w-4" /> Copy invite link
            </div>
          )}
        </Button>
        <Button onClick={() => router.push(`/${orgId}/signup`)}>
          <Plus className="mr-2 h-4 w-4" /> Add user
        </Button>
      </div>
    </>
  );
};

export default InviteUsers;

"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { CopyPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface User {
  departmentId: string;
  managerAt: {
    id: string;
  };
}

export function AssignModal({
  authorId,
  skillId,
  skill,
}: {
  authorId: string;
  skillId: string;
  skill: string;
}) {
  const [user, setUser] = useState<User>();
  const { data: session } = useSession();
  const { orgId } = useParams();
  const base_url = process.env.NEXT_PUBLIC_API_URL;

  const token = session?.user?.access_token;

  useEffect(() => {
    async function getUser() {
      const res = await fetch(
        `${base_url}/organizations/${orgId}/employees/${authorId}/employee`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        },
      );

      if (res.ok) {
        const data = await res.json();
        setUser(data);
      }
    }

    getUser();
  }, [base_url, token, orgId, authorId]);

  console.log(user);

  async function onSubmit() {
    await fetch(
      `${base_url}/organizations/${orgId}/skills/assign-skill-to-department/${skillId}/department/${user?.departmentId}/manager/${user?.managerAt.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify([skillId]),
      },
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex cursor-pointer items-center gap-2">
          <CopyPlus size={16} />
          <div>Assign skill</div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Assign this skill to your department</DialogTitle>
          <DialogDescription>
            <p className="mt-2 w-fit rounded-md bg-violet-600 px-2 py-1 text-white">
              {skill}
            </p>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogTrigger asChild>
            <Button type="submit" onClick={onSubmit}>
              Assign
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

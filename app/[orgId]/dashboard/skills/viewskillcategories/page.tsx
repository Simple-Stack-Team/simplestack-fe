"use client";

import { useParams, usePathname } from "next/navigation";
import { Toaster } from "@/components/ui/sonner"
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

import { DataTable } from "@/components/data-table";
import { columns } from "@/app/[orgId]/dashboard/skills/viewskillcategories/_components/columns";
import { Button } from "@/components/ui/button";

const ViewSkillCategories = () => {
  const [categories, setCategories] = useState([]);
  const currentPath = usePathname();

  const { status, data: session } = useSession();
  const { orgId } = useParams();

  const apiKey = process.env.NEXT_PUBLIC_API_URL!;
  const url = `${apiKey}/organizations/${orgId}/skills/skill-categories`;

  const token = session?.user?.access_token;

  useEffect(() => {
    if (status === "loading") return;

    async function getData() {
      const res = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (!res.ok) return;
      const data = await res.json();

      setCategories(data);
      return data;
    }

    getData();
  }, [url, token, status]);

  return (
    <div>
      <Button className="mb-4" asChild>
        <Link href={`${currentPath}/newcategory`}>New category</Link>
      </Button>
      <DataTable columns={columns} data={categories} />
      <Toaster />
    </div>
  );
};

export default ViewSkillCategories;

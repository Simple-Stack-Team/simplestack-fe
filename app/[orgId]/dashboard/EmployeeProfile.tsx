"use client";

import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";

import { Badge } from "@/components/ui/badge";
import useFetch from "@/hooks/useFetch";

const EmployeeProfile = () => {
  const { orgId } = useParams();
  const { data: session } = useSession();

  const linkToSignupEmp = `https://simplestack-fe.vercel.app/${orgId}/signup`;

  const apiKey = process.env.NEXT_PUBLIC_API_URL!;
  const url = `/organizations/${orgId}/employees/${session?.user.user.sub}/employee`;
  const { data } = useFetch({ apiKey, url });

  console.log(data);

  return (
    <div className="mt-4">
      <Badge variant="outline">{linkToSignupEmp}</Badge>
      {/* <Badge variant="outline">{data.organization.orgName}</Badge> */}
    </div>
  );
};

export default EmployeeProfile;

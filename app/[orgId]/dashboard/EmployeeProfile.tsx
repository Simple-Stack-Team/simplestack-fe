'use client'

import useFetch from "@/hooks/useFetch";
import { useSession } from "next-auth/react";

import { useParams } from "next/navigation";

const EmployeeProfile = () => {
  const { orgId } = useParams();
  const { data: session } = useSession();

  const apiKey = process.env.NEXT_PUBLIC_API_URL!;
  const url = `/organizations/${orgId}/employees/${session?.user.user.sub}/employee`;
  const { data } = useFetch({ apiKey, url });

  console.log(data)

  return <div>EmployeeProfile</div>;
};

export default EmployeeProfile;

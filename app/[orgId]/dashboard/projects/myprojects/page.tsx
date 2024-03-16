import { getServerSession } from "next-auth";

import { getData } from "@/lib/getFetch";
import { authOption } from "@/app/api/auth/[...nextauth]/constants/next-auth-config";
import { ProjectsLists } from "./components/projects-lists";

export default async function MyProjects({params}: {params: {orgId: string}}) {
  const session= await getServerSession(authOption);
  const {orgId} = params;
  const myprojects = await getData(`/organizations/${orgId}/projects/employee/${session?.user.user.sub}`)
  
  if(!myprojects) return <h1>Loading your projects...</h1>
  return (
    <div>
      <h1 className="text-2xl font-extrabold mb-5">My projects</h1>
      <ProjectsLists projects={myprojects} />
    </div>
  )
}

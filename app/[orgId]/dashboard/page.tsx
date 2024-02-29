import RoleCheck from "@/components/roles-check";

export default function Page() {
  return (
    <>
      <h1>Dashboard</h1>
      <RoleCheck roles={"PROJECT_MANAGER"}>ACCEPTED</RoleCheck>
    </>
  );
}

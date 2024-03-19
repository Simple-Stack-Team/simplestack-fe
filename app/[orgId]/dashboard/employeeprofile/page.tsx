import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getData } from "@/lib/getFetch";
import { Employee } from "@/types/Employee";

interface Props {
  params: { orgId: string };
  searchParams: { empId: string };
}

const EmployeeProfile = async ({
  searchParams: { empId },
  params: { orgId },
}: Props) => {
  const employee = (await getData(
    `/organizations/${orgId}/employees/${empId}/employee`,
  )) as Employee;

  if (!employee) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="mb-2 text-xl font-semibold">Profile</h1>
      <Separator />
      <div className="mt-4 flex items-center gap-2">
        <div className="grid aspect-square w-[48px] place-content-center rounded-full border-2 border-violet-900 bg-violet-700 text-xl font-semibold text-white">
          {employee.name[0]}
        </div>
        <div>
          <h2 className="text-xl font-semibold">{employee.name}</h2>
          <p className="text-sm text-gray-500">{employee.email}</p>
        </div>
      </div>
      <div>
        <h3 className="mb-[2px] mt-4 font-semibold">Roles</h3>
        <div className="flex flex-wrap justify-start gap-2 ">
          {employee.roles.map((role, index) => (
            <Badge key={index} variant="outline">
              {role}
            </Badge>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <h3 className="font-semibold">Skills</h3>
        {employee.personalSkills.length > 0 ? (
          <ul className="lg-grid-cols-3 mt-2 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {employee.personalSkills?.map((item, index) => (
              <li key={index} className=" rounded-lg border p-4">
                <div className="mb-4 flex items-center justify-between">
                  <h4 className="font-semibold">{item.skill.name}</h4>
                  <Badge variant="outline">
                    <span>Level</span>
                    <span className="ml-1 font-semibold">{item.level}</span>
                  </Badge>
                </div>
                <p>
                  <span className="font-medium">{item.experience}</span>{" "}
                  <span className="text-sm">experience</span>
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-gray-600">No skills assigned</p>
        )}
      </div>
    </div>
  );
};

export default EmployeeProfile;

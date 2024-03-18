import { getData } from "@/lib/getFetch";
import { SkillC } from "@/types/skills-types";
import { Separator } from "./ui/separator";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "./ui/badge";

const SkillDetails = async ({ url }: { url: string }) => {
  const skill = (await getData(url)) as SkillC;

  return (
    <div>
      <h1 className="mb-2 text-2xl font-semibold">
        <span className="">{skill.name}</span>
      </h1>
      <Separator />
      <div className="mt-4 max-w-[600px]">
        <div>
          <p>Category</p>
          <span className="font-semibold">{skill.category.name}</span>
        </div>
        <div className="my-4 grid w-full gap-1.5">
          <Label htmlFor="message">Description</Label>
          <Textarea id="message" readOnly>
            {skill.description}
          </Textarea>
        </div>
        <div className="flex gap-4">
          <div>
            <p>Author name</p>
            <span className="font-semibold">{skill.author.name}</span>
          </div>
          <div>
            <p>Author email</p>
            <span className="font-semibold">{skill.author.email}</span>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-4">
          <p>Departments</p>
          {skill.departmentNames.map((department, index) => (
            <Badge key={index}>{department}</Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillDetails;

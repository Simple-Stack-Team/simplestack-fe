import { getData } from "@/lib/getFetch";
import { SkillC } from "@/types/skills-types";

const SkillDetails = async ({ url }: { url: string }) => {
  const skill = (await getData(url)) as SkillC;

  return (
    <div>
      <h1 className="mb-8 text-2xl font-semibold">Skill Details</h1>
      <div>Detail page of skill</div>
    </div>
  );
};

export default SkillDetails;

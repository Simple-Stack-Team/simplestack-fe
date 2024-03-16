import { FC } from "react";

import SkillDetails from "@/components/SkillDetails";

interface PageProps {
  params: { orgId: string; skillId: string };
}

const SkillDetailsPage: FC<PageProps> = async ({
  params: { orgId, skillId },
}) => {
  const url = `/organizations/${orgId}/skills/${skillId}`;

  return (
    <div>
      <SkillDetails url={url} />
    </div>
  );
};

export default SkillDetailsPage;

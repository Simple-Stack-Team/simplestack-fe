import { SuggestedEmployee, PersonalSkill } from "@/app/[orgId]/dashboard/projects/[projectId]/teamfinder/types/teamfinder-types"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface Props {
  employee: SuggestedEmployee
}

export const SuggestedEmployeeCard = ({ employee }: Props) => {
  return (
    <Card className="shadow-none">
      <CardHeader className="p-4">
        <div className="flex justify-between align-middle">
          <h3 className="text-slate-800 font-semibold text-2xl">{employee.name}</h3>
          <Button variant="outline">Propose</Button>
        </div>
      </CardHeader>
      
      <CardContent className="px-4">
        <div className="flex flex-wrap gap-1">
          {employee.personalSkills.map((personalSkill: PersonalSkill) => 
            <Badge className="p-0.5 px-1" variant="outline" key={personalSkill.id}>{personalSkill.skill.name}</Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
export interface SuggestedEmployee {
  id: string,
  name: string,
  personalSkills: PersonalSkill[]
  projects: any
}

export interface PersonalSkill {
  id: string,
  level: string,
  experience: string,
  employeeId: string,
  skill: Skill,
}

export type Skill = {
  name: string
  id: string
}
export interface SkillsStatisticsTypes {
  skillId: string;
  skillName: string;
  nrOfEmployees: number;
  percentOfEmployees: number;
  level1: { number: number; percent: number };
  level2: { number: number; percent: number };
  level3: { number: number; percent: number };
  level4: { number: number; percent: number };
  level5: { number: number; percent: number };
}
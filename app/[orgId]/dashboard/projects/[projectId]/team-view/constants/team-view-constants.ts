export interface TeamViewSection {
  label: string,
  key: string
}

export const TeamViewSections: TeamViewSection[] = [
  { label: 'Proposed members', key: 'proposedMembers' },
  { label: 'Active members', key: 'activeMembers' },
  { label: 'Past members', key: 'pastMembers' },
]
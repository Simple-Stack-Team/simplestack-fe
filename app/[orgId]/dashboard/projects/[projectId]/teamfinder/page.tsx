import TeamFinder from '@/app/[orgId]/dashboard/projects/[projectId]/teamfinder/components/teamfinder'

export default async function TeamFinderPage({ params }: { params: { projectId: string } }) {
  return (
    <div>
      <div className="my-4">
        <TeamFinder />
      </div>
    </div>
  )
}

import DeallocationsList from '@/app/[orgId]/dashboard/projects/[projectId]/deallocation-proposals/components/deallocations-list'

export default async function DeallocationsPage({ params }: { params: { projectId: string } }) {
  return (
    <div>
      <div className="my-4">
        <DeallocationsList />
      </div>
    </div>
  )
}

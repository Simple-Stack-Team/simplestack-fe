'use client'

interface Props {
  data: any
}

export default function TeamFinderResult({data}: Props) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Results</h1>
      <div className="grid gap-4 grid-cols-3 grid-rows-3">
        {data.map((user: any)=> <h1 key={user.name}>{user.name}</h1> )}
      </div>
    </div>
  )
}

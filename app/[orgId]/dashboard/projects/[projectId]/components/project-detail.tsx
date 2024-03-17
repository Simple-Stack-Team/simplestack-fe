'use client'

interface Props {
  label: string,
  value: string,
}

export default function ProjectDetail({ label, value }: Props) {
  return (
    <div className="p-4 border border-1 rounded-lg flex items-center">
      <p className="text-lg">{label}: <span className="font-semibold">{value}</span></p>
    </div>
  )
}

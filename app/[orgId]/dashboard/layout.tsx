export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <div className="w-[240px] bg-slate-200"></div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}

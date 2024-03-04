import Sidebar from "@/components/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex flex-row justify-start ">
      <Sidebar />
      <div className="flex-1 p-2">
        {children}
      </div>
    </div>
  );
}

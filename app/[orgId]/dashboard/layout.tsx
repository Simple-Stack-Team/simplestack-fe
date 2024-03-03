import Sidebar from "@/components/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex flex-row justify-start ">
      <Sidebar />

      <div className="bg-primary flex-1 p-4 text-white border-1 border-dashed">
        {children}
      </div>
    </div>
  );
}

import Sidebar from "@/components/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100 ">
      <Sidebar />
      <div className="ml-[240px] flex-1">
        <div className=" m-2 min-h-screen rounded-lg  border-2 border-gray-300 bg-white p-4">
          {children}
        </div>
      </div>
    </div>
  );
}

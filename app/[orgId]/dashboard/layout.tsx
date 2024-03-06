import Sidebar from "@/components/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gray-100 ">
      <Sidebar />
      <div className="ml-[240px] flex-1">
        <div className=" p-2 p-4 bg-white rounded-lg  min-h-screen border-2 border-gray-300 m-2">
          {children}
        </div>
      </div>
    </div>
  );
}

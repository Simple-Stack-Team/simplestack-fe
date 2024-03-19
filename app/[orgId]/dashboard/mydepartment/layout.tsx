export default function LayoutDepartmentAssign({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <h1 className="mb-6 text-xl font-semibold">My department</h1>
      {children}
    </main>
  );
}

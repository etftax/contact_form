import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#fdfdfd] dark:bg-[#000c19]">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-y-auto">
        <header className="flex h-16 items-center justify-between border-b border-zinc-200 dark:border-white/10 px-8 bg-white/50 dark:bg-[#000c19]/50 backdrop-blur-md sticky top-0 z-20">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Workspace General</h2>
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2 rounded-full bg-blue-50 dark:bg-blue-900/10 px-3 py-1 text-xs font-semibold text-blue-700 dark:text-blue-400">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
                Live Engine Active
             </div>
          </div>
        </header>
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

"use client";
import { BarChart3, FileSpreadsheet, History, LayoutDashboard, Settings, User } from "lucide-react";
import Link from "next/link";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: FileSpreadsheet, label: "Situatii Saga", href: "/dashboard?view=saga" },
  { icon: History, label: "Istoric Balante", href: "/dashboard?view=history" },
  { icon: BarChart3, label: "CFO Insight", href: "/dashboard?view=cfo" },
];

export default function Sidebar() {
  return (
    <div className="flex h-screen w-72 flex-col border-r border-zinc-200 dark:border-white/10 bg-white/50 dark:bg-[#001020]/20 backdrop-blur-xl">
      <div className="flex grow flex-col gap-y-5 px-6 pb-4">
        <div className="flex h-16 shrink-0 items-center mt-6 px-2">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-500/20">
               <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">FiscalMind</span>
          </Link>
        </div>
        
        <nav className="flex flex-1 flex-col mt-4">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1.5">
                {sidebarItems.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className={cn(
                        "group flex gap-x-3 rounded-2xl p-3.5 text-sm font-semibold leading-6 transition-all duration-300",
                        "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-white"
                      )}
                    >
                      <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            
            <li className="mt-auto">
              <div className="space-y-1 -mx-2 mb-4">
                <Link href="#" className="group flex gap-x-3 rounded-2xl p-3.5 text-sm font-semibold leading-6 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/5">
                   <Settings className="h-6 w-6" /> Setari
                </Link>
              </div>
              <div className="flex items-center gap-x-4 py-4 px-2 border-t border-zinc-200 dark:border-white/10">
                <div className="h-10 w-10 rounded-full bg-zinc-200 dark:bg-white/10 flex items-center justify-center">
                   <User className="h-6 w-6 text-zinc-600 dark:text-zinc-300" />
                </div>
                <div className="flex flex-col">
                   <span className="text-sm font-bold dark:text-white">Admin CFO</span>
                   <span className="text-xs text-zinc-500">Premium Account</span>
                </div>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

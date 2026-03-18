import { ArrowRight, Lock, Mail, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#fafafa] dark:bg-[#000c19]">
      {/* Dynamic Background Elements */}
      <div className="absolute -top-[10%] -left-[5%] h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[120px]" />
      <div className="absolute -bottom-[10%] -right-[5%] h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-[120px]" />

      <main className="z-10 w-full max-w-[450px] px-6">
        <div className="mb-10 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-xl dark:bg-blue-600/20 glass-morphism">
            <TrendingUp className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Fiscal<span className="text-blue-600 dark:text-blue-400">Mind</span>
          </h1>
          <p className="mt-2 text-zinc-500 dark:text-zinc-400">
            Intelligent Financial Analysis for Scale
          </p>
        </div>

        <div className="glass-morphism rounded-[32px] p-8 shadow-2xl dark:shadow-blue-900/10 border border-white/40 dark:border-white/5">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">
                Adresa de Email
              </label>
              <div className="relative group">
                <Mail className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="email"
                  placeholder="nume@companie.ro"
                  className="w-full rounded-2xl border-none bg-zinc-100/50 dark:bg-white/5 py-3.5 pl-11 pr-4 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:bg-white dark:focus:bg-white/10 outline-none transition-all placeholder:text-zinc-400"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">
                Parola
              </label>
              <div className="relative group">
                <Lock className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full rounded-2xl border-none bg-zinc-100/50 dark:bg-white/5 py-3.5 pl-11 pr-4 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:bg-white dark:focus:bg-white/10 outline-none transition-all placeholder:text-zinc-400"
                />
              </div>
            </div>

            <Link 
              href="/dashboard"
              className="hover-glow w-full rounded-2xl bg-zinc-900 dark:bg-white py-4 font-semibold text-white dark:text-zinc-900 shadow-lg shadow-zinc-900/10 dark:shadow-white/5 flex items-center justify-center gap-2 group"
            >
              Autentificare
              <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="mt-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
            Nu ai un cont?{" "}
            <Link href="/" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline hover:underline-offset-4 transition-all">
              Inregistreaza-te gratuit
            </Link>
          </div>
        </div>

        <p className="mt-10 text-center text-xs text-zinc-400 dark:text-zinc-500 tracking-wider uppercase">
          &copy; 2026 FiscalMind Premium CFO Engine
        </p>
      </main>
    </div>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aplicație Profesională ETF",
  description: "Creată cu Next.js, Tailwind CSS și Supabase",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro">
      <body className="antialiased">
        <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-100 dark:border-zinc-800">
          <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
            <a href="/" className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ETF PRO
            </a>
            <div className="flex gap-6 text-sm font-medium">
              <a href="/" className="hover:text-blue-600 transition-colors">Acasă</a>
              <a href="/servicii" className="hover:text-blue-600 transition-colors">Servicii</a>
              <a href="/contact" className="hover:text-blue-600 transition-colors">Contact</a>
            </div>
          </nav>
        </header>
        <main className="pt-16 min-h-screen">
          {children}
        </main>
        <footer className="bg-gray-50 dark:bg-zinc-950 border-t border-gray-100 dark:border-zinc-900 py-12">
          <div className="container mx-auto px-4 text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} ETF PRO. Toate drepturile rezervate.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}

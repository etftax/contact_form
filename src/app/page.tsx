import { ArrowRight, BarChart3, Clock, ShieldCheck, Zap } from "lucide-react";

export default function Home() {
  const stats = [
    { label: "Proiecte Finalizate", value: "250+", icon: ShieldCheck },
    { label: "Clienți Mulțumiți", value: "100+", icon: Zap },
    { label: "Ani Experiență", value: "10+", icon: Clock },
    { label: "Rata de Succes", value: "99%", icon: BarChart3 },
  ];

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-20 lg:py-32 flex flex-col items-center justify-center text-center px-4 relative overflow-hidden bg-gradient-to-b from-blue-50 to-white dark:from-zinc-900 dark:to-black">
        <div className="absolute top-20 -left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute bottom-20 -right-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl -z-10 animate-pulse delay-700"></div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Viitorul Aplicațiilor Web<br />Profesionale
        </h1>
        <p className="max-w-2xl text-lg text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
          Platformă de ultimă generație construită cu Next.js, Tailwind CSS și backend Supabase, optimizată pentru cea mai bună experiență pe orice dispozitiv.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <a href="/contact" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all hover:scale-105 flex items-center gap-2">
            Începe Acum <ArrowRight size={18} />
          </a>
          <a href="/servicii" className="px-8 py-4 border border-gray-200 dark:border-zinc-800 hover:border-blue-600 rounded-xl font-semibold transition-all hover:bg-blue-50/50 dark:hover:bg-blue-900/10">
            Află Mai Multe
          </a>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl w-full px-4 pt-10 border-t border-gray-100 dark:border-zinc-800">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-12 h-12 bg-white dark:bg-zinc-800 rounded-full shadow-lg flex items-center justify-center mb-3 text-blue-600">
                <stat.icon size={24} />
              </div>
              <span className="text-2xl font-bold dark:text-white uppercase">{stat.value}</span>
              <span className="text-sm text-gray-500">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Value Prop Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Propunere de Valoare Unică</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              Oferim soluții digitale integrate pentru business-ul tău. Ne concentrăm pe scalabilitate, securitate și performanță extremă. Fiecare proiect este construit cu atenție maximă la detalii, utilizând cele mai moderne tehnologii de pe piață.
            </p>
            <ul className="space-y-4">
              {["Dezvoltare Rapidă cu Next.js", "Design Modern & Reactiv", "Infrastructură Cloud Securizată", "Support dedicat 24/7"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <div className="w-5 h-5 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center">
                    <ShieldCheck size={14} />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 p-8 rounded-2xl shadow-xl space-y-4">
              <div className="h-4 w-3/4 bg-gray-100 dark:bg-zinc-800 rounded animate-pulse"></div>
              <div className="h-4 w-1/2 bg-gray-100 dark:bg-zinc-800 rounded animate-pulse delay-75"></div>
              <div className="h-32 w-full bg-blue-50 dark:bg-zinc-800/50 rounded-xl my-6"></div>
              <div className="h-4 w-1/4 bg-gray-100 dark:bg-zinc-800 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

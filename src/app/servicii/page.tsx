import { Code2, Globe, Layout, Palette, PhoneCall, Rocket, Search, Smartphone } from "lucide-react";

export default function Services() {
  const services = [
    {
      title: "Dezvoltare Web Next.js",
      desc: "Aplicații ultra-rapide cu App Router și Server Components pentru SEO maxim.",
      icon: Rocket,
      color: "bg-blue-500/10 text-blue-600",
    },
    {
      title: "Design UI/UX Modern",
      desc: "Interfețe minimaliste și intuitive create cu Tailwind CSS pentru experiență fluidă.",
      icon: Palette,
      color: "bg-purple-500/10 text-purple-600",
    },
    {
      title: "Integrare Supabase",
      desc: "Autentificare, Baze de date în timp real și Stocare fișiere, totul într-un cloud securizat.",
      icon: ShieldCheck,
      color: "bg-emerald-500/10 text-emerald-600",
    },
    {
      title: "Aplicații Mobile PWA",
      desc: "Transformă-ți site-ul în aplicație mobilă instalabilă fără publicare în App Store.",
      icon: Smartphone,
      color: "bg-amber-500/10 text-amber-600",
    },
    {
      title: "Optimizare Full SEO",
      desc: "Structură semantică și performanță Lighthouse 100/100 pentru vizibilitate Google.",
      icon: Search,
      color: "bg-rose-500/10 text-rose-600",
    },
    {
      title: "Servicii Consultanță",
      desc: "Planificare strategică a arhitecturii tehnice pentru proiecte la scară largă.",
      icon: PhoneCall,
      color: "bg-indigo-500/10 text-indigo-600",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Ofertele Noastre Principale</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Soluții tehnologice integrate, de la design conceptual până la deployment în producție.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((s, i) => (
          <div key={i} className="group p-8 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${s.color}`}>
              <s.icon size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3 dark:text-white">{s.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">{s.desc}</p>
            <button className="text-blue-600 font-semibold inline-flex items-center gap-2 group-hover:translate-x-2 transition-transform">
              Detalii <ArrowRight size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Subcomponent Helper
function ArrowRight({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function ShieldCheck({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

import { ArrowRight as ArrowIcon } from "lucide-react";

"use client";

import React, { useState, useEffect, useMemo } from "react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend
} from "recharts";
import { 
  TrendingUp, AlertTriangle, CheckCircle2, Target, Wallet, ShieldAlert,
  ArrowUpRight, Download, RotateCcw, Activity, ChevronRight, Scale,
  Layers, Globe, ShieldCheck, Flame, PieChart as LucidePie, Coins, Users, ShoppingBag, Landmark, ArrowRight, Briefcase, Info, FlameKindling, Building2, Truck, HardHat, FileText, CheckCircle, Percent, Car, Fuel, Handshake, Gift, HeartHandshake, CreditCard, Banknote
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PremiumReportProps {
  data: any;
  onReset: () => void;
}

export default function PremiumReport({ data, onReset }: PremiumReportProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const report = useMemo(() => {
    if (!data) return null;

    const curr = data.Balance || { allAccounts: [], companyInfo: {} };
    const findAcc = (code: string) => curr.allAccounts?.find((a:any) => a.cont === code || a.cont.startsWith(code));
    
    // Profit
    const acc1171 = findAcc('1171') || findAcc('117');
    const p1171 = (acc1171?.soldFinalCreditor || 0) - (acc1171?.soldFinalDebitor || 0);
    const acc121 = findAcc('121');
    const p121 = (acc121?.soldFinalCreditor || 0) - (acc121?.soldFinalDebitor || 0);
    const pCumulat = p1171 + p121;

    // Dividends (16% Tax)
    const dividendTax = Math.max(0, pCumulat * 0.16);
    const maxDividendsNet = Math.max(0, pCumulat * 0.84);
    const divDeclared = (findAcc('457')?.soldFinalCreditor || 0);

    // Liquidities
    const casa = findAcc('5311')?.soldFinalDebitor || findAcc('531')?.soldFinalDebitor || 0;
    const banca = (findAcc('5121')?.soldFinalDebitor || 0) + (findAcc('5124')?.soldFinalDebitor || 0);

    // Datorii Stat
    const stateDebt = curr.allAccounts?.filter((a:any) => /^(43|441|4423|444|446|447|448)/.test(a.cont)).reduce((s:number,c:any) => s + ((c.soldFinalCreditor || 0) - (c.soldFinalDebitor || 0)), 0) || 0;

    // Assets
    const buildings = curr.allAccounts?.filter((a:any) => a.cont.startsWith('212')).reduce((a,c)=>a+(c.soldFinalDebitor || 0), 0) || 0;
    const machines = curr.allAccounts?.filter((a:any) => a.cont.startsWith('213')).reduce((a,c)=>a+(c.soldFinalDebitor || 0), 0) || 0;
    const furniture = curr.allAccounts?.filter((a:any) => a.cont.startsWith('214')).reduce((a,c)=>a+(c.soldFinalDebitor || 0), 0) || 0;
    const totalAssets = buildings + machines + furniture;

    const clientsData = data.Clienti?.map((c:any) => ({ name: c.name, value: Math.abs(c.neachitatFinal || 0) })) || [];
    const suppliersData = data.Furnizori?.map((c:any) => ({ name: c.name, value: Math.abs(c.neachitatFinal || 0) })) || [];

    // Expenses Structure
    const cL = curr.cheltuieli || [];
    const structExp = [
      { name: 'Mărfuri (60)', value: cL.filter(c=>c.cont.startsWith('60')).reduce((a,c)=>a+(c.rulajDebitor||c.soldFinalDebitor||0), 0) },
      { name: 'Servicii (61/62)', value: cL.filter(c=>c.cont.startsWith('61')||c.cont.startsWith('62')).reduce((a,c)=>a+(c.rulajDebitor||c.soldFinalDebitor||0), 0) },
      { name: 'Personal (64)', value: cL.filter(c=>c.cont.startsWith('64')).reduce((a,c)=>a+(c.rulajDebitor||c.soldFinalDebitor||0), 0) },
      { name: 'Altele', value: cL.filter(c=>!(/^(60|61|62|64)/.test(c.cont))).reduce((a,c)=>a+(c.rulajDebitor||c.soldFinalDebitor||0), 0) }
    ].filter(e=>e.value > 0);
    const totalExp = structExp.reduce((a,c)=>a+c.value, 0);

    const getVal = (c:string) => {
       const a = findAcc(c);
       return (a?.soldFinalDebitor || a?.soldFinalCreditor || 0);
    };
    const getRulaj = (c:string) => {
       const a = findAcc(c);
       return (a?.rulajDebitor || a?.rulajCreditor || 0);
    };

    // Advanced Fiscal Calculations
    const expProtocol = getRulaj('623');
    const protocolLimit = (p121 + expProtocol) * 0.02;
    const amortizareAuto = getRulaj('2813');
    const exp613 = getRulaj('613');
    const exp6022 = getRulaj('6022');

    return {
       p1171, p121, pCumulat, casa, banca, stateDebt,
       buildings, machines, furniture, totalAssets,
       clientsData: clientsData.slice(0, 5), totalClients: clientsData.reduce((a,c)=>a+c.value, 0),
       suppliersData: suppliersData.slice(0, 5), totalSuppliers: suppliersData.reduce((a,c)=>a+c.value, 0),
       structExp, totalExp, dividendTax, maxDividendsNet, divDeclared,
       auditAccounts: [
          { id: '473', v: getRulaj('473'), l: 'Audit 473 Rulaj', m: 'Urmăriți sumele neclarificate din exploatare.' },
          { id: '461', v: getVal('461'), l: 'Audit 461 Debitori', m: 'Debitori diverși; riscuri de recuperare scadențe.' },
          { id: '471', v: getVal('471'), l: 'Review 471 Avans Exp', m: 'Cheltuieli în avans; eșalonare corectă a costului.' },
          { id: '472', v: getVal('472'), l: 'Review 472 Avans Ven', m: 'Venituri în avans; prestarea serviciilor în curs.' },
          { id: '409', v: getVal('409'), l: 'Check 409 Avans Furn', m: 'Avansuri furnizori; livrări de bunuri pendinte.' },
          { id: '419', v: getVal('419'), l: 'Check 419 Avans Cli', m: 'Avansuri clienți; scadențe de facturare finală.' }
       ],
       expenseAudit: [
          { id: '6022', v: exp6022, l: 'Combustibil (6022)', m: 'Analiza lunară a consumului. Atenție: Deducere 50% fără foi!', icon: <Fuel className="w-5 h-5"/> },
          { id: '2813', v: amortizareAuto, l: 'Amortizare 2813', m: 'Limitare amortizare 1.500 lei/lună per mașină.', icon: <Building2 className="w-5 h-5"/> },
          { id: '613', v: exp613, l: 'Asigurări 613', m: 'Costuri RCA/Casco auto; limitare 50% aplicabilă.', icon: <ShieldCheck className="w-5 h-5"/> },
          { id: '623', v: expProtocol, l: 'Protocol (2%)', m: `Limită Deductibilă: ${Math.max(0, protocolLimit).toFixed(0)} RON.`, icon: <Gift className="w-5 h-5"/> },
          { id: '645', v: getVal('645'), l: 'Ch. Sociale', m: 'Deductibilitate limitată la 5% din fond salarii.', icon: <Users className="w-5 h-5"/> },
          { id: '658', v: getVal('6582') || getVal('6584'), l: 'Sponsorizări', m: 'Plafoane 0.75% CA și 20% Impozit Profit.', icon: <HeartHandshake className="w-5 h-5"/> }
       ],
       company: curr.companyInfo || { name: 'FIRMA ANALIZATA', fullMeta: '-' }
    };
  }, [data]);

  if (!mounted || !report) return null;

  return (
    <div className="space-y-12 pb-32 animate-in fade-in duration-500 max-w-[1200px] mx-auto px-6">
      
      {/* 🔝 HEADER */}
      <header className="py-8 flex flex-col items-center gap-3 text-center border-b border-zinc-100 dark:border-white/5">
         <motion.div initial={{ y: -5, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="px-10 py-3 bg-zinc-950 rounded-full shadow-2xl shadow-black/40 border border-white/10">
            <h1 className="text-xl md:text-2xl font-black text-amber-500 tracking-tight uppercase leading-none truncate max-w-[600px]">
               {report.company.name || 'FIRMA ANALIZATĂ'}
            </h1>
         </motion.div>
         <motion.div initial={{ y: 5, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="px-8 py-3.5 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-white/10 shadow-sm max-w-4xl">
            <p className="text-[10px] font-bold text-zinc-500 leading-relaxed uppercase tracking-widest text-center">
               {report.company.fullMeta || 'IDENTIFICARE FIRMĂ LIPSEȘTE'}
            </p>
         </motion.div>
         <p className="text-[8px] font-black text-zinc-300 dark:text-zinc-600 tracking-[0.4em] uppercase">Powered by ETF • Sentinel Diagnostic Suite 2026</p>
      </header>

      {/* 📊 SUMMARY */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-gradient-to-br from-indigo-700 to-indigo-950 p-6 rounded-[40px] text-white shadow-xl relative border border-white/5">
            <p className="text-[10px] font-black uppercase mb-4 opacity-60 tracking-widest leading-none">Profitabile Netă</p>
            <div className="pt-2 text-center text-3xl font-black leading-none">{report.pCumulat.toLocaleString()}</div>
         </div>
         <div className="bg-gradient-to-br from-emerald-600 to-teal-800 p-6 rounded-[40px] text-white shadow-xl border border-white/5">
            <p className="text-[10px] font-black uppercase mb-4 opacity-60 tracking-widest leading-none">Lichiditate Bancă & Casă</p>
            <div className="pt-2 text-center text-3xl font-black leading-none">{(report.casa + report.banca).toLocaleString()}</div>
         </div>
         <div className="bg-zinc-950 p-6 rounded-[40px] border border-rose-500/30 text-rose-500 shadow-xl text-center flex flex-col justify-center">
            <h2 className="text-4xl font-black tracking-tighter leading-none">{report.stateDebt.toLocaleString()}</h2>
            <p className="text-[9px] text-zinc-700 font-bold uppercase mt-3 tracking-widest italic leading-none">Datorii Stat</p>
         </div>
      </div>

      {/* 💰 DIVIDENDS */}
      <section className="bg-white dark:bg-zinc-900 p-8 rounded-[40px] border border-zinc-100 dark:border-white/5 shadow-sm flex flex-col md:flex-row items-center gap-10">
         <div className="shrink-0 flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center text-black shadow-lg shadow-amber-500/20">
               <Percent className="w-6 h-6" />
            </div>
            <div>
               <h3 className="text-2xl font-black uppercase tracking-tighter leading-none dark:text-white">Dividende</h3>
               <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest mt-1">Impozit 16% Fiscal</p>
            </div>
         </div>
         <div className="flex-1 grid grid-cols-2 gap-6 w-full border-l border-zinc-100 dark:border-white/5 pl-10 hidden md:grid text-center">
            <div><p className="text-[9px] font-black text-zinc-400 uppercase mb-2">Impozit 16%</p><p className="font-black text-rose-500 text-lg leading-none">{report.dividendTax.toLocaleString()}</p></div>
            <div><p className="text-[9px] font-black text-zinc-400 uppercase mb-2">Net Disponibil</p><p className="font-black dark:text-white text-lg leading-none">{report.maxDividendsNet.toLocaleString()}</p></div>
         </div>
      </section>

      {/* 🛡️ AUDIT 1: ACCOUNT DIAGNOSTIC (VIVID PREMIUM) */}
      <section className="bg-[#000810] p-10 rounded-[56px] border border-white/10 text-white shadow-2xl relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-rose-600/10 blur-[100px] rounded-full -mr-32 -mt-32" />
         <div className="flex items-center gap-4 mb-12 border-b border-white/10 pb-10">
            <div className="p-4 bg-rose-600 rounded-3xl shadow-[0_0_20px_rgba(225,29,72,0.4)]">
               <ShieldCheck className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-3xl font-black uppercase tracking-tighter leading-none text-white">Diagnostic Audit Sentinel</h3>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {report.auditAccounts.map(b => (
               <div key={b.id} className={`group relative p-8 rounded-[40px] flex flex-col border transition-all duration-500 ${
                  b.v > 0 
                  ? 'bg-gradient-to-br from-rose-600 to-rose-900 border-rose-400/50 shadow-[0_0_40px_rgba(225,29,72,0.2)] scale-105 z-10' 
                  : 'bg-gradient-to-br from-amber-400/20 to-amber-600/10 border-amber-400/30'
               }`}>
                  <div className="flex justify-between items-start mb-6">
                     <div className={`p-4 rounded-3xl shadow-xl transition-all ${
                        b.v > 0 ? 'bg-white text-rose-600 animate-pulse' : 'bg-amber-500 text-black shadow-amber-500/20'
                     }`}>
                        {b.v > 0 ? <Flame className="w-7 h-7" /> : <CheckCircle2 className="w-7 h-7" />}
                     </div>
                     <span className={`text-[12px] font-black px-5 py-2.5 rounded-2xl shadow-inner ${
                        b.v > 0 ? 'bg-black/20 text-white' : 'bg-black text-amber-500'
                     }`}>
                        {b.v.toLocaleString()} <span className="opacity-50">LEI</span>
                     </span>
                  </div>
                  <h4 className={`text-lg font-black uppercase mb-3 ${b.v > 0 ? 'text-white' : 'text-amber-400'}`}>{b.l}</h4>
                  <p className={`text-[11px] font-bold italic leading-relaxed ${b.v > 0 ? 'text-white/80' : 'text-zinc-400'}`}>{b.m}</p>
               </div>
            ))}
         </div>
      </section>

      {/* 🛡️ AUDIT 2: EXPENSE DEDUCTION (FUEL 6022 RELOADED) */}
      <section className="bg-[#f8fafc] dark:bg-zinc-950 p-10 rounded-[56px] border border-zinc-200 dark:border-white/5 shadow-2xl relative overflow-hidden">
         <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/10 blur-[100px] rounded-full -ml-32 -mb-32" />
         <div className="flex items-center gap-4 mb-12 border-b border-zinc-200 dark:border-zinc-800 pb-10">
            <div className="p-4 bg-indigo-600 rounded-3xl shadow-[0_0_20px_rgba(79,70,229,0.3)]">
               <Activity className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-3xl font-black uppercase tracking-tighter text-zinc-950 dark:text-white leading-none">Scrutin Cheltuieli & Deduceri</h3>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {report.expenseAudit.map(b => (
               <div key={b.id} className={`group p-8 rounded-[40px] flex flex-col border transition-all duration-300 ${
                  b.v > 0 
                  ? 'bg-white dark:bg-zinc-900 border-indigo-400 shadow-xl shadow-indigo-500/5' 
                  : 'bg-zinc-50 dark:bg-white/5 border-zinc-100 dark:border-white/5 opacity-60'
               }`}>
                  <div className="flex justify-between items-start mb-6">
                     <div className={`p-4 rounded-3xl shadow-lg transition-transform group-hover:scale-110 ${
                        b.v > 0 ? 'bg-indigo-600 text-white' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-400'
                     }`}>
                        {b.icon}
                     </div>
                     <span className={`text-[12px] font-black px-5 py-2.5 rounded-2xl shadow-sm ${
                        b.v > 0 ? 'bg-amber-100 text-amber-900 font-mono' : 'bg-zinc-100 text-zinc-500'
                     }`}>
                        {b.v.toLocaleString()} <span className="opacity-50">LEI</span>
                     </span>
                  </div>
                  <h4 className={`text-lg font-black uppercase mb-3 ${b.v > 0 ? 'text-indigo-900 dark:text-indigo-400' : 'text-zinc-400'}`}>{b.l}</h4>
                  <p className={`text-[11px] font-bold italic leading-relaxed ${b.v > 0 ? 'text-zinc-600 dark:text-zinc-400' : 'text-zinc-500'}`}>{b.m}</p>
               </div>
            ))}
         </div>
      </section>

      {/* 🍣 CHAPTER ANALYSIS PANELS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         {/* Assets */}
         <section className="bg-zinc-50 dark:bg-zinc-900 p-10 rounded-[48px] border border-zinc-100 dark:border-white/5 flex flex-col">
            <h3 className="text-xl font-black uppercase tracking-tighter mb-10 flex items-center gap-3 dark:text-white truncate"><Building2 className="w-6 h-6" /> Patrimoniu</h3>
            <div className="space-y-5 text-[12px] font-bold flex-1">
               {[
                  { l: 'Clădiri (212)', v: report.buildings, p: (report.buildings/report.totalAssets)*100 },
                  { l: 'Transport (213)', v: report.machines, p: (report.machines/report.totalAssets)*100 },
                  { l: 'Utilaje (214)', v: report.furniture, p: (report.furniture/report.totalAssets)*100 }
               ].map((a, i) => (
                  <div key={i} className="flex justify-between items-center text-zinc-500 uppercase border-b border-zinc-200/50 dark:border-white/5 pb-3">
                     <span>{a.l}</span><span className="text-zinc-950 dark:text-white font-black font-mono">{a.v.toLocaleString()} <span className="opacity-30">({a.p.toFixed(0)}%)</span></span>
                  </div>
               ))}
            </div>
            <div className="mt-8 p-6 bg-zinc-950 rounded-[32px] text-center border border-white/5"><p className="text-[10px] text-zinc-500 uppercase mb-1">Valoare Netă Patrimoniu</p><p className="text-2xl font-black text-amber-500 font-mono">{report.totalAssets.toLocaleString()}</p></div>
         </section>

         {/* Expenses */}
         <section className="bg-zinc-950 p-10 rounded-[48px] border border-white/5 text-white flex flex-col justify-between shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-amber-500" />
            <h3 className="text-xl font-black uppercase tracking-tighter mb-10 text-orange-400">Structură Costuri (%)</h3>
            <div className="space-y-4 flex-1">
               {report.structExp.map((c:any, i:number) => (
                  <div key={i} className="flex justify-between items-center text-[10px] font-bold border-b border-white/5 pb-3">
                     <span className="text-zinc-500 uppercase truncate max-w-[150px]">{c.name}</span><div className="flex items-center gap-6 font-mono"><span className="font-black">{c.value.toLocaleString()}</span><span className="text-orange-500 font-extrabold">{((c.value/report.totalExp)*100).toFixed(1)}%</span></div>
                  </div>
               ))}
            </div>
         </section>

         {/* Clients */}
         <section className="bg-[#0f172a] p-10 rounded-[48px] border border-blue-500/20 text-white flex flex-col justify-between shadow-xl">
            <h4 className="text-xl font-black text-blue-400 mb-10 uppercase flex items-center gap-3"><Users className="w-5 h-5 text-blue-500" /> Top Clienți</h4>
            <div className="space-y-4 flex-1">
               {report.clientsData.map((c:any, i:number) => (
                  <div key={i} className="flex justify-between items-center text-[11px] font-bold border-b border-white/5 pb-3 opacity-95">
                     <span className="text-zinc-400 uppercase truncate max-w-[190px]">{c.name}</span>
                     <div className="text-right font-mono"><p className="font-black">{c.value.toLocaleString()}</p><p className="text-blue-500 text-[10px]">{((c.value/report.totalClients || 1)*100).toFixed(1)}%</p></div>
                  </div>
               ))}
            </div>
         </section>

         {/* Suppliers */}
         <section className="bg-[#09090b] p-10 rounded-[48px] border border-rose-500/20 text-white flex flex-col justify-between shadow-xl">
           <h4 className="text-xl font-black text-rose-500 mb-10 uppercase flex items-center gap-3"><ShoppingBag className="w-5 h-5 text-rose-600" /> Top Furnizori</h4>
            <div className="space-y-4 flex-1">
               {report.suppliersData.map((c:any, i:number) => (
                  <div key={i} className="flex justify-between items-center text-[11px] font-bold border-b border-white/5 pb-3">
                     <span className="text-zinc-500 uppercase truncate max-w-[190px]">{c.name}</span>
                     <div className="text-right font-mono"><p className="font-black">{c.value.toLocaleString()}</p><p className="text-rose-500/80 text-[10px]">{((c.value/report.totalSuppliers || 1)*100).toFixed(1)}%</p></div>
                  </div>
               ))}
            </div>
         </section>
      </div>

      {/* 🗣️ FOOTER */}
      <footer className="bg-zinc-100 dark:bg-zinc-900 p-16 rounded-[72px] text-center border border-zinc-200 dark:border-white/5">
         <p className="text-[12px] font-bold text-zinc-400 max-w-2xl mx-auto italic mb-10 border-b border-zinc-200 dark:border-white/5 pb-10 leading-relaxed uppercase tracking-widest whitespace-nowrap overflow-hidden text-ellipsis">
            "Sentinel Framework 2026 - Certificat ETF Premium. Profit Net Verificat: {report.pCumulat.toLocaleString()}"
         </p>
         <button onClick={() => window.print()} className="bg-zinc-950 text-white px-20 py-6 rounded-full font-black text-sm uppercase tracking-[0.3em] shadow-2xl hover:scale-105 transition-all active:scale-95 shadow-black/50">Export Raport Sentinel PDF</button>
      </footer>

    </div>
  );
}

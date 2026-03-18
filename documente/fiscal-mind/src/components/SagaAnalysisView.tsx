"use client";

import React, { useState } from "react";
import { Table, Search, Download, FileSpreadsheet, Users, ShoppingBag } from "lucide-react";

export default function SagaAnalysisView({ data }: { data: any }) {
  const [activeTab, setActiveTab] = useState<'balance' | 'clients' | 'suppliers'>('balance');

  const balance = data.Balance?.allAccounts || [];
  const clients = data.Clienti || [];
  const suppliers = data.Furnizori || [];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Tabs */}
      <div className="flex gap-2 p-1.5 bg-zinc-100 dark:bg-white/5 rounded-2xl w-fit border border-zinc-200 dark:border-white/10">
        {[
          { id: 'balance', label: 'Balanță Completă', icon: FileSpreadsheet },
          { id: 'clients', label: 'Situație Clienți', icon: Users },
          { id: 'suppliers', label: 'Situație Furnizori', icon: ShoppingBag },
        ].map((tab:any) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
              activeTab === tab.id 
                ? "bg-zinc-950 text-white shadow-xl scale-105" 
                : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-white/5"
            }`}
          >
            <tab.icon className="w-4 h-4" /> {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="bg-white dark:bg-zinc-950 rounded-[40px] border border-zinc-200 dark:border-white/5 shadow-2xl overflow-hidden">
        {activeTab === 'balance' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-50 dark:bg-white/5 border-b border-zinc-200 dark:border-white/10 font-black text-[10px] uppercase text-zinc-500 tracking-widest">
                  <th className="px-8 py-5">Cont</th>
                  <th className="px-8 py-5">Denumire</th>
                  <th className="px-8 py-5 text-right">Debit Final</th>
                  <th className="px-8 py-5 text-right">Credit Final</th>
                </tr>
              </thead>
              <tbody className="text-xs font-bold divide-y divide-zinc-100 dark:divide-white/5">
                {balance.map((row: any, i:number) => (
                  <tr key={i} className="hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors group">
                    <td className="px-8 py-4 font-black text-blue-600 dark:text-blue-400">{row.cont}</td>
                    <td className="px-8 py-4 text-zinc-950 dark:text-white uppercase truncate max-w-[300px]">{row.denumire}</td>
                    <td className="px-8 py-4 text-right text-zinc-900 dark:text-zinc-300 font-mono">{(row.soldFinalDebitor || 0).toLocaleString()}</td>
                    <td className="px-8 py-4 text-right text-zinc-900 dark:text-zinc-300 font-mono">{(row.soldFinalCreditor || 0).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'clients' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-50 dark:bg-white/5 border-b border-zinc-200 dark:border-white/10 font-black text-[10px] uppercase text-zinc-500 tracking-widest">
                  <th className="px-8 py-5">Partener / Client</th>
                  <th className="px-8 py-5 text-right">Debit (Incasat)</th>
                  <th className="px-8 py-5 text-right">Credit (Neachitat)</th>
                </tr>
              </thead>
              <tbody className="text-xs font-bold divide-y divide-zinc-100 dark:divide-white/5">
                {clients.map((row: any, i:number) => (
                  <tr key={i} className="hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors group">
                    <td className="px-8 py-4 text-zinc-950 dark:text-white uppercase truncate max-w-[400px]">{row.name}</td>
                    <td className="px-8 py-4 text-right text-emerald-600 font-mono">{(row.incasari || 0).toLocaleString()}</td>
                    <td className="px-8 py-4 text-right text-rose-500 font-mono">{(row.neachitatFinal || 0).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'suppliers' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-50 dark:bg-white/5 border-b border-zinc-200 dark:border-white/10 font-black text-[10px] uppercase text-zinc-500 tracking-widest">
                  <th className="px-8 py-5">Partener / Furnizor</th>
                  <th className="px-8 py-5 text-right">Credit (Achitat)</th>
                  <th className="px-8 py-5 text-right">Debit (Neachitat)</th>
                </tr>
              </thead>
              <tbody className="text-xs font-bold divide-y divide-zinc-100 dark:divide-white/5">
                {suppliers.map((row: any, i:number) => (
                  <tr key={i} className="hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors group">
                    <td className="px-8 py-4 text-zinc-950 dark:text-white uppercase truncate max-w-[400px]">{row.name}</td>
                    <td className="px-8 py-4 text-right text-blue-600 font-mono">{(row.total || 0).toLocaleString()}</td>
                    <td className="px-8 py-4 text-right text-rose-500 font-mono">{(row.neachitatFinal || 0).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="text-[10px] text-center font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
         Raport Generat prin Scanare Inteligentă Saga V7
      </p>
    </div>
  );
}

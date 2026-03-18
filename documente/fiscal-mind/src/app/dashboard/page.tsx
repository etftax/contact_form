"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { TrendingUp, FileText, History as HistoryIcon, LayoutDashboard, BarChart3, Printer } from "lucide-react";
import UploadSection from "@/components/UploadSection";
import PremiumReport from "@/components/PremiumReport";
import SagaAnalysisView from "@/components/SagaAnalysisView";

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const view = searchParams.get("view") || "upload";
  const [lastResult, setLastResult] = useState<any>(null);

  const renderContent = () => {
    switch (view) {
      case "saga":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter">Situatii Saga Istoric</h2>
              <button 
                onClick={() => window.print()}
                className="flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-xl text-xs font-bold hover:bg-zinc-800 transition-all"
              >
                <Printer className="w-4 h-4" /> Printează Situația
              </button>
            </div>
            {lastResult ? (
               <SagaAnalysisView data={lastResult} />
            ) : (
               <div className="p-20 text-center bg-zinc-50 dark:bg-white/5 rounded-[40px] border-2 border-dashed border-zinc-200 dark:border-white/10">
                  <FileText className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
                  <p className="text-zinc-500 font-bold">Nu există date încălcate. Te rugăm să încarci o balanță în Dashboard.</p>
               </div>
            )}
          </div>
        );
      
      case "cfo":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter">CFO Insights Pro</h2>
              <button 
                onClick={() => window.print()}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
              >
                <Printer className="w-4 h-4" /> Exportă PDF Premium
              </button>
            </div>
            {lastResult ? (
               <PremiumReport data={lastResult} onReset={() => {}} />
            ) : (
               <div className="p-20 text-center bg-zinc-50 dark:bg-white/5 rounded-[40px] border-2 border-dashed border-zinc-200 dark:border-white/10">
                  <BarChart3 className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
                  <p className="text-zinc-500 font-bold">Raportul CFO nu a fost generat. Încarcă fișierele în secțiunea principală.</p>
               </div>
            )}
          </div>
        );

      case "history":
        return (
          <div className="p-20 text-center bg-zinc-50 dark:bg-white/5 rounded-[40px] border-2 border-dashed border-zinc-200 dark:border-white/10">
             <HistoryIcon className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
             <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Istoric Balante</h2>
             <p className="text-zinc-500">Această funcționalitate va fi disponibilă în versiunea Enterprise.</p>
          </div>
        );

      default:
        return (
          <div className="space-y-12">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-none">Salut, CFO!</h1>
                <p className="mt-3 text-zinc-500 font-medium italic">Încarcă balanțele pentru a debloca diagnosticul Sentinel.</p>
              </div>
            </div>
            <UploadSection onResult={(data: any) => setLastResult(data)} />
          </div>
        );
    }
  };

  return (
    <div className="animate-in fade-in duration-700">
      {renderContent()}
    </div>
  );
}

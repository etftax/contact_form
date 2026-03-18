"use client";

import React, { useState } from "react";
import { Upload, FileText, CheckCircle2, Loader2, AlertCircle, Zap } from "lucide-react";
import { processReportsAction } from "@/app/actions/reports";
import PremiumReport from "./PremiumReport";

export default function UploadSection({ onResult }: { onResult?: (data: any) => void }) {
  const [files, setFiles] = useState<{ [key: string]: File | null }>({
    clienti: null,
    furnizori: null,
    balantaPrecedenta: null,
    balantaCurenta: null,
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = e.target.files?.[0];
    if (file) {
      setFiles((prev) => ({ ...prev, [type]: file }));
      setError(null);
    }
    e.target.value = "";
  };

  const handleProcess = async () => {
    if (!files.balantaCurenta) {
      setError("Te rugăm să încarci cel puțin Balanța de verificare curentă.");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const formData = new FormData();
      if (files.clienti) formData.append("clienti", files.clienti);
      if (files.furnizori) formData.append("furnizori", files.furnizori);
      if (files.balantaPrecedenta) formData.append("balantaPrecedenta", files.balantaPrecedenta);
      if (files.balantaCurenta) formData.append("balantaCurenta", files.balantaCurenta);

      const res = await processReportsAction(formData);
      
      if (res.error) {
        setError(res.error);
      } else {
        setResult(res.data);
        if (onResult) onResult(res.data);
      }
    } catch (err) {
      setError("A intervenit o eroare la procesarea fișierelor.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (result) {
    return <PremiumReport data={result} onReset={() => setResult(null)} />;
  }

  const uploadSlots = [
    { id: "balantaPrecedenta", label: "Balanță Lună Precedentă", icon: Upload, optional: true },
    { id: "balantaCurenta", label: "Balanță Lună Curentă", icon: Upload, required: true },
    { id: "clienti", label: "Listă Clienți", icon: FileText, optional: true },
    { id: "furnizori", label: "Listă Furnizori", icon: FileText, optional: true },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-700">
      <div className="text-center space-y-4">
        <h2 className="text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-tight">
          Saga AI <span className="text-blue-600">V7 Engine</span>
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-lg max-w-2xl mx-auto">
          Izolăm automat activitatea lunii curente folosind metoda scăderii între două balanțe.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {uploadSlots.map((item) => {
          const isSelected = !!files[item.id];
          return (
            <div 
              key={item.id} 
              className={`group relative overflow-hidden rounded-[40px] border-2 transition-all p-8 flex flex-col items-center gap-4 text-center ${
                isSelected 
                  ? "bg-emerald-500/5 border-emerald-500/50 shadow-2xl shadow-emerald-500/20" 
                  : "bg-white/5 border-white/5 hover:border-blue-500/20 hover:bg-blue-500/5"
              }`}
            >
              <input
                type="file"
                onChange={(e) => handleFileChange(e, item.id)}
                className="absolute inset-0 opacity-0 cursor-pointer z-20"
                accept=".xlsx"
              />
              <div className={`p-4 rounded-2xl transition-all duration-500 ${
                isSelected ? "bg-emerald-500 text-white scale-110 rotate-3" : "bg-blue-600/10 text-blue-600"
              }`}>
                {isSelected ? <CheckCircle2 className="w-8 h-8" /> : <item.icon className="w-8 h-8" />}
              </div>
              <div>
                <p className={`font-bold text-base ${isSelected ? "text-emerald-500" : "text-zinc-900 dark:text-white"}`}>
                  {item.label}
                </p>
                <p className="text-[10px] text-zinc-500 mt-1 uppercase tracking-widest">
                  {isSelected ? files[item.id]!.name : (item.required ? "Obligatoriu" : "Opțional")}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {error && (
        <div className="flex items-center gap-3 p-6 bg-red-500/10 border border-red-500/20 rounded-[24px] text-red-500 text-sm animate-bounce">
          <AlertCircle className="w-5 h-5" />
          <span className="font-bold">{error}</span>
        </div>
      )}

      <div className="flex justify-center pt-8">
        <button
          onClick={handleProcess}
          disabled={isProcessing}
          className={`hover-glow group relative px-20 py-6 rounded-[32px] font-black text-xl transition-all ${
            isProcessing || !files.balantaCurenta
              ? "bg-zinc-800 text-zinc-600 opacity-50 cursor-not-allowed"
              : "bg-blue-600 text-white shadow-2xl shadow-blue-600/30 hover:scale-105 active:scale-95"
          }`}
        >
          {isProcessing ? (
            <span className="flex items-center gap-4">
               <Loader2 className="w-7 h-7 animate-spin" />
               EXTRACȚIE ACTIVĂ...
            </span>
          ) : (
            <span className="flex items-center gap-4">
              GENEREAZĂ RAPORT PREMIUM
              <Zap className="w-6 h-6 animate-pulse" />
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

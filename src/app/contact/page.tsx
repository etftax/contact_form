"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2, Mail, Phone, MapPin } from "lucide-react";
import { submitContact } from "./actions";

export default function Contact() {
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    setMessage(null);

    try {
      const result = await submitContact(formData);
      
      if (result.error) {
        setMessage({ type: "error", text: result.error });
      } else {
        setMessage({ type: "success", text: "Mesajul a fost trimis cu succes! Te vom contacta în curând." });
        const form = document.getElementById("contact-form") as HTMLFormElement;
        form.reset();
      }
    } catch (err) {
      setMessage({ type: "error", text: "A apărut o eroare neșteptată la trimiterea formularului." });
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="grid lg:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
        
        {/* Contact Info */}
        <div className="space-y-10">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">Hai să Discutăm!</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Completează formularul și un consultant te va contacta în cel mai scurt timp posibil. Suntem aici să te ajutăm cu proiectul tău digital.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 border rounded-2xl hover:bg-gray-50 transition-colors bg-white dark:bg-zinc-900 dark:border-zinc-800">
              <div className="w-12 h-12 bg-blue-100 dark:bg-zinc-800 rounded-xl flex items-center justify-center text-blue-600">
                <Mail size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Email Direct</span>
                <span className="font-semibold text-lg">contact@etfpro.ro</span>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 border rounded-2xl hover:bg-gray-50 transition-colors bg-white dark:bg-zinc-900 dark:border-zinc-800">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-zinc-800 rounded-xl flex items-center justify-center text-emerald-600">
                <Phone size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Telefon / WhatsApp</span>
                <span className="font-semibold text-lg">+40 700 000 000</span>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 border rounded-2xl hover:bg-gray-50 transition-colors bg-white dark:bg-zinc-900 dark:border-zinc-800">
              <div className="w-12 h-12 bg-purple-100 dark:bg-zinc-800 rounded-xl flex items-center justify-center text-purple-600">
                <MapPin size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Adresa Birou</span>
                <span className="font-semibold text-lg">București, Sector 1, România</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 p-8 lg:p-10 rounded-[2.5rem] shadow-2xl relative">
          <div className="absolute top-0 right-10 -translate-y-1/2 w-20 h-2 bg-blue-600 rounded-full"></div>
          
          <form id="contact-form" action={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold ml-1">Nume Complet</label>
                <input 
                  type="text" 
                  name="name" 
                  required 
                  placeholder="Popescu Ion"
                  className="w-full px-4 py-3 rounded-xl border-gray-200 dark:border-zinc-800 dark:bg-zinc-800/50 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold ml-1">Adresă Email</label>
                <input 
                  type="email" 
                  name="email" 
                  required 
                  placeholder="ion@exemplu.ro"
                  className="w-full px-4 py-3 rounded-xl border-gray-200 dark:border-zinc-800 dark:bg-zinc-800/50 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold ml-1">Număr Telefon (opțional)</label>
              <input 
                type="tel" 
                name="phone" 
                placeholder="+40 700 000 000"
                className="w-full px-4 py-3 rounded-xl border-gray-200 dark:border-zinc-800 dark:bg-zinc-800/50 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold ml-1">Mesajul Tău</label>
              <textarea 
                name="message" 
                required 
                rows={4}
                placeholder="Cum te putem ajuta?"
                className="w-full px-4 py-3 rounded-xl border-gray-200 dark:border-zinc-800 dark:bg-zinc-800/50 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all resize-none placeholder:text-gray-400"
              />
            </div>

            {message && (
              <div className={`p-4 rounded-xl flex items-center gap-3 transition-all animate-in fade-in duration-500 ${
                message.type === "success" 
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200" 
                  : "bg-rose-50 text-rose-700 border border-rose-200"
              }`}>
                {message.type === "success" ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                <p className="text-sm font-medium">{message.text}</p>
              </div>
            )}

            <button 
              type="submit" 
              disabled={isPending}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:scale-100"
            >
              {isPending ? (
                <>Trimitere... <Loader2 className="animate-spin" size={20} /></>
              ) : (
                <>Trimite Mesajul <Send size={20} /></>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

"use server";

import { createClient } from "@supabase/supabase-js";

export async function submitContact(formData: FormData) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const message = formData.get("message") as string;

  // Basic Server-side validation
  if (!name || !email || !message) {
    return { error: "Câmpurile Nume, Email și Mesaj sunt obligatorii." };
  }

  try {
    const { error } = await supabase
      .from("contact_messages")
      .insert([{ name, email, phone, message }]);

    if (error) {
      console.error("Supabase Error:", error);
      return { error: "Eroare la trimiterea mesajului. Te rugăm să încerci mai târziu." };
    }

    return { success: true };
  } catch (err) {
    console.error("Unexpected Error:", err);
    return { error: "A apărut o eroare neșteptată." };
  }
}

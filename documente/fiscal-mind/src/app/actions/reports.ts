"use server";

import { extractTertiFromBuffer, extractBalanceFromBuffer, TertiData } from "@/lib/extractor";

export async function processReportsAction(formData: FormData) {
  try {
    const clientsFile = formData.get("clienti") as File;
    const suppliersFile = formData.get("furnizori") as File;
    const balancePrevFile = formData.get("balantaPrecedenta") as File;
    const balanceCurrFile = formData.get("balantaCurenta") as File;
    
    if (!balanceCurrFile) {
      throw new Error("Balanța curentă este obligatorie!");
    }

    const currBuffer = await balanceCurrFile.arrayBuffer();
    const currBalance = extractBalanceFromBuffer(currBuffer);
    
    let prevBalance = null;
    if (balancePrevFile && balancePrevFile.size > 0) {
      const prevBuffer = await balancePrevFile.arrayBuffer();
      prevBalance = extractBalanceFromBuffer(prevBuffer);
    }

    let clienti: TertiData[] = [];
    if (clientsFile && clientsFile.size > 0) {
      const clientsBuffer = await clientsFile.arrayBuffer();
      clienti = extractTertiFromBuffer(clientsBuffer);
    }

    let furnizori: TertiData[] = [];
    if (suppliersFile && suppliersFile.size > 0) {
      const suppliersBuffer = await suppliersFile.arrayBuffer();
      furnizori = extractTertiFromBuffer(suppliersBuffer);
    }

    return {
      success: true,
      data: {
        Clienti: clienti,
        Furnizori: furnizori,
        Balance: currBalance,
        PrevBalance: prevBalance
      }
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message
    };
  }
}

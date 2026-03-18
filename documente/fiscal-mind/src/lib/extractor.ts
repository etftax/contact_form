import * as XLSX from 'xlsx';

export interface CompanyInfo {
  name: string;
  address: string;
  cui: string;
  fullMeta: string; // The long metadata line
}

export interface TertiData {
  name: string;
  total: number;
  incasari: number;
  neachitatFinal: number;
}

export interface BalanceAccount {
  cont: string;
  denumire: string;
  soldFinalDebitor?: number;
  soldFinalCreditor?: number;
  totalDebitor?: number;
  totalCreditor?: number;
  rulajDebitor?: number;
  rulajCreditor?: number;
}

export function extractTertiFromBuffer(buffer: ArrayBuffer): TertiData[] {
  const data = new Uint8Array(buffer);
  const workbook = XLSX.read(data, { type: 'array' });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows: any[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });
  const results: TertiData[] = [];
  for (const row of rows) {
    if (!row || row.length < 5) continue;
    const rowStr = row.map(v => String(v || "").trim()).join(" ");
    const match = rowStr.match(/Total la (.*):/i);
    if (match) {
      const name = match[1].trim();
      const numValues = row.filter(v => typeof v === 'number');
      if (numValues.length >= 3) {
        const final = numValues[numValues.length - 1];
        if (Math.abs(final) > 0.01) {
          results.push({ name, total: numValues[numValues.length-3], incasari: numValues[numValues.length-2], neachitatFinal: final });
        }
      }
    }
  }
  return results.sort((a,b) => Math.abs(b.neachitatFinal) - Math.abs(a.neachitatFinal));
}

export function extractBalanceFromBuffer(buffer: ArrayBuffer) {
  const data = new Uint8Array(buffer);
  const workbook = XLSX.read(data, { type: 'array' });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows: any[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });
  const companyInfo: CompanyInfo = { name: '', address: '', cui: '', fullMeta: '' };
  const allAccounts: BalanceAccount[] = [];
  const venituri: BalanceAccount[] = [];
  const cheltuieli: BalanceAccount[] = [];

  for (let i = 0; i < 30; i++) {
    const row = rows[i];
    if (!row) continue;
    const line = row.join(" ");
    
    // Line 1: Company Name
    if (line.includes("Unitate")) {
       const raw = line.split(/Unitate[a]?:/i)[1] || "";
       companyInfo.name = raw.split(/CUI:|Adresa:|Nr\.|CIF:|c\.f\.|r\.c\./i)[0].trim().split("  ")[0];
    }
    
    // Meta Line: CF, RC, Address, Capital etc.
    if (line.includes("c.f.") || line.includes("r.c.")) {
       companyInfo.fullMeta = line.trim().replace(/\s+/g, " ");
       // Also extract CUI from this line if possible for fallback
       if (line.includes("c.f.")) {
          companyInfo.cui = line.split("c.f.")[1]?.trim().split(" ")[0];
       }
    }

    // Traditional keywords fallback
    if (line.includes("CUI:") || line.includes("CIF:")) {
       companyInfo.cui = line.split(/CUI:|CIF:/i)[1]?.trim().split(" ")[0];
    }
    if (line.includes("Adresa:")) {
       companyInfo.address = line.split("Adresa:")[1]?.trim().split(/CUI:|CIF:|Cod Fiscal/i)[0].trim().split("  ")[0];
    }
  }

  if (!companyInfo.name && rows[0]) {
     companyInfo.name = String(rows[0][0] || "FIRMA ANALIZATA").replace(/Unitate[a]?:/i, "").trim().split(/c\.f\.|CUI:/)[0].trim();
  }

  for (const row of rows) {
    if (!row || row.length < 10) continue;
    const cont = String(row[0]).trim();
    if (!/^\d+/.test(cont)) continue;
    const denumire = String(row[1]).trim();
    const valTotalD = parseFloat(row[10]) || 0;
    const valTotalC = parseFloat(row[11]) || 0;
    const valSoldD = parseFloat(row[12]) || 0;
    const valSoldC = parseFloat(row[13]) || 0;
    const rulajD = parseFloat(row[8]) || 0;
    const rulajC = parseFloat(row[9]) || 0;
    const acc = { cont, denumire, soldFinalDebitor: valSoldD, soldFinalCreditor: valSoldC, totalDebitor: valTotalD, totalCreditor: valTotalC, rulajDebitor: rulajD, rulajCreditor: rulajC };
    allAccounts.push(acc);
    if (cont.startsWith('7') && cont !== '711') venituri.push(acc);
    if (cont.startsWith('6')) cheltuieli.push(acc);
  }
  return { venituri, cheltuieli, allAccounts, companyInfo, monthNumber: 12 };
}

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Ho ten phai co it nhat 2 ky tu."),
  email: z.string().trim().toLowerCase().email("Email khong hop le."),
  company: z.string().trim().min(2, "Vui long nhap ten doanh nghiep."),
  service: z.enum(["website", "mobile-app", "product-design", "full-stack"]),
  budget: z.enum(["under-50", "50-100", "100-250", "250-plus"]),
  message: z
    .string()
    .trim()
    .min(12, "Mo ta phai co it nhat 12 ky tu.")
    .max(800, "Mo ta nen duoi 800 ky tu.")
});

export type LeadInput = z.infer<typeof leadSchema>;

export type Lead = LeadInput & {
  id: string;
  createdAt: string;
};

const dataDir = path.join(process.cwd(), ".data");
const leadsFile = path.join(dataDir, "leads.json");

export function validateLead(input: Record<string, unknown>): LeadInput {
  const result = leadSchema.safeParse(input);

  if (!result.success) {
    throw new Error(result.error.issues[0]?.message ?? "Du lieu khong hop le.");
  }

  return result.data;
}

async function readLeads(): Promise<Lead[]> {
  try {
    const raw = await readFile(leadsFile, "utf8");
    return JSON.parse(raw) as Lead[];
  } catch {
    return [];
  }
}

export async function createLead(input: Record<string, unknown>): Promise<Lead> {
  const cleanInput = validateLead(input);
  const lead: Lead = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...cleanInput
  };

  await mkdir(dataDir, { recursive: true });
  const leads = await readLeads();
  leads.unshift(lead);
  await writeFile(leadsFile, JSON.stringify(leads, null, 2));

  return lead;
}

export async function listLeads(): Promise<Lead[]> {
  return readLeads();
}

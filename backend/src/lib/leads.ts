import { z } from "zod";
import { prisma } from "@/lib/prisma";

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
  createdAt: Date;
};

export function validateLead(input: Record<string, unknown>): LeadInput {
  const result = leadSchema.safeParse(input);

  if (!result.success) {
    throw new Error(result.error.issues[0]?.message ?? "Du lieu khong hop le.");
  }

  return result.data;
}

export async function createLead(input: Record<string, unknown>): Promise<Lead> {
  const cleanInput = validateLead(input);
  const created = await prisma.lead.create({ data: cleanInput });

  return { ...cleanInput, id: created.id, createdAt: created.createdAt };
}

export async function listLeads(): Promise<Lead[]> {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" }
  });

  return leads.map((lead) => ({
    id: lead.id,
    name: lead.name,
    email: lead.email,
    company: lead.company,
    service: lead.service as LeadInput["service"],
    budget: lead.budget as LeadInput["budget"],
    message: lead.message,
    createdAt: lead.createdAt
  }));
}

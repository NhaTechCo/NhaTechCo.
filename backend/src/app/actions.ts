"use server";

import { createLead } from "@/lib/leads";

export type ActionState = {
  ok: boolean;
  message: string;
};

export async function createLeadAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    await createLead({
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      company: String(formData.get("company") ?? ""),
      service: String(formData.get("service") ?? ""),
      budget: String(formData.get("budget") ?? ""),
      message: String(formData.get("message") ?? "")
    });

    return {
      ok: true,
      message: "Da luu yeu cau tu van."
    };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Khong the luu yeu cau."
    };
  }
}

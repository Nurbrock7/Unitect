"use server";

import { supabase } from "@/lib/supabase";

export type QuoteFormState = {
  success: boolean;
  message: string;
};

export async function submitQuoteRequest(
  _prevState: QuoteFormState,
  formData: FormData
): Promise<QuoteFormState> {
  const name = formData.get("name") as string;
  const company = formData.get("company") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const product = formData.get("product") as string;
  const quantity = formData.get("quantity") as string;
  const message = formData.get("message") as string;

  if (!name || !company || !email || !phone || !product) {
    return { success: false, message: "Please fill in all required fields." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, message: "Please enter a valid email address." };
  }

  try {
    const { error } = await supabase.from("quote_requests").insert({
      name,
      company,
      email,
      phone,
      product,
      quantity,
      message,
    });

    if (error) throw error;

    return {
      success: true,
      message:
        "Your quote request has been submitted successfully. We will get back to you within 24 hours.",
    };
  } catch (error) {
    console.error("Quote submission error:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again or contact us directly.",
    };
  }
}

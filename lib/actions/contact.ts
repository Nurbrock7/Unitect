"use server";

import { supabase } from "@/lib/supabase";

export type ContactFormState = {
  success: boolean;
  message: string;
};

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = formData.get("name") as string;
  const company = formData.get("company") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { success: false, message: "Please fill in all required fields." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, message: "Please enter a valid email address." };
  }

  try {
    const { error } = await supabase.from("quote_requests").insert({
      name,
      company: company || "N/A",
      email,
      phone: phone || "N/A",
      product: "General Enquiry",
      message,
    });

    if (error) throw error;

    return {
      success: true,
      message:
        "Your message has been sent successfully. We will respond within 24 hours.",
    };
  } catch (error) {
    console.error("Contact form error:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}

"use client";

import { useFormState } from "react-dom";
import { submitContactForm, type ContactFormState } from "@/lib/actions/contact";
import SubmitButton from "./SubmitButton";

const initialState: ContactFormState = { success: false, message: "" };

export default function ContactForm() {
  const [state, formAction] = useFormState(submitContactForm, initialState);

  if (state.success) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-8 text-center">
        <svg
          className="mx-auto mb-4 h-12 w-12 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="text-lg font-semibold text-green-800">Message Sent</h3>
        <p className="mt-2 text-sm text-green-700">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      {state.message && !state.success && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {state.message}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="label-text">
            Full Name *
          </label>
          <input
            type="text"
            id="contact-name"
            name="name"
            required
            className="input-field"
            placeholder="John Smith"
          />
        </div>
        <div>
          <label htmlFor="contact-company" className="label-text">
            Company
          </label>
          <input
            type="text"
            id="contact-company"
            name="company"
            className="input-field"
            placeholder="Your company name"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-email" className="label-text">
            Email *
          </label>
          <input
            type="email"
            id="contact-email"
            name="email"
            required
            className="input-field"
            placeholder="john@company.co.za"
          />
        </div>
        <div>
          <label htmlFor="contact-phone" className="label-text">
            Phone
          </label>
          <input
            type="tel"
            id="contact-phone"
            name="phone"
            className="input-field"
            placeholder="+27 (0) 11 123 4567"
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className="label-text">
          Message *
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          className="input-field resize-none"
          placeholder="How can we help you?"
        />
      </div>

      <SubmitButton label="Send Message" pendingLabel="Sending..." />
    </form>
  );
}

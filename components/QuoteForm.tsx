"use client";

import { useFormState } from "react-dom";
import { submitQuoteRequest, type QuoteFormState } from "@/lib/actions/quote";
import SubmitButton from "./SubmitButton";

const initialState: QuoteFormState = { success: false, message: "" };

export default function QuoteForm({
  preselectedProduct,
}: {
  preselectedProduct?: string;
}) {
  const [state, formAction] = useFormState(submitQuoteRequest, initialState);

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
        <h3 className="text-lg font-semibold text-green-800">
          Quote Request Submitted
        </h3>
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
          <label htmlFor="name" className="label-text">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="input-field"
            placeholder="John Smith"
          />
        </div>
        <div>
          <label htmlFor="company" className="label-text">
            Company *
          </label>
          <input
            type="text"
            id="company"
            name="company"
            required
            className="input-field"
            placeholder="Your company name"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="label-text">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="input-field"
            placeholder="john@company.co.za"
          />
        </div>
        <div>
          <label htmlFor="phone" className="label-text">
            Phone *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            className="input-field"
            placeholder="+27 (0) 11 123 4567"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="product" className="label-text">
            Product / Category *
          </label>
          <input
            type="text"
            id="product"
            name="product"
            required
            defaultValue={preselectedProduct || ""}
            className="input-field"
            placeholder="e.g. Cable Ties, Heat Shrink"
          />
        </div>
        <div>
          <label htmlFor="quantity" className="label-text">
            Quantity
          </label>
          <input
            type="text"
            id="quantity"
            name="quantity"
            className="input-field"
            placeholder="e.g. 1000 units"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="label-text">
          Additional Details
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="input-field resize-none"
          placeholder="Describe your requirements, specifications, or any questions..."
        />
      </div>

      <SubmitButton label="Submit Quote Request" pendingLabel="Submitting..." />

      <p className="text-center text-xs text-neutral-500">
        We typically respond within 24 hours on business days.
      </p>
    </form>
  );
}

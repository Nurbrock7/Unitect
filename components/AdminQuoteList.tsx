"use client";

import { updateQuoteStatus } from "@/lib/actions/admin";
import { useState } from "react";

type Quote = {
  _id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  product: string;
  quantity: string;
  message: string;
  status: string;
  createdAt: string;
};

const statusOptions = ["new", "contacted", "quoted", "closed"];

const statusColors: Record<string, string> = {
  new: "bg-green-100 text-green-700",
  contacted: "bg-blue-100 text-blue-700",
  quoted: "bg-amber-100 text-amber-700",
  closed: "bg-neutral-100 text-neutral-700",
};

export default function AdminQuoteList({ quotes }: { quotes: Quote[] }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);

  async function handleStatusChange(quoteId: string, newStatus: string) {
    setUpdating(quoteId);
    await updateQuoteStatus(quoteId, newStatus);
    setUpdating(null);
  }

  if (quotes.length === 0) {
    return (
      <div className="card py-12 text-center">
        <p className="text-neutral-400">No quote requests yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {quotes.map((quote) => (
        <div key={quote._id} className="card p-0 overflow-hidden">
          <button
            onClick={() =>
              setExpanded(expanded === quote._id ? null : quote._id)
            }
            className="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-neutral-50"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-3">
                <p className="font-medium text-neutral-900">{quote.name}</p>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusColors[quote.status] || statusColors.new}`}
                >
                  {quote.status}
                </span>
              </div>
              <p className="mt-0.5 text-xs text-neutral-500">
                {quote.company} &middot; {quote.product} &middot;{" "}
                {new Date(quote.createdAt).toLocaleDateString("en-ZA")}
              </p>
            </div>
            <svg
              className={`h-5 w-5 text-neutral-400 transition-transform ${
                expanded === quote._id ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {expanded === quote._id && (
            <div className="border-t border-neutral-100 bg-neutral-50 px-4 py-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-medium text-neutral-500">Email</p>
                  <p className="text-sm text-neutral-900">{quote.email}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-neutral-500">Phone</p>
                  <p className="text-sm text-neutral-900">{quote.phone}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-neutral-500">
                    Product
                  </p>
                  <p className="text-sm text-neutral-900">{quote.product}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-neutral-500">
                    Quantity
                  </p>
                  <p className="text-sm text-neutral-900">
                    {quote.quantity || "Not specified"}
                  </p>
                </div>
              </div>

              {quote.message && (
                <div className="mt-4">
                  <p className="text-xs font-medium text-neutral-500">
                    Message
                  </p>
                  <p className="mt-1 text-sm text-neutral-700 whitespace-pre-wrap">
                    {quote.message}
                  </p>
                </div>
              )}

              <div className="mt-4 flex items-center gap-2">
                <span className="text-xs font-medium text-neutral-500">
                  Update Status:
                </span>
                {statusOptions.map((status) => (
                  <button
                    key={status}
                    onClick={() => handleStatusChange(quote._id, status)}
                    disabled={
                      updating === quote._id || quote.status === status
                    }
                    className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                      quote.status === status
                        ? statusColors[status]
                        : "bg-neutral-200 text-neutral-600 hover:bg-neutral-300"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

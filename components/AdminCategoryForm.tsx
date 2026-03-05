"use client";

import { useFormState } from "react-dom";
import { createCategory, type AdminLoginState } from "@/lib/actions/admin";
import SubmitButton from "./SubmitButton";

const initialState: AdminLoginState = { success: false, message: "" };

export default function AdminCategoryForm() {
  const [state, formAction] = useFormState(createCategory, initialState);

  return (
    <form action={formAction} className="space-y-4">
      {state.message && (
        <div
          className={`rounded-lg p-3 text-sm ${
            state.success
              ? "border border-green-200 bg-green-50 text-green-700"
              : "border border-red-200 bg-red-50 text-red-700"
          }`}
        >
          {state.message}
        </div>
      )}

      <div>
        <label htmlFor="cat-name" className="label-text">
          Category Name *
        </label>
        <input
          type="text"
          id="cat-name"
          name="name"
          required
          className="input-field"
          placeholder="Cable Ties"
        />
      </div>

      <div>
        <label htmlFor="cat-slug" className="label-text">
          Slug *
        </label>
        <input
          type="text"
          id="cat-slug"
          name="slug"
          required
          className="input-field"
          placeholder="cable-ties"
        />
      </div>

      <div>
        <label htmlFor="cat-description" className="label-text">
          Description
        </label>
        <textarea
          id="cat-description"
          name="description"
          rows={2}
          className="input-field resize-none"
        />
      </div>

      <SubmitButton label="Add Category" pendingLabel="Adding..." />
    </form>
  );
}

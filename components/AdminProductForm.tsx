"use client";

import { useFormState } from "react-dom";
import { createProduct, type AdminLoginState } from "@/lib/actions/admin";
import SubmitButton from "./SubmitButton";

const initialState: AdminLoginState = { success: false, message: "" };

type Category = {
  _id: string;
  name: string;
};

export default function AdminProductForm({
  categories,
}: {
  categories: Category[];
}) {
  const [state, formAction] = useFormState(createProduct, initialState);

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
        <label htmlFor="name" className="label-text">
          Product Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="input-field"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="slug" className="label-text">
            Slug *
          </label>
          <input
            type="text"
            id="slug"
            name="slug"
            required
            className="input-field"
            placeholder="nylon-cable-tie-200mm"
          />
        </div>
        <div>
          <label htmlFor="sku" className="label-text">
            SKU *
          </label>
          <input
            type="text"
            id="sku"
            name="sku"
            required
            className="input-field"
            placeholder="CT-NYL-200"
          />
        </div>
      </div>

      <div>
        <label htmlFor="category" className="label-text">
          Category *
        </label>
        <select id="category" name="category" required className="input-field">
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="description" className="label-text">
          Description *
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={3}
          className="input-field resize-none"
        />
      </div>

      <div>
        <label htmlFor="specifications" className="label-text">
          Specifications (key: value per line)
        </label>
        <textarea
          id="specifications"
          name="specifications"
          rows={3}
          className="input-field resize-none font-mono text-xs"
          placeholder={"Material: Nylon 66\nLength: 200mm\nColour: Black"}
        />
      </div>

      <div>
        <label htmlFor="useCases" className="label-text">
          Use Cases (one per line)
        </label>
        <textarea
          id="useCases"
          name="useCases"
          rows={3}
          className="input-field resize-none text-xs"
          placeholder={"Panel wiring\nCable bundling\nOutdoor installations"}
        />
      </div>

      <div className="flex items-center gap-2">
        <input type="checkbox" id="isFeatured" name="isFeatured" />
        <label htmlFor="isFeatured" className="text-sm text-neutral-700">
          Featured product
        </label>
      </div>

      <SubmitButton label="Add Product" pendingLabel="Adding..." />
    </form>
  );
}

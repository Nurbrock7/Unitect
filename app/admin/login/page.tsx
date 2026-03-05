"use client";

import { useFormState } from "react-dom";
import { loginAdmin, type AdminLoginState } from "@/lib/actions/admin";
import SubmitButton from "@/components/SubmitButton";

const initialState: AdminLoginState = { success: false, message: "" };

export default function AdminLoginPage() {
  const [state, formAction] = useFormState(loginAdmin, initialState);

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-xl font-black text-white">
            C
          </div>
          <h1 className="mt-4 text-2xl font-bold text-neutral-900">
            Admin Login
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            CABMAN Dashboard Access
          </p>
        </div>

        <form action={formAction} className="mt-8 space-y-5">
          {state.message && !state.success && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {state.message}
            </div>
          )}

          <div>
            <label htmlFor="email" className="label-text">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="input-field"
              placeholder="admin@cabman.co.za"
            />
          </div>

          <div>
            <label htmlFor="password" className="label-text">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="input-field"
              placeholder="Enter your password"
            />
          </div>

          <SubmitButton label="Sign In" pendingLabel="Signing in..." />
        </form>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold">Checkout</h1>
      <p className="text-slate-600">
        Collect shipping, invoicing and payment details for B2B and B2C customers.
      </p>
      <form className="grid gap-4 rounded-xl border border-slate-200 bg-white p-6 md:grid-cols-2">
        <input className="rounded-md border border-slate-300 px-3 py-2" placeholder="Company / Full Name" />
        <input className="rounded-md border border-slate-300 px-3 py-2" placeholder="Email" type="email" />
        <input className="rounded-md border border-slate-300 px-3 py-2 md:col-span-2" placeholder="Address" />
        <button className="rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark md:col-span-2" type="submit">
          Place order
        </button>
      </form>
    </section>
  );
}

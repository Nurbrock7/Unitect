export default function CartPage() {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold">Cart</h1>
      <p className="text-slate-600">Your selected cable accessories will appear here.</p>
      <div className="rounded-xl border border-dashed border-slate-300 bg-white p-6">
        <p className="text-sm text-slate-500">Cart is empty. Start by adding products from categories.</p>
      </div>
    </section>
  );
}

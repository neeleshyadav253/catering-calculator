import React from "react";
import CartItem from "./CartItem";
import {
  ShoppingCart,
  ArrowRight,
  Users,
  Package,
  TrendingDown,
  DollarSign,
  Sparkles,
} from "lucide-react";

/* ======================================================
   CART PAGE
====================================================== */

const CartPage = ({
  cart,
  guestCount,
  parsedGuestCount,
  cartTotal, // subtotal (before discount)
  estimatedSavings,
  perPersonCost,
  handleGuestCountChange,
  handleGuestCountBlur,
  updateCartQuantity,
  removeFromCart,
  navigateTo,
}) => {
  const finalTotal = Math.max(cartTotal - estimatedSavings, 0);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const savingsPercentage =
    cartTotal > 0 ? ((estimatedSavings / cartTotal) * 100).toFixed(1) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-amber-50/40">
      <div className="px-4 py-8 mx-auto max-w-7xl sm:py-12 lg:px-8">
        {/* ================= HEADER ================= */}
        <div className="flex flex-col gap-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 shadow-md bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl">
              <ShoppingCart className="text-white" size={24} />
            </div>
            <h2 className="text-4xl font-bold text-gray-900">
              Cost Calculator
            </h2>
          </div>

          {/* Guest Count */}
          <div className="flex items-center gap-3">
            <Users size={16} className="text-orange-500" />
            <input
              type="text"
              inputMode="numeric"
              value={guestCount}
              onChange={handleGuestCountChange}
              onBlur={handleGuestCountBlur}
              placeholder="200"
              className="w-32 px-4 py-2 text-lg font-bold text-orange-700 bg-orange-100 border-2 border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <span className="text-sm text-gray-600">guests</span>
          </div>
        </div>

        {/* ================= SUMMARY ================= */}
        <div className="grid grid-cols-1 gap-5 mb-8 md:grid-cols-3">
          <SummaryCard
            title="Cart Total"
            icon={<DollarSign size={18} />}
            value={cartTotal}
            footer={`Before discounts • ${totalItems} items`}
          />

          <SummaryCard
            title="Total Savings"
            icon={<TrendingDown size={18} />}
            value={estimatedSavings}
            badge={`${savingsPercentage}% OFF`}
          />

          <SummaryCard
            title="Final Total"
            icon={<Sparkles size={18} />}
            value={finalTotal}
            footer={`$${perPersonCost.toFixed(2)} per person`}
            strong
          />
        </div>

        {/* ================= CART ITEMS ================= */}
        <div className="overflow-hidden bg-white shadow-xl rounded-3xl ring-1 ring-gray-200">
          <div className="p-4 border-b bg-orange-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Package size={20} className="text-orange-600" />
                <h3 className="text-lg font-semibold">Your Items</h3>
              </div>
              <span className="px-3 py-1 text-sm bg-white rounded-full shadow">
                {totalItems} items
              </span>
            </div>
          </div>

          <div className="divide-y">
            {cart.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                guestCount={parsedGuestCount}
                onUpdateQuantity={updateCartQuantity}
                onRemove={() => removeFromCart(item.id)}
              />
            ))}
          </div>
        </div>

        {/* ================= ACTIONS ================= */}
        <div className="flex flex-col gap-4 mt-8 sm:flex-row">
          <button
            onClick={() => navigateTo("products")}
            className="flex-1 px-8 py-4 font-semibold bg-white border-2 border-gray-300 shadow rounded-xl hover:bg-gray-50"
          >
            Continue Shopping
          </button>

          <button
            onClick={() => navigateTo("enquiry")}
            className="flex items-center justify-center flex-1 gap-2 px-8 py-4 font-semibold text-white shadow bg-gradient-to-r from-orange-600 to-amber-600 rounded-xl hover:shadow-lg"
          >
            Proceed to Enquiry
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

const SummaryCard = ({ title, icon, value, footer, badge, strong }) => (
  <div className="p-6 bg-white shadow-lg rounded-2xl">
    <div className="flex justify-between mb-2">
      <div className="flex items-center gap-2 text-sm font-semibold">
        {icon}
        {title}
      </div>
      {badge && (
        <span className="px-2 py-1 text-xs font-bold text-green-700 bg-green-200 rounded-full">
          {badge}
        </span>
      )}
    </div>

    <div
      className={`text-4xl font-bold ${
        strong ? "text-orange-600" : "text-gray-800"
      }`}
    >
      ${value.toFixed(2)}
    </div>

    {footer && <div className="mt-1 text-xs text-gray-600">{footer}</div>}
  </div>
);

export default CartPage;

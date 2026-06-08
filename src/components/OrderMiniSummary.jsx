import { orderItems, calculateTotal } from "../data";

function OrderMiniSummary() {
  const { total } = calculateTotal();
  const itemCount = orderItems.length;

  return (
    <aside className="order-mini-summary" aria-label="Order total">
      <span>
        {itemCount} {itemCount === 1 ? "item" : "items"}
      </span>
      <span className="order-mini-summary__total">
        Total: ${total.toFixed(2)}
      </span>
    </aside>
  );
}

export default OrderMiniSummary;

import { orderItems, calculateTotal } from "../data";

function CheckoutSummary({ nextStep }) {
  const { subtotal, tax, total } = calculateTotal(); //destructuring the calculateTotal function

  return (
    <section className="step-content step-enter" aria-labelledby="order-info-heading">
      <h2 id="order-info-heading">Review Order</h2>

      <div className="summary-box" role="region" aria-label="Order summary">
        <table className="order-table">
          <caption className="sr-only">Items in your order</caption>
          <tbody>
            {orderItems.map((item) => (
              <tr className="summary-item" key={item.id}>
                <th scope="row">{item.name}</th>
                <td>${item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <hr aria-hidden="true" />

        <dl className="order-totals">
          <div className="summary-item">
            <dt>Subtotal</dt>
            <dd>${subtotal.toFixed(2)}</dd>
          </div>
          <div className="summary-item">
            <dt>Tax</dt>
            <dd>${tax.toFixed(2)}</dd>
          </div>
          <div className="summary-item total">
            <dt>Total</dt>
            <dd>${total.toFixed(2)}</dd>
          </div>
        </dl>
      </div>

      <button type="button" onClick={nextStep}>
        Continue
      </button>
    </section>
  );
}

export default CheckoutSummary;

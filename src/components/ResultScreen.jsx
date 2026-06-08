function ResultScreen({ success, orderNumber, resetCheckout }) {
  return (
    <section
      className="center-content step-enter"
      role="status"
      aria-live="polite"
      aria-labelledby="result-heading"
    >
      {success ? (
        <>
          <div className="success-icon" aria-hidden="true">
            ✓
          </div>

          <h2 id="result-heading">Payment Successful</h2>

          <p>Thank you for your purchase.</p>

          {orderNumber && <p>Order #{orderNumber}</p>}
        </>
      ) : (
        <>
          <div className="error-icon" aria-hidden="true">
            ✕
          </div>

          <h2 id="result-heading">Payment Failed</h2>

          <p>Your card could not be processed.</p>

          <p>Please try again.</p>
        </>
      )}

      <button type="button" onClick={resetCheckout}>
        Continue Shopping
      </button>
    </section>
  );
}

export default ResultScreen;

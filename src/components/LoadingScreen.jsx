function LoadingScreen() {
  return (
    <div
      className="center-content step-enter"
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label="Processing payment"
    >
      <div className="spinner" aria-hidden="true" />

      <h2>Processing Payment</h2>

      <p>
        Please wait while we securely process your payment...
      </p>
    </div>
  );
}

export default LoadingScreen;

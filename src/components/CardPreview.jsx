function CardPreview({ formData }) {
  const cardNumber = formData.cardNumber || "#### #### #### ####";
  const cardHolder = formData.cardHolder || "YOUR NAME";
  const expiry = formData.expiry || "MM/YY";

  return (
    <div
      className="card-preview"
      aria-label="Card preview"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="chip" aria-hidden="true" />

      <div className="card-number" aria-hidden="true">
        {cardNumber}
      </div>

      <div className="card-bottom" aria-hidden="true">
        <div>
          <small>Card Holder</small>
          <p>{cardHolder}</p>
        </div>

        <div>
          <small>Expires</small>
          <p>{expiry}</p>
        </div>
      </div>

      <p className="sr-only">
        Card ending in {cardNumber.replace(/\D/g, "").slice(-4) || "not entered"},
        holder {cardHolder}, expires {expiry}
      </p>
    </div>
  );
}

export default CardPreview;

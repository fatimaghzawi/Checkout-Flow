import { useState } from "react";

import CardPreview from "./CardPreview";
import OrderMiniSummary from "./OrderMiniSummary";
import RequiredLabel from "./RequiredLabel";
import { focusFirstError } from "../utils/a11y";
import { isFieldValid, updateField } from "../utils/formHelpers";

const formatCardNumber = (value) => {
  const digits = value.replace(/\D/g, "");
  return digits.replace(/(.{4})/g, "$1 ").trim();
};

const formatExpiry = (value) => {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
};

function PaymentForm({ formData, setFormData, submitPayment, prevStep }) {
  const [errors, setErrors] = useState({});
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    const cardNumber = formData.cardNumber.replace(/\s/g, "");

    if (!formData.cardHolder.trim()) {
      newErrors.cardHolder = "Card holder name is required";
    }

    if (cardNumber.length !== 16) {
      newErrors.cardNumber = "Card number must be 16 digits";
    }

    if (!/^\d{2}\/\d{2}$/.test(formData.expiry)) {
      newErrors.expiry = "Use MM/YY format";
    }

    if (!/^\d{3}$/.test(formData.cvv)) {
      newErrors.cvv = "CVV must be 3 digits";
    }

    if (!agreedToTerms) {
      newErrors.terms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      focusFirstError(newErrors);
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      submitPayment();
    }
  };

  const handleChange = (field, value) => {
    updateField({
      field,
      value,
      errors,
      setErrors,
      setFormData,
      formData,
    });
  };

  const handleTermsChange = (checked) => {
    updateField({
      field: "terms",
      value: checked,
      errors,
      setErrors,
      onUpdate: setAgreedToTerms,
    });
  };

  const inputClass = (field, value) =>
    isFieldValid(field, value) ? "field-valid" : "";

  return (
    <section className="step-content step-enter" aria-labelledby="payment-heading">
      <OrderMiniSummary />

      <h2 id="payment-heading">Payment</h2>

      <form onSubmit={handleSubmit} noValidate>
        <div className="payment-box">
          <h3>Pay by card</h3>
          <p>
            Enter your card details below. Your payment is processed securely
            and your order will be confirmed once payment is complete.
          </p>

          <div className="payment-fields">
            <CardPreview formData={formData} />

            <RequiredLabel htmlFor="cardHolder">Card Holder Name</RequiredLabel>
            <input
              id="cardHolder"
              name="cardHolder"
              type="text"
              autoComplete="cc-name"
              placeholder="Name on card"
              value={formData.cardHolder}
              className={inputClass("cardHolder", formData.cardHolder)}
              aria-required="true"
              aria-invalid={!!errors.cardHolder}
              aria-describedby={errors.cardHolder ? "cardHolder-error" : undefined}
              onChange={(e) => handleChange("cardHolder", e.target.value)}
            />
            {errors.cardHolder && (
              <p id="cardHolder-error" className="error" role="alert">
                {errors.cardHolder}
              </p>
            )}

            <RequiredLabel htmlFor="cardNumber">Card Number</RequiredLabel>
            <input
              id="cardNumber"
              name="cardNumber"
              type="text"
              inputMode="numeric"
              autoComplete="cc-number"
              placeholder="1234 5678 9012 3456"
              maxLength="19"
              value={formData.cardNumber}
              className={inputClass("cardNumber", formData.cardNumber)}
              aria-required="true"
              aria-invalid={!!errors.cardNumber}
              aria-describedby={errors.cardNumber ? "cardNumber-error" : undefined}
              onChange={(e) =>
                handleChange("cardNumber", formatCardNumber(e.target.value))
              }
            />
            {errors.cardNumber && (
              <p id="cardNumber-error" className="error" role="alert">
                {errors.cardNumber}
              </p>
            )}

            <RequiredLabel htmlFor="expiry">Expiry Date</RequiredLabel>
            <input
              id="expiry"
              name="expiry"
              type="text"
              inputMode="numeric"
              autoComplete="cc-exp"
              placeholder="MM/YY"
              maxLength="5"
              value={formData.expiry}
              className={inputClass("expiry", formData.expiry)}
              aria-required="true"
              aria-invalid={!!errors.expiry}
              aria-describedby={errors.expiry ? "expiry-error" : "expiry-hint"}
              onChange={(e) =>
                handleChange("expiry", formatExpiry(e.target.value))
              }
            />
            <p id="expiry-hint" className="field-hint">
              Format: MM/YY (e.g. 12/26)
            </p>
            {errors.expiry && (
              <p id="expiry-error" className="error" role="alert">
                {errors.expiry}
              </p>
            )}

            <RequiredLabel htmlFor="cvv">CVV</RequiredLabel>
            <input
              id="cvv"
              name="cvv"
              type="password"
              inputMode="numeric"
              autoComplete="cc-csc"
              placeholder="123"
              maxLength="3"
              value={formData.cvv}
              className={inputClass("cvv", formData.cvv)}
              aria-required="true"
              aria-invalid={!!errors.cvv}
              aria-describedby={errors.cvv ? "cvv-error" : "cvv-hint"}
              onChange={(e) =>
                handleChange("cvv", e.target.value.replace(/\D/g, ""))
              }
            />
            <p id="cvv-hint" className="field-hint">
              3-digit code on the back of your card
            </p>
            {errors.cvv && (
              <p id="cvv-error" className="error" role="alert">
                {errors.cvv}
              </p>
            )}
          </div>
        </div>

        <p className="policy-text">
          Your personal data will be used to process your order, support your
          experience throughout this website, and for other purposes described
          in our{" "}
          <span className="text-link">privacy policy</span>.
        </p>

        <label className="terms-row" htmlFor="terms">
          <input
            type="checkbox"
            id="terms"
            name="terms"
            checked={agreedToTerms}
            aria-required="true"
            aria-invalid={!!errors.terms}
            aria-describedby={errors.terms ? "terms-error" : undefined}
            onChange={(e) => handleTermsChange(e.target.checked)}
          />
          <span className="terms-text">
            I have read and agree to the website{" "}
            <span className="text-link">terms and conditions</span>
            <span className="required-mark" aria-hidden="true">
              {" "}
              *
            </span>
            <span className="sr-only"> (required)</span>
          </span>
        </label>
        {errors.terms && (
          <p id="terms-error" className="error" role="alert">
            {errors.terms}
          </p>
        )}

        <div className="button-group">
          <button
            type="button"
            className="secondary-btn"
            onClick={prevStep}
            disabled={isSubmitting}
          >
            Back
          </button>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Processing..." : "Place Order"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default PaymentForm;

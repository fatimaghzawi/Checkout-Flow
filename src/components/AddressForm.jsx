import { useState } from "react";

import OrderMiniSummary from "./OrderMiniSummary";
import RequiredLabel from "./RequiredLabel";
import { focusFirstError } from "../utils/a11y";
import { isFieldValid, updateField } from "../utils/formHelpers";

function AddressForm({ formData, setFormData, nextStep, prevStep }) {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.country.trim()) {
      newErrors.country = "Country is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.street.trim()) {
      newErrors.street = "Street address is required";
    }

    if (!formData.postalCode.trim()) {
      newErrors.postalCode = "Postal code is required";
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
      nextStep();
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

  const inputClass = (field, value) =>
    isFieldValid(field, value) ? "field-valid" : "";

  return (
    <section className="step-content step-enter" aria-labelledby="shipping-heading">
      <OrderMiniSummary />

      <h2 id="shipping-heading">Shipping</h2>

      <form onSubmit={handleSubmit} noValidate>
        <div className="summary-box">
          <RequiredLabel htmlFor="country">Country</RequiredLabel>
          <input
            id="country"
            name="country"
            type="text"
            autoComplete="country-name"
            placeholder="Enter your country"
            value={formData.country}
            className={inputClass("country", formData.country)}
            aria-required="true"
            aria-invalid={!!errors.country}
            aria-describedby={errors.country ? "country-error" : undefined}
            onChange={(e) => handleChange("country", e.target.value)}
          />
          {errors.country && (
            <p id="country-error" className="error" role="alert">
              {errors.country}
            </p>
          )}

          <RequiredLabel htmlFor="city">City</RequiredLabel>
          <input
            id="city"
            name="city"
            type="text"
            autoComplete="address-level2"
            placeholder="Enter your city"
            value={formData.city}
            className={inputClass("city", formData.city)}
            aria-required="true"
            aria-invalid={!!errors.city}
            aria-describedby={errors.city ? "city-error" : undefined}
            onChange={(e) => handleChange("city", e.target.value)}
          />
          {errors.city && (
            <p id="city-error" className="error" role="alert">
              {errors.city}
            </p>
          )}

          <RequiredLabel htmlFor="street">Street Address</RequiredLabel>
          <input
            id="street"
            name="street"
            type="text"
            autoComplete="street-address"
            placeholder="Enter your street address"
            value={formData.street}
            className={inputClass("street", formData.street)}
            aria-required="true"
            aria-invalid={!!errors.street}
            aria-describedby={errors.street ? "street-error" : undefined}
            onChange={(e) => handleChange("street", e.target.value)}
          />
          {errors.street && (
            <p id="street-error" className="error" role="alert">
              {errors.street}
            </p>
          )}

          <RequiredLabel htmlFor="postalCode">Postal Code</RequiredLabel>
          <input
            id="postalCode"
            name="postalCode"
            type="text"
            inputMode="numeric"
            autoComplete="postal-code"
            placeholder="Enter postal code"
            value={formData.postalCode}
            className={inputClass("postalCode", formData.postalCode)}
            aria-required="true"
            aria-invalid={!!errors.postalCode}
            aria-describedby={errors.postalCode ? "postalCode-error" : undefined}
            onChange={(e) =>
              handleChange("postalCode", e.target.value.replace(/\D/g, ""))
            }
          />
          {errors.postalCode && (
            <p id="postalCode-error" className="error" role="alert">
              {errors.postalCode}
            </p>
          )}
        </div>

        <div className="button-group">
          <button type="button" className="secondary-btn" onClick={prevStep}>
            Back
          </button>
          <button type="submit">Continue</button>
        </div>
      </form>
    </section>
  );
}

export default AddressForm;

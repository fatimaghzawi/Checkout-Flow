import { useState } from "react";

import OrderMiniSummary from "./OrderMiniSummary";
import RequiredLabel from "./RequiredLabel";
import { focusFirstError } from "../utils/a11y";
import { isFieldValid, updateField } from "../utils/formHelpers";

const formatPhone = (value) => {
  let digits = value.replace(/\D/g, "");

  if (!digits.startsWith("961")) {
    digits = `961${digits.replace(/^961?/, "")}`;
  }

  digits = digits.slice(0, 11);

  if (digits.length <= 3) {
    return digits;
  }

  if (digits.length <= 5) {
    return `${digits.slice(0, 3)} ${digits.slice(3)}`;
  }

  return `${digits.slice(0, 3)} ${digits.slice(3, 5)} ${digits.slice(5)}`;
};

function PersonalInfo({ formData, setFormData, nextStep, prevStep }) {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!/^961 \d{2} \d{6}$/.test(formData.phone)) {
      newErrors.phone = "Phone must be in format 961 XX XXXXXX";
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
    <section className="step-content step-enter" aria-labelledby="details-heading">
      <OrderMiniSummary />

      <h2 id="details-heading">Your Details</h2>

      <form onSubmit={handleSubmit} noValidate>
        <div className="summary-box">
          <RequiredLabel htmlFor="fullName">Full Name</RequiredLabel>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            placeholder="Enter your full name"
            value={formData.fullName}
            className={inputClass("fullName", formData.fullName)}
            aria-required="true"
            aria-invalid={!!errors.fullName}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            onChange={(e) => handleChange("fullName", e.target.value)}
          />
          {errors.fullName && (
            <p id="fullName-error" className="error" role="alert">
              {errors.fullName}
            </p>
          )}

          <RequiredLabel htmlFor="email">Email</RequiredLabel>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Enter your email address"
            value={formData.email}
            className={inputClass("email", formData.email)}
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            onChange={(e) => handleChange("email", e.target.value)}
          />
          {errors.email && (
            <p id="email-error" className="error" role="alert">
              {errors.email}
            </p>
          )}

          <RequiredLabel htmlFor="phone">Phone</RequiredLabel>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="961 XX XXXXXX"
            value={formData.phone}
            className={inputClass("phone", formData.phone)}
            aria-required="true"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : "phone-hint"}
            onChange={(e) => handleChange("phone", formatPhone(e.target.value))}
          />
          <p id="phone-hint" className="field-hint">
            Format: 961 XX XXXXXX
          </p>
          {errors.phone && (
            <p id="phone-error" className="error" role="alert">
              {errors.phone}
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

export default PersonalInfo;

export const fieldValidators = {
  fullName: (value) => !!value.trim(),
  email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  phone: (value) => /^961 \d{2} \d{6}$/.test(value),
  country: (value) => !!value.trim(),
  city: (value) => !!value.trim(),
  street: (value) => !!value.trim(),
  postalCode: (value) => !!value.trim(),
  cardHolder: (value) => !!value.trim(),
  cardNumber: (value) => value.replace(/\s/g, "").length === 16,
  expiry: (value) => /^\d{2}\/\d{2}$/.test(value),
  cvv: (value) => /^\d{3}$/.test(value),
  terms: (value) => value === true,
};

export function isFieldValid(field, value) {
  return fieldValidators[field]?.(value) ?? false;
}

export function updateField({
  field,
  value,
  errors,
  setErrors,
  setFormData,
  formData,
  onUpdate,
}) {
  if (errors[field]) {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  if (onUpdate) {
    onUpdate(value);
  } else {
    setFormData({ ...formData, [field]: value });
  }
}

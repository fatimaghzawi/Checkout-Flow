export function focusFirstError(errors) {
  const firstField = Object.keys(errors)[0];

  if (firstField) {
    requestAnimationFrame(() => {
      document.getElementById(firstField)?.focus();
    });
  }
}

export const STEP_LABELS = {
  1: "Review Order",
  2: "Your Details",
  3: "Shipping",
  4: "Payment",
  5: "Order complete",
};

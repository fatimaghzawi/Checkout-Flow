# Checkout Flow

A multi-step e-commerce checkout experience built with React and Vite. Users review their cart, enter personal and shipping details, pay with a card, and see a confirmation screen — all in a single-page flow with client-side validation and accessibility built in.

## Features

### Four-step checkout

1. **Review Order** — View cart items, subtotal, tax (10%), and total before continuing.
2. **Your Details** — Collect name, email, and phone with required-field validation.
3. **Shipping** — Enter country, city, street address, and postal code.
4. **Payment** — Enter card details with live card preview, terms agreement, and validation.

After payment is submitted, a loading screen appears while the order is processed (simulated). The user then lands on a **success** or **failure** result screen with an order number on success.

### UX & accessibility

- **Progress bar** — Visual step indicator; completed steps can be clicked to go back.
- **Skip link** — Jump directly to main content for keyboard and screen-reader users.
- **Live announcements** — Step changes and payment status are announced via `aria-live` regions.
- **Focus management** — Focus moves to the first validation error and to main content on step change.
- **Semantic markup** — Tables, labels, landmarks, and ARIA attributes throughout the forms.

### Payment form

- Auto-formatting for card number (groups of 4) and expiry (MM/YY).
- Live **card preview** that updates as the user types.
- Mini order summary on the payment step.
- Mock submission — no real payment processor; success is simulated after ~2.5 seconds.

## Tech stack

- [React](https://react.dev/) 19
- [Vite](https://vite.dev/) 8


## Project structure

```
src/
├── App.jsx                 # Step state, form data, and checkout orchestration
├── data.js                 # Sample order items and total calculation
├── components/
│   ├── CheckoutSummary.jsx # Step 1: order review
│   ├── PersonalInfo.jsx    # Step 2: contact details
│   ├── AddressForm.jsx     # Step 3: shipping address
│   ├── PaymentForm.jsx     # Step 4: card entry and submit
│   ├── CardPreview.jsx     # Live card visual
│   ├── ProgressBar.jsx     # Step indicator
│   ├── LoadingScreen.jsx   # Payment processing state
│   ├── ResultScreen.jsx    # Success / failure outcome
│   ├── OrderMiniSummary.jsx
│   └── RequiredLabel.jsx
└── utils/
    ├── a11y.js             # Step labels and focus helpers
    └── formHelpers.js      # Shared field update and validation helpers
```

## Getting started

### Prerequisites

- Node.js 18+ recommended

### Install dependencies

```bash
npm install
```

### Run the dev server

```bash
npm run dev
```

Open the URL shown in the terminal (typically `http://localhost:5173`).

### Other scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run build`   | Production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint`    | Run ESLint               |



## Notes

This is a front-end demo. Form data is kept in React state only and is not sent to a backend. Payment processing is simulated for demonstration purposes.

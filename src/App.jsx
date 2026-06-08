import { useEffect, useRef, useState } from "react";

import ProgressBar from "./components/ProgressBar";
import CheckoutSummary from "./components/CheckoutSummary";
import PersonalInfo from "./components/PersonalInfo";
import AddressForm from "./components/AddressForm";
import PaymentForm from "./components/PaymentForm";
import LoadingScreen from "./components/LoadingScreen";
import ResultScreen from "./components/ResultScreen";
import { STEP_LABELS } from "./utils/a11y";

function App() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(null);
  const [orderNumber, setOrderNumber] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    street: "",
    postalCode: "",
    cardHolder: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const mainRef = useRef(null);
  const liveRef = useRef(null);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);
  const goToStep = (targetStep) => {
    if (targetStep >= 1 && targetStep < step) {
      setStep(targetStep);
    }
  };

  const submitPayment = () => {
    setLoading(true);
    setTimeout(() => {
      setOrderNumber(Math.floor(100000 + Math.random() * 900000));
      setPaymentSuccess(true);
      setLoading(false);
      setStep(5);
    }, 2500);
  };

  const resetCheckout = () => {
    setStep(1);
    setPaymentSuccess(null);
    setOrderNumber(null);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      country: "",
      city: "",
      street: "",
      postalCode: "",
      cardHolder: "",
      cardNumber: "",
      expiry: "",
      cvv: "",
    });
  };

  useEffect(() => {
    if (loading) {
      if (liveRef.current) {
        liveRef.current.textContent =
          "Processing payment, please wait.";
      }
      return;
    }

    if (liveRef.current) {
      liveRef.current.textContent =
        step === 5
          ? paymentSuccess
            ? "Payment successful. Your order has been placed."
            : "Payment failed. Please try again."
          : `Step ${step} of 4: ${STEP_LABELS[step]}`;
    }

    mainRef.current?.focus();
  }, [step, loading, paymentSuccess]);

  return (
    <div className="app">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <div className="container">
        <div
          ref={liveRef}
          className="sr-only"
          aria-live="polite"
          aria-atomic="true"
        />

        {!loading && step < 5 && (
          <>
            <header className="checkout-header">
              <h1>Checkout</h1>
            </header>

            <ProgressBar currentStep={step} onStepClick={goToStep} />
          </>
        )}

        <main
          id="main-content"
          ref={mainRef}
          tabIndex={-1}
          aria-busy={loading}
        >
          {loading && <LoadingScreen />}

          {!loading && step === 1 && (
            <CheckoutSummary nextStep={nextStep} />
          )}

          {!loading && step === 2 && (
            <PersonalInfo
              formData={formData}
              setFormData={setFormData}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}

          {!loading && step === 3 && (
            <AddressForm
              formData={formData}
              setFormData={setFormData}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}

          {!loading && step === 4 && (
            <PaymentForm
              formData={formData}
              setFormData={setFormData}
              submitPayment={submitPayment}
              prevStep={prevStep}
            />
          )}

          {!loading && step === 5 && (
            <ResultScreen
              success={paymentSuccess}
              orderNumber={orderNumber}
              resetCheckout={resetCheckout}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;

import { useState } from "react";
import '../../../scss/style.scss'

/* This component handles the steps of adding baby profile information and includes a stepmessage and a button component */

interface StepMessageProps {
  step: number;
  children: React.ReactNode;
}

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const messages = ["Ditt barn", "Allergier", "Preferenser"];

export default function ProfileSteps() {
  const [step, setStep] = useState(1);

  function handlePrevious() {
    if (step > 1) setStep((s) => s - 1);
  }

  function handleNext() {
    if (step < 3) {
      setStep((s) => s + 1);
    }
  }

  return (
    <div>
      <h2>ProfileSetup</h2>
      <section>
        <div className="column">
          <div className={step >= 1 ? "active" : ""}>Steg 1</div>
          <div className={step >= 2 ? "active" : ""}>Steg 2</div>
          <div className={step >= 3 ? "active" : ""}>Steg 3</div>
        </div>

        <StepMessage step={step}>{messages[step - 1]}</StepMessage>

        <div>
          <Button onClick={handlePrevious}>Föregående</Button>

          <Button onClick={handleNext}>Nästa</Button>
        </div>
      </section>
    </div>
  );
}

function StepMessage({ step, children }: StepMessageProps) {
  return (
    <div className="message">
      <h3>
        Steg {step} - {children}{" "}
      </h3>
    </div>
  );
}

function Button({ onClick, children }: ButtonProps) {
  return <button onClick={onClick}>{children}</button>;
}

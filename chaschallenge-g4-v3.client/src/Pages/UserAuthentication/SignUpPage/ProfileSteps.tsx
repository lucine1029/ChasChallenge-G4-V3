import "../../../scss/Components/_profilesteps.scss";
import { useState } from "react";
import AllergiesComp from "../../../ResusableComponents/AllergiesComp";
import ChildData from "../../../ResusableComponents/ChildData";

/* This component handles the steps of adding baby profile information and includes a stepmessage and a button component */

/*---------------- Typescript ----------------*/
interface StepMessageProps {
  step: number;
  message: string;
  FormComponent: React.ComponentType;
}

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const messages = ["Ditt barn", "Allergier", "Preferenser"];

// Step-specific components (temporary, these need to be imported)

function PreferencesComp(): React.ComponentType {
  return <div>Preference settings.</div>;
}

const FormComponents = [ChildData, AllergiesComp, PreferencesComp];

export default function SignUpSteps() {
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

        <StepMessage
          step={step}
          message={messages[step - 1]}
          FormComponent={FormComponents[step - 1]}
        />
        <div>
          <Button onClick={handlePrevious}>Föregående</Button>

          <Button onClick={handleNext}>Nästa</Button>
        </div>
      </section>
    </div>
  );
}

function StepMessage({ step, message, FormComponent }: StepMessageProps) {
  return (
    <div className="message">
      <h3>
        Steg {step} - {message}{" "}
      </h3>
      <FormComponent />
    </div>
  );
}

function Button({ onClick, children }: ButtonProps) {
  return <button onClick={onClick}>{children}</button>;
}

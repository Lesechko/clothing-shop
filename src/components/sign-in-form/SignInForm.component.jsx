import { useState } from "react";
import { FormInput } from "../form-input/FormInput.component";
import { Button } from "../button/Button.components";
import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firabase/firabase.utils";

import "../sign-in-form/SignInForm.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

export const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const signInWithGoogle = () => {
    signInWithGooglePopup();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      console.log(user);
      resetFormFields();
    } catch (e) {
      switch (e.code) {
        case "auth/wrong-password":
          alert("Invalid password. Please try again");
          break;
        case "auth/user-not-found":
          alert("Invalid email. Please try again");
          break;
        default:
          console.log(e);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = (event) => {
    setFormFields(defaultFormFields);
  };

  return (
    <div className="sign-in-container">
      <h2>I already have an account</h2>
      <span>Sign In with your email and password</span>

      <form action="" onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          name="email"
          required
          onChange={handleChange}
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          name="password"
          required
          onChange={handleChange}
          value={password}
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            buttonType={"google"}
            onClick={signInWithGoogle}
          >
            Sign In with google
          </Button>
        </div>
      </form>
    </div>
  );
};

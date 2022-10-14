import { useState, useContext } from "react";
import { FormInput } from "../form-input/FormInput.component";
import { Button } from "../button/Button.components";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firabase/firabase.utils";
import { UserContext } from "../../context/UserContext";

import "../sign-up-form/SignUpForm.styles.scss";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  const {setCurrentUser} = useContext(UserContext)

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Password do not match");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      setCurrentUser(user)
      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (e) {
      if ((e.code = "auth/email-already-in-use")) {
        console.log(e);
        alert("Email already in use");
      }
      console.log("User creation error", e);
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
    <div className="sign-up-container">
      <h2>I do not have an account</h2>
      <span>Sign Up with your email and password</span>

      <form action="" onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          name="displayName"
          required
          onChange={handleChange}
          value={displayName}
        />

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

        <FormInput
          label="Password"
          type="password"
          name="confirmPassword"
          required
          onChange={handleChange}
          value={confirmPassword}
        />

        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

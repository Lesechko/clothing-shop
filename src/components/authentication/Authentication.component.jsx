import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firabase/firabase.utils";
import { SignUpForm } from "../sign-up-form/SignUpForm.component";
import { SignInForm } from "../sign-in-form/SignInForm.component";
import "./Authentication.styles.scss";

const Authentication = () => {
  return (
    <div className="authentication-container">
        <SignInForm />
        <SignUpForm />
    </div>
  );
};

export default Authentication;

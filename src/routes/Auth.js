import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaGithubAlt } from "react-icons/fa";
import { AiFillTwitterCircle, AiFillGoogleCircle } from "react-icons/ai";
import { authService, firebaseInstance } from "../fbase";
import AuthForm from "components/AuthForm";

const Auth = () => {
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    await authService.signInWithPopup(provider);
  };

  return (
    <div className="authContainer">
      <AiFillTwitterCircle
        color={"#7458ff"}
        size="65"
        style={{ marginBottom: 30 }}
      />
      <AuthForm />
      <div className="authBtns">
        <button onClick={onSocialClick} name="google" className="authBtn">
          Continue with Google{" "}
          <AiFillGoogleCircle className="googleIcon" size="15" />
        </button>
        <button onClick={onSocialClick} name="github" className="authBtn">
          Continue with Github <FaGithubAlt size="15" />
        </button>
      </div>
    </div>
  );
};

export default Auth;

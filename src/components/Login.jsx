import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, registerWithGoogle } from "../../firebase-auth";
import { useAuthState } from "react-firebase-hooks/auth";
import "../styles/Login.css";

function Login() {
  // const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/");
  }, [user, loading]);

  return (
    <div className="login">
      <div className="login__container">
        <div className="recaptcha">
          recaptcha
        </div>
        <button className="login__btn login__google" onClick={async () => {
          await registerWithGoogle();
        }}>
          Login with Google
        </button>
        <div className="recaptcha">
          *privacy policy
        </div>
      </div>
    </div>
  );
}

export default Login;
import { Button } from "flowbite-react";
import { FaGoogle } from "react-icons/fa";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { app } from "../firebase.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {
  signInSuccess,
  signInFailure,
  signInStart,
} from "../redux/user/userSlice.js";
import { toast } from "sonner"; 
import { useSelector } from "react-redux";

export default function OAuth({ setShowModal }) {
  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const auth = getAuth(app);

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    const toastID = toast.loading("Signing in with Google...");

    try {
      dispatch(signInStart());
      const result = await signInWithPopup(auth, provider);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(signInSuccess(data));
        toast.success("Signed in with Google successfully", { id: toastID });
        setShowModal(false);
      }
    } catch (error) {
      console.log(error);
      dispatch(signInFailure(error.message));
      if (error.code === "auth/popup-closed-by-user") {
        toast.error("Sign in was cancelled", { id: toastID });
      } else {
        toast.error(`Sign in failed: ${error.message}`, { id: toastID });
      }
    }
  };

  return (
    <Button
      type="button"
      className="w-full dark:border-slate-600"
      color="dark"
      onClick={handleGoogleClick}
      disabled={loading}
    >
      <FaGoogle className="w-4 h-4 mr-2" />
      Continue with Google
    </Button>
  );
}

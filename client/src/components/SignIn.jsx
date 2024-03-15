import {
  Button,
  Label,
  TextInput,
  FloatingLabel,
  Spinner,
} from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { HiAcademicCap } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { toast } from "sonner";
import OAuth from "./OAuth";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function SignIn({ setSignIn, setShowModal }) {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    let { id, value } = e.target;
    value = value.trim();

    if (id === "identifier") {
      if (value === "") {
        const { email, username, ...rest } = formData;
        setFormData({ ...rest });
      } else {
        id = value.includes("@") ? "email" : "username";
        setFormData({ ...formData, [id]: value });
      }
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ((!formData.email && !formData.username) || !formData.password) {
      return dispatch(signInFailure("All fields are required."));
      toast.error("All fields are required.");
    }

    dispatch(signInStart());

    const signInPromise = fetch("/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            dispatch(signInFailure(data.message));
            throw new Error(data.message);
          });
        }
        return res.json();
      })
      .then((data) => {
        dispatch(signInSuccess(data));
        setShowModal(false);
        return data;
      })
      .catch((error) => {
        dispatch(signInFailure(error.message));
        throw error;
      });

    toast.promise(signInPromise, {
      loading: "Signing in...",
      success: "Signed in successfully",
      error: (err) => `Sign in failed: ${err.message}`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center gap-1">
        <HiAcademicCap className="w-12 h-12 text-pink-500 dark:text-pink-300" />
      </div>
      <h3 className="mb-4 text-center text-xl font-medium text-gray-900 dark:text-white">
        Sign in to our platform
      </h3>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <div>
          <FloatingLabel
            id="identifier"
            required
            onChange={handleChange}
            variant="outlined"
            label="Username or Email"
            className="dark:bg-gray-700"
          />
        </div>
        <div className="relative">
          <FloatingLabel
            id="password"
            type={showPassword ? "text" : "password"}
            required
            onChange={handleChange}
            variant="outlined"
            label="Password"
            className="dark:bg-gray-700"
          />
          <Button
            type="button"
            onClick={handleShowPassword}
            className="absolute right-1.5 top-1.5 bg-transparent dark:bg-transparent w-10 border-0"
            color="none"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </Button>
        </div>
        <div className="w-full flex flex-col gap-3">
          <Button
            gradientMonochrome="pink"
            className="w-full"
            type="submit"
            disabled={loading}
          >
            Login to your account
          </Button>
          <span className="text-center dark:text-gray-200 text-xs my-[0.5] font-bold">
            Or
          </span>
          <OAuth setShowModal={setShowModal} />
        </div>
      </form>
      <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
        Not registered?&nbsp;
        <a
          onClick={() => {
            setSignIn(false);
          }}
          className="text-pink-500 hover:underline dark:text-pink-300 cursor-pointer"
        >
          Create account
        </a>
      </div>
    </div>
  );
}

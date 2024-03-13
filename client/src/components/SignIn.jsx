import {
  Button,
  Label,
  TextInput,
  FloatingLabel,
  Spinner,
} from "flowbite-react";
import { useRef, useState } from "react";
import { HiAcademicCap } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";

export default function SignIn({ setSignIn, setShowModal }) {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    }
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }
      if (res.ok) {
        dispatch(signInSuccess(data));
        setShowModal(false);
      }
    } catch (error) {
      dispatch(signInFailure("error.message"));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center gap-1">
        <HiAcademicCap className="w-12 h-12 text-pink-500 dark:text-pink-300" />
        <span className="self-center whitespace-nowrap text-2xl font-bold dark:text-white">
          RateMyUni
        </span>
      </div>
      <h3 className="mb-4 text-center text-xl font-medium text-gray-900 dark:text-white">
        Sign in to our platform
      </h3>
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
      <div>
        <FloatingLabel
          id="password"
          type="password"
          required
          onChange={handleChange}
          variant="outlined"
          label="Password"
          className="dark:bg-gray-700"
        />
      </div>
      <div className="w-full">
        <Button
          gradientMonochrome="pink"
          className="w-full"
          onClick={handleSubmit}
        >
          {loading ? (
            <>
              <Spinner size="sm" />
              <span className="pl-2">Loading...</span>
            </>
          ) : (
            "Login to your account"
          )}
        </Button>
      </div>
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

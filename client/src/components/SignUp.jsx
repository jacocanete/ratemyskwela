import { Button, Label, TextInput, FloatingLabel } from "flowbite-react";
import { useRef, useState } from "react";
import { HiAcademicCap } from "react-icons/hi";
import { useDispatch } from "react-redux";
import {
  signUpStart,
  signUpFailure,
  signUpSuccess,
} from "../redux/user/userSlice";

export default function SignUp({ setSignIn }) {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return dispatch(signUpFailure("All fields are required."));
    }
    try {
      dispatch(signUpStart());
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        bodyy: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signUpFailure(data.message));
      }
      if (res.ok) {
        dispatch(signUpSuccess(data));
        setShowModal(false);
      }
    } catch (error) {
      dispatch(signUpFailure(error.message));
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
        Sign up to our platform
      </h3>
      <form className="flex flex-col gap-4" onClick={handleSubmit}>
        <div>
          <FloatingLabel
            id="username"
            required
            onChange={handleChange}
            variant="outlined"
            label="Username"
            className="dark:bg-gray-700"
          />
        </div>
        <div>
          <FloatingLabel
            id="email"
            required
            onChange={handleChange}
            variant="outlined"
            label="Email"
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
          <Button gradientMonochrome="pink" className="w-full" type="submit">
            Create your account
          </Button>
        </div>
      </form>

      <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
        Already registered?&nbsp;
        <a
          onClick={() => {
            setSignIn(true);
          }}
          className="text-pink-500 hover:underline dark:text-pink-300 cursor-pointer"
        >
          Log in here
        </a>
      </div>
    </div>
  );
}

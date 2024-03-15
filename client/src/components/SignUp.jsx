import { Button, Label, TextInput, FloatingLabel } from "flowbite-react";
import { useRef, useState } from "react";
import { HiAcademicCap } from "react-icons/hi";
import { useDispatch } from "react-redux";
import {
  signUpStart,
  signUpFailure,
  signUpSuccess,
} from "../redux/user/userSlice";
import { toast } from "sonner";
import OAuth from "./OAuth";
import { useSelector } from "react-redux";

export default function SignUp({ setSignIn, setShowModal }) {
  const { loading } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      dispatch(signUpFailure("All fields are required."));
      toast.error("All fields are required.");
      return;
    }

    dispatch(signUpStart());

    const signUpPromise = fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            dispatch(signUpFailure(data.message));
            throw new Error(data.message);
          });
        }
        return res.json();
      })
      .then((data) => {
        dispatch(signUpSuccess(data));
        setShowModal(false);
        return data;
      })
      .catch((error) => {
        dispatch(signUpFailure(error.message));
        throw error;
      });

    toast.promise(signUpPromise, {
      loading: "Signing up...",
      success: "Signed up successfully",
      error: (err) => `Sign up failed: ${err.message}`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center gap-1">
        <HiAcademicCap className="w-12 h-12 text-pink-500 dark:text-pink-300" />
      </div>
      <h3 className="mb-4 text-center text-xl font-medium text-gray-900 dark:text-white">
        Sign up to our platform
      </h3>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
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
            type="email"
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
        <div className="w-full flex flex-col gap-3">
          <Button
            gradientMonochrome="pink"
            className="w-full"
            type="submit"
            disabled={loading}
          >
            Create your account
          </Button>
          <span className="text-center dark:text-gray-200 text-xs my-[0.5] font-bold">
            Or
          </span>
          <OAuth setShowModal={setShowModal} />
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
          Log in
        </a>
      </div>
    </div>
  );
}

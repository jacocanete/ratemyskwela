import { Button, Label, TextInput, FloatingLabel } from "flowbite-react";
import { useRef, useState } from "react";
import { HiAcademicCap } from "react-icons/hi";

export default function SignIn({ setSignIn }) {
  const [formData, setFormData] = useState({});

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
        />
      </div>
      <div className="w-full">
        <Button gradientMonochrome="pink" className="w-full">
          Log in to your account
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

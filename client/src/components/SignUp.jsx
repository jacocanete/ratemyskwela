import { Button, Label, TextInput, FloatingLabel } from "flowbite-react";
import { useRef, useState } from "react";
import { HiAcademicCap } from "react-icons/hi";

export default function SignUp({ setSignIn }) {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = () => {};

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
      <div>
        <FloatingLabel
          id="username"
          required
          onChange={handleChange}
          variant="outlined"
          label="Username"
        />
      </div>
      <div>
        <FloatingLabel
          id="email"
          required
          onChange={handleChange}
          variant="outlined"
          label="Email"
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
        <Button
          gradientMonochrome="pink"
          className="w-full"
          onClick={handleSubmit}
        >
          Create your account
        </Button>
      </div>
      <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
        Already registered?&nbsp;
        <a
          onClick={() => {
            setSignIn(true);
          }}
          className="text-pink-500 hover:underline dark:text-pink-300 cursor-pointer"
        >
          Sign in here
        </a>
      </div>
    </div>
  );
}

import { Button, Label, TextInput } from "flowbite-react";
import { useRef, useState } from "react";

export default function SignIn({ setSignIn }) {
  const [formData, setFormData] = useState({});

  const emailInputRef = useRef(null);

  console.log(formData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-medium text-gray-900 dark:text-white">
        Sign in to our platform
      </h3>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email" value="Your email" />
        </div>
        <TextInput
          id="email"
          placeholder="name@company.com"
          required
          ref={emailInputRef}
          onChange={handleChange}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password" value="Your password" />
        </div>
        <TextInput
          id="password"
          type="password"
          placeholder="************"
          required
          onChange={handleChange}
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
          className="text-pink-500 hover:underline dark:text-pink-300"
        >
          Create account
        </a>
      </div>
    </div>
  );
}

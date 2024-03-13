import { Button, Label, TextInput } from "flowbite-react";
import { useRef, useState } from "react";

export default function SignUp({ setSignIn }) {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  console.log(formData);

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-medium text-gray-900 dark:text-white">
        Sign up to our platform
      </h3>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="username" value="Your username" />
        </div>
        <TextInput
          id="username"
          placeholder="username"
          required
          onChange={handleChange}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email" value="Your email" />
        </div>
        <TextInput
          id="email"
          placeholder="name@company.com"
          required
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
          Create your account
        </Button>
      </div>
      <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
        Already registered?&nbsp;
        <a
          onClick={() => {
            setSignIn(true);
          }}
          className="text-pink-500 hover:underline dark:text-pink-300"
        >
          Sign in here
        </a>
      </div>
    </div>
  );
}

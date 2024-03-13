import { Link } from "react-router-dom";
import {
  Button,
  Label,
  TextInput,
  Checkbox,
  Modal,
  ModalHeader,
  Navbar,
} from "flowbite-react";
import { FaMoon } from "react-icons/fa";
import { useState, useRef } from "react";
import { HiAcademicCap } from "react-icons/hi";

export default function Header() {
  const [formData, setFormData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [signIn, setSignIn] = useState(true);

  const emailInputRef = useRef(null);

  const handleSignin = () => {
    setShowModal(true);
    setSignIn(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  return (
    <>
      <Navbar className="max-w-6xl mx-auto sm:px-0 py-5">
        <Navbar.Brand
          as={Link}
          href="https://flowbite-react.com"
          className="gap-1"
        >
          <HiAcademicCap className="w-10 h-10 text-pink-500 dark:text-pink-300" />
          <span className="self-center whitespace-nowrap text-xl font-bold dark:text-white">
            RateMyUni
          </span>
        </Navbar.Brand>
        <div className="flex gap-2 md:order-2">
          <Button className="w-12 h-10 hidden sm:inline" color="gray" pill>
            <FaMoon />
          </Button>
          <Button onClick={handleSignin} gradientMonochrome="pink">
            Sign In
          </Button>
        </div>
      </Navbar>

      <Modal
        show={showModal}
        size="md"
        onClose={() => {
          setShowModal(false);
        }}
        initialFocus={emailInputRef}
        popup
      >
        <Modal.Header />
        {signIn ? (
          <Modal.Body>
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
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  ref={emailInputRef}
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
                  onClick={() => setSignIn(false)}
                  className="text-pink-500 hover:underline dark:text-pink-300"
                >
                  Create account
                </a>
              </div>
            </div>
          </Modal.Body>
        ) : (
          <Modal.Body>
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Sign up to our platform
              </h3>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="username" value="Your username" />
                </div>
                <TextInput id="username" placeholder="username" required />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email" value="Your email" />
                </div>
                <TextInput id="email" placeholder="name@company.com" required />
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
                  onClick={() => setSignIn(true)}
                  className="text-pink-500 hover:underline dark:text-pink-300"
                >
                  Sign in here
                </a>
              </div>
            </div>
          </Modal.Body>
        )}
      </Modal>
    </>
  );
}

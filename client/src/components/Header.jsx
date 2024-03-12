import { Modal, ModalHeader, Navbar } from "flowbite-react";
import { Link } from "react-router-dom";
import { Button, Label, TextInput, Checkbox } from "flowbite-react";
import { FaMoon } from "react-icons/fa";
import { useState, useRef } from "react";

export default function Header() {
  const [showModal, setShowModal] = useState(false);

  const emailInputRef = useRef(null);

  const handleSignin = () => {
    setShowModal(true);
  };

  const email = "";

  return (
    <>
      <Navbar className="max-w-6xl mx-auto sm:px-0 py-5">
        <Navbar.Brand as={Link} href="https://flowbite-react.com">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            RateMyUni
          </span>
        </Navbar.Brand>
        <div className="flex gap-2 md:order-2">
          <Button className="w-12 h-10 hidden sm:inline" color="gray" pill>
            <FaMoon />
          </Button>
          <Button onClick={handleSignin}>Sign-In</Button>
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
              <TextInput id="password" type="password" required />
            </div>
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">Remember me</Label>
              </div>
              <a
                href="#"
                className="text-sm text-cyan-700 hover:underline dark:text-cyan-500"
              >
                Lost Password?
              </a>
            </div>
            <div className="w-full">
              <Button>Log in to your account</Button>
            </div>
            <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
              Not registered?&nbsp;
              <a
                href="#"
                className="text-cyan-700 hover:underline dark:text-cyan-500"
              >
                Create account
              </a>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

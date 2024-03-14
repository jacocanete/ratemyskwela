import { Link } from "react-router-dom";
import {
  Button,
  Modal,
  ModalHeader,
  Navbar,
  Dropdown,
  DropdownDivider,
  Avatar,
} from "flowbite-react";
import { FaMoon, FaSun, FaRegUserCircle } from "react-icons/fa";
import { useState, useRef } from "react";
import { HiAcademicCap } from "react-icons/hi";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [signIn, setSignIn] = useState(true);

  const handleSignin = () => {
    setShowModal(true);
    setSignIn(true);
  };

  return (
    <>
      <Navbar className="max-w-6xl mx-auto sm:px-0 py-5 dark:bg-slate-900">
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
          <Button
            onClick={() => dispatch(toggleTheme())}
            className="w-12 h-10 hidden sm:inline"
            color="gray"
            pill
          >
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </Button>
          {currentUser ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  placeholderInitials={currentUser.username
                    .charAt(0)
                    .toUpperCase()}
                  rounded
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">@{currentUser.username}</span>
                <span className="block text-xs font-medium truncate">
                  {currentUser.email}
                </span>
              </Dropdown.Header>
              <Dropdown.Item>Profile</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>Sign out</Dropdown.Item>
            </Dropdown>
          ) : (
            <Button onClick={handleSignin} gradientMonochrome="pink">
              Sign In
            </Button>
          )}
        </div>
      </Navbar>

      <Modal
        show={showModal}
        size="md"
        onClose={() => {
          setShowModal(false);
        }}
        popup
        className={theme}
      >
        <Modal.Header />
        {signIn ? (
          <Modal.Body>
            <SignIn setSignIn={setSignIn} setShowModal={setShowModal} />
          </Modal.Body>
        ) : (
          <Modal.Body>
            <SignUp setSignIn={setSignIn} />
          </Modal.Body>
        )}
      </Modal>
    </>
  );
}

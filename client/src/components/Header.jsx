import { Link, useNavigate } from "react-router-dom";
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
import { useState } from "react";
import { HiAcademicCap } from "react-icons/hi";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import {
  signOutStart,
  signOutFailure,
  signOutSuccess,
} from "../redux/user/userSlice";
import { toast } from "sonner";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [signIn, setSignIn] = useState(true);

  const handleSignout = () => {
    dispatch(signOutStart());

    const signOutPromise = fetch("/api/user/signout", {
      method: "POST",
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            dispatch(signOutFailure(data.message));
            throw new Error(data.message);
          });
        }
        return res.json();
      })
      .then((data) => {
        dispatch(signOutSuccess());
        return data;
      })
      .catch((error) => {
        dispatch(signOutFailure(error.message));
        throw error;
      });

    toast.promise(signOutPromise, {
      loading: "Signing out...",
      success: "Signed out successfully",
      error: (err) => `Sign out failed: ${err.message}`,
    });
  };

  const handleSignin = () => {
    setShowModal(true);
    setSignIn(true);
  };

  return (
    <>
      <Navbar className="max-w-6xl mx-auto sm:px-0 py-5 dark:bg-slate-900 transition duration-300 ease-in-out">
        <Navbar.Brand as={Link} to="/" className="gap-1">
          <HiAcademicCap className="w-10 h-10 text-pink-500 dark:text-pink-300" />
          <span className="self-center whitespace-nowrap text-xl font-bold dark:text-white">
            RateMySkwela
          </span>
        </Navbar.Brand>
        <div className="flex gap-2 md:order-2">
          <Button
            onClick={() => dispatch(toggleTheme())}
            className="hidden sm:inline ring-pink-300 focus:bg-pink-100 dark:ring-slate-600 dark:focus:bg-slate-800"
            color=""
            size="sm"
          >
            {theme === "light" ? (
              <FaMoon className="w-4 h-4" />
            ) : (
              <FaSun className="w-4 h-4" />
            )}
          </Button>
          {currentUser ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar placeholderInitials={currentUser.initials} rounded />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">@{currentUser.username}</span>
                <span className="block text-xs font-medium truncate">
                  {currentUser.email}
                </span>
              </Dropdown.Header>
              <Dropdown.Item as={Link} to="/dashboard">
                Profile
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
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
            <SignUp setSignIn={setSignIn} setShowModal={setShowModal} />
          </Modal.Body>
        )}
      </Modal>
    </>
  );
}

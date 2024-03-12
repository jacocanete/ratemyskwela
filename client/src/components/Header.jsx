import { Navbar } from "flowbite-react";
import { Link } from "react-router-dom";
import { Button } from "flowbite-react";
import { FaMoon } from "react-icons/fa";

export default function Header() {
  return (
    <Navbar className="border-b-2">
      <Navbar.Brand as={Link} href="https://flowbite-react.com">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          RateMyUni
        </span>
      </Navbar.Brand>
      <div className="flex gap-2 md:order-2">
        <Button
          className="w-12 h-10 hidden sm:inline"
          color="gray"
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          <FaMoon />
        </Button>
        <Button>Sign-In</Button>
      </div>
    </Navbar>
  );
}

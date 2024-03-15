import { useState } from "react";
import { Avatar, Button, Card, Dropdown, FloatingLabel } from "flowbite-react";
import { FaRegUserCircle, FaEyeSlash, FaEye } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Card className="max-w-full flex flex-col shadow-md">
      <div className="min-w-lg p-6">
        <Avatar
          placeholderInitials={currentUser.initials}
          rounded
          size="lg"
          className="mb-4"
        />
        <h5 className="mb-1 text-xl text-center font-medium text-gray-900 dark:text-white">
          @{currentUser.username}
        </h5>
        <div className="flex justify-center">
          <span className="text-sm text-center text-gray-500 dark:text-gray-400">
            {currentUser.email}
          </span>
        </div>
        <form className="flex flex-col gap-2 my-5 max-w-full">
          <div>
            <FloatingLabel
              id="username"
              required
              variant="outlined"
              label="Username"
              defaultValue={currentUser.username}
              className="dark:bg-gray-800"
            />
          </div>
          <div>
            <FloatingLabel
              id="email"
              required
              variant="outlined"
              label="Email"
              defaultValue={currentUser.email}
              className="dark:bg-gray-800"
            />
          </div>
          <div className="relative">
            <FloatingLabel
              id="password"
              type={showPassword ? "text" : "password"}
              required
              variant="outlined"
              label="Password"
              className="dark:bg-gray-800"
            />
            <Button
              type="button"
              onClick={handleShowPassword}
              className="absolute right-1.5 top-1.5 bg-transparent dark:bg-transparent w-10 border-0"
              color="none"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </Button>
          </div>
          <div className="justify-between flex space-x-3">
            <Button color="green" className="flex-grow">
              Update Account
            </Button>
            <Button color="red" className="flex-grow">
              Delete Account
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
}

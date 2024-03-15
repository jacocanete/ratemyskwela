import { useState } from "react";
import { Avatar, Button, Card, Dropdown, FloatingLabel } from "flowbite-react";
import { FaRegUserCircle, FaEyeSlash, FaEye } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import {
  updateFailure,
  updateStart,
  updateSuccess,
} from "../redux/user/userSlice";

export default function DashProfile() {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  console.log(formData);
  console.log(currentUser);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastID = toast.loading("Updating account...");

    if (Object.keys(formData).length === 0) {
      toast.error("No changes detected!", { id: toastID });
      return;
    }

    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        toast.error(`${data.message}`, { id: toastID });
      } else {
        dispatch(updateSuccess(data));
        toast.success("Account updated successfully", { id: toastID });
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      toast.error(`${error.message}`, { id: toastID });
    }
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
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 my-5 max-w-full"
        >
          <div>
            <FloatingLabel
              id="username"
              variant="outlined"
              label="Username"
              defaultValue={currentUser.username}
              className="dark:bg-gray-800"
              onChange={handleChange}
            />
          </div>
          <div>
            <FloatingLabel
              id="email"
              variant="outlined"
              label="Email"
              defaultValue={currentUser.email}
              className="dark:bg-gray-800"
              onChange={handleChange}
            />
          </div>
          <div className="relative">
            <FloatingLabel
              id="password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              label="Password"
              className="dark:bg-gray-800"
              onChange={handleChange}
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
            <Button type="submit" color="green" className="flex-grow">
              Update Account
            </Button>
            <Button type="button" color="red" className="flex-grow">
              Delete Account
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
}

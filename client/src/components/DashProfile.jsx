import { useState } from "react";
import {
  Avatar,
  Button,
  Card,
  Dropdown,
  FloatingLabel,
  Modal,
} from "flowbite-react";
import { FaRegUserCircle, FaEyeSlash, FaEye } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import {
  updateFailure,
  updateStart,
  updateSuccess,
  deleteFailure,
  deleteStart,
  deleteSuccess,
} from "../redux/user/userSlice";
import { set } from "mongoose";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export default function DashProfile() {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [showPassword, setShowPassword] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

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
        setFormData({});
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      toast.error(`${error.message}`, { id: toastID });
    }
  };

  const handleDeleteAccount = () => {
    setDeleteModal(true);
  };

  const deleteConfirm = async () => {
    dispatch(deleteStart());
    const toastID = toast.loading("Deleting account...");
    try {
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteFailure(data.message));
        toast.error(`${data.message}`, { id: toastID });
      } else {
        dispatch(deleteSuccess());
        toast.success("Account deleted successfully", { id: toastID });
        navigate("/");
      }
    } catch (error) {
      dispatch(deleteFailure(error.message));
      toast.error(`${error.message}`, { id: toastID });
    }
  };

  const deleteCancel = () => {
    setDeleteModal(false);
  };

  return (
    <>
      <Card className="max-w-full flex flex-col shadow-md border-0 transition duration-300 ease-in-out ">
        <div className="p-6">
          <h2 className="text-2xl text-center font-medium mb-5">
            Edit Account
          </h2>
          <Avatar
            placeholderInitials={currentUser.initials}
            rounded
            size="lg"
            className="mb-4"
          />
          <h3 className="mb-1 text-xl text-center font-medium text-gray-900 dark:text-white">
            @{currentUser.username}
          </h3>
          <div className="flex justify-center">
            <span className="text-sm text-center text-gray-500 dark:text-gray-400">
              {currentUser.email}
            </span>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2 my-5 max-w-xl mx-auto"
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
              <Button
                type="submit"
                color="green"
                className="flex-grow"
                disabled={loading}
              >
                Update Account
              </Button>
              <Button
                type="button"
                color="red"
                className="flex-grow"
                disabled={loading}
                onClick={handleDeleteAccount}
              >
                Delete Account
              </Button>
            </div>
          </form>
        </div>
      </Card>
      <Modal show={deleteModal} size="md" popup>
        <Modal.Body className="mt-10 mb-6">
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this account?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={deleteConfirm}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={deleteCancel}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

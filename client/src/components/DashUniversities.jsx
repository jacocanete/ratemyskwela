import React, { useEffect, useState } from "react";
import {
  Card,
  Avatar,
  FloatingLabel,
  Button,
  TextInput,
  Label,
  FileInput,
  Textarea,
  Select,
} from "flowbite-react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useSelector } from "react-redux";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { toast } from "sonner";
import { app } from "../firebase";
import { set } from "mongoose";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useNavigate } from "react-router-dom";

export default function DashUniversities() {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  console.log(formData);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image")) {
        toast.error("File must be an image.");
        return;
      }
    }
    setImageFile(file);
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    const toastID = toast.loading("Uploading image...");
    const storage = getStorage(app);
    const fileName = `${imageFile.name}`;
    const storageRef = ref(storage, `university-logos/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        toast.loading(`Uploading ${progress.toFixed(2)}%`, { id: toastID });
      },
      (error) => {
        toast.error("Failed to upload image.", { id: toastID });
        setImageFile(null);
        setImageURL(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageURL(downloadURL);
          setFormData({ ...formData, logo: downloadURL });
          toast.success("Image uploaded.", { id: toastID });
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastID = toast.loading("Adding university...");
    setLoading(true);
    try {
      const res = await fetch("/api/university/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message, { id: toastID });
        setLoading(false);
        return;
      }
      if (res.ok) {
        toast.success(`${formData.title} added.`, { id: toastID });
        navigate("/dashboard");
        setLoading(false);
        setFormData({});
        setImageFile(null);
        setImageURL(null);
        window.location.reload();
      }
    } catch (error) {
      toast.error(error.message, { id: toastID });
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-full flex flex-col shadow-md">
      <div className="p-6">
        <h2 className="text-2xl text-center font-medium mb-5">
          Add University
        </h2>
        <form
          className="flex flex-col gap-2 my-5 max-w-xl mx-auto"
          onSubmit={handleSubmit}
        >
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="title"
                className="text-gray-700 dark:text-gray-300"
                value="School Name"
              />
            </div>
            <TextInput
              type="text"
              id="title"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="description"
                className="text-gray-700 dark:text-gray-300"
                value="Description"
              />
            </div>
            <Textarea
              id="description"
              rows={4}
              className="min-h-24"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="file-upload"
                value="Upload Logo"
                className="text-gray-700 dark:text-gray-300"
                required
              />
            </div>
            <FileInput
              id="file-upload"
              required
              helperText="PNG or JPG (Max 2MB)."
              onChange={handleImageChange}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="website"
                className="text-gray-700 dark:text-gray-300"
                value="Website URL"
              />
            </div>
            <TextInput
              type="url"
              id="website"
              required
              onChange={handleChange}
            />
          </div>
          <div className="max-w-full">
            <div className="mb-2 block">
              <Label htmlFor="location" value="City" />
            </div>
            <Select id="location" required onChange={handleChange}>
              <option value="">Select a location</option>
              <option value="Cebu">Cebu</option>
              <option value="Manila">Manila</option>
              <option value="Davao">Davao</option>
            </Select>
          </div>
          <Button
            type="submit"
            className="w-full mt-1"
            color="green"
            disabled={loading}
          >
            Submit
          </Button>
        </form>
      </div>
    </Card>
  );
}

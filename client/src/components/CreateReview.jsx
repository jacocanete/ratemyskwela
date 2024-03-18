import {
  FaLongArrowAltLeft,
  FaBook,
  FaShieldAlt,
  FaStar,
} from "react-icons/fa";
import { IoCreateOutline, IoPeopleCircle } from "react-icons/io5";
import { PiBuildingsFill } from "react-icons/pi";
import { Modal, Button, Progress, ModalHeader } from "flowbite-react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Textarea } from "flowbite-react";
import { toast } from "sonner";
import { set } from "mongoose";

export default function CreateReview({ showModal, setShowModal, university }) {
  const { theme } = useSelector((state) => state.theme);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    education: 1,
    facility: 1,
    social: 1,
    admin: 1,
    content: "",
    universityId: university,
  });
  const [education, setEducation] = useState(1);
  const [facility, setFacility] = useState(1);
  const [social, setSocial] = useState(1);
  const [admin, setAdmin] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleBack = () => {
    if (step === 1) {
      setShowModal(false);
    } else {
      setStep((prevStep) => Math.max(prevStep - 1, 1));
    }
  };

  const handleNext = () => {
    setStep((prevStep) => Math.min(prevStep + 1, 5));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading("Submitting review...");
    if (formData.content.length < 20) {
      toast.error("Review must be at least 20 characters.", { id: toastId });
      setLoading(false);
      return;
    }

    if (formData.content.length > 500) {
      toast.error("Review must be at most 500 characters.", { id: toastId });
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/review/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error("Error occured, please try again.", { id: toastId });
        setLoading(false);
        return;
      }
      if (res.ok) {
        toast.success("Review submitted successfully.", { id: toastId });
        setLoading(false);
        setShowModal(false);
        window.location.reload();
      }
    } catch (error) {
      toast.error(error.message, { id: toastId });
      setLoading(false);
    }
  };

  return (
    <Modal show={showModal} className={theme}>
      <Modal.Body className="p-8">
        <div className="space-y-6">
          <h1 className="text-xl font-bold tracking-tight text-gray-700 dark:text-white">
            Tell us about your university by answering a few questions
          </h1>
          <Progress
            color="pink"
            progress={(step / 5) * 100}
            className="dark:bg-gray-600"
          />

          {/* Education */}
          {step === 1 && (
            <div className="py-4">
              <div className="flex flex-col">
                <span className="font-semibold text-sm flex flex-row items-baseline gap-1 text-gray-700 dark:text-gray-400 mt-1">
                  <FaBook className="h-3 w-3" />
                  <span>Education</span>
                </span>
                <p className="text-md text-gray-700 dark:text-white">
                  Please rate the overall quality of education provided by the
                  university, and how would you assess the relevance and
                  comprehensiveness of the curriculum?
                </p>
              </div>
              <div className="flex text-white justify-evenly mt-8">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    className={`flex border border-pink-500 w-10 h-10 cursor-pointer items-center justify-center rounded-md ${
                      star <= education
                        ? "bg-pink-500"
                        : "text-gray-700 dark:text-white"
                    }`}
                    onClick={() => {
                      setEducation(star);
                      setFormData({ ...formData, education: star });
                    }}
                  >
                    <FaStar />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Facility */}
          {step === 2 && (
            <div className="py-4">
              <div className="flex flex-col">
                <span className="font-semibold text-sm flex flex-row items-center gap-1 text-gray-700 dark:text-gray-400 mt-1">
                  <PiBuildingsFill className="h-4 w-4" />
                  <span>Facility</span>
                </span>
                <p className="text-md text-gray-700 dark:text-white">
                  On a scale of 1 to 5, how satisfied are you with the quality
                  and accessibility of the university's facilities, and were
                  they well-maintained for your academic and extracurricular
                  needs?
                </p>
              </div>
              <div className="flex text-white justify-evenly mt-8">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    className={`flex border border-pink-500 w-10 h-10 cursor-pointer items-center justify-center rounded-md ${
                      star <= facility
                        ? "bg-pink-500"
                        : "text-gray-700 dark:text-white"
                    }`}
                    onClick={() => {
                      setFacility(star);
                      setFormData({ ...formData, facility: star });
                    }}
                  >
                    <FaStar />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Social */}
          {step === 3 && (
            <div className="py-4">
              <div className="flex flex-col">
                <span className="font-semibold text-sm flex flex-row items-center gap-1 text-gray-700 dark:text-gray-400 mt-1">
                  <IoPeopleCircle className="h-5 w-5" />
                  <span>Social</span>
                </span>
                <p className="text-md text-gray-700 dark:text-white">
                  To what extent did you feel a sense of community and belonging
                  within the university, and how satisfied were you with the
                  social opportunities and extracurricular activities available
                  on campus?
                </p>
              </div>
              <div className="flex text-white justify-evenly mt-8">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    className={`flex border border-pink-500 w-10 h-10 cursor-pointer items-center justify-center rounded-md ${
                      star <= social
                        ? "bg-pink-500"
                        : "text-gray-700 dark:text-white"
                    }`}
                    onClick={() => {
                      setSocial(star);
                      setFormData({ ...formData, social: star });
                    }}
                  >
                    <FaStar />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Admin */}
          {step === 4 && (
            <div className="py-4">
              <div className="flex flex-col">
                <span className="font-semibold text-sm flex flex-row items-center gap-1 text-gray-700 dark:text-gray-400 mt-1">
                  <FaShieldAlt className="h-4 w-4" />
                  <span>Admin</span>
                </span>
                <p className="text-md text-gray-700 dark:text-white">
                  How would you rate the efficiency and responsiveness of the
                  university's administrative services, and did you find the
                  processes easy to navigate?
                </p>
              </div>
              <div className="flex text-white justify-evenly mt-8">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    className={`flex border border-pink-500 w-10 h-10 cursor-pointer items-center justify-center rounded-md ${
                      star <= admin
                        ? "bg-pink-500"
                        : "text-gray-700 dark:text-white"
                    }`}
                    onClick={() => {
                      setAdmin(star);
                      setFormData({ ...formData, admin: star });
                    }}
                  >
                    <FaStar />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Comment */}
          {step === 5 && (
            <div className="py-4">
              <div className="flex flex-col">
                <p className="mb-2 font-bold text-md text-gray-700 dark:text-white">
                  Leave a review
                </p>
              </div>
              <Textarea
                id="content"
                type="text"
                className="min-h-24"
                rows={4}
                onChange={handleChange}
                required
                helperText={
                  <>
                    By submitting a review, you agree to our{" "}
                    <span
                      href="#"
                      className="text-pink-500 cursor-pointer hover:underline dark:text-pink-300"
                    >
                      Terms of Service
                    </span>
                    .
                  </>
                }
                required
              />
            </div>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer className="flex justify-between">
        <Button color="gray" onClick={handleBack}>
          {step === 1 ? "Cancel" : "Back"}
        </Button>
        {step === 5 ? (
          <Button
            gradientMonochrome="pink"
            onClick={handleSubmit}
            disabled={loading}
          >
            Submit
          </Button>
        ) : (
          <Button
            gradientMonochrome="pink"
            onClick={() => {
              handleNext();
            }}
          >
            Next
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

import React from "react";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

export default function SchoolInfo() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="max-w-6xl mx-auto mt-5 mb-5 min-h-screen">
      <Button color="dark" onClick={handleGoBack}>
        Go Back
      </Button>

      <h1>School Information</h1>
      <p>some shit here</p>
    </div>
  );
}

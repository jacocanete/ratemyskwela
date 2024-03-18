import { useState, useEffect } from "react";
import DashProfile from "../components/DashProfile.jsx";
import DashUniversities from "../components/DashUniversities.jsx";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="max-w-6xl mx-auto mt-5 mb-5 min-h-screen">
      <div className="grid grid-cols-1  gap-5">
        <DashProfile />
        {currentUser.isAdmin && <DashUniversities />}
      </div>
    </div>
  );
}

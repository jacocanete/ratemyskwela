import { useState, useEffect } from "react";
import DashProfile from "../components/DashProfile.jsx";
import DashUniversities from "../components/DashUniversities.jsx";

export default function Dashboard() {
  return (
    <div className="max-w-6xl mx-auto mt-5 mb-5 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <DashProfile />
        <DashUniversities />
      </div>
    </div>
  );
}

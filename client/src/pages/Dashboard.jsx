import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import DashProfile from "../components/DashProfile";
import DashUniversities from "../components/DashUniversities";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("profile");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tab = urlParams.get("tab");
    if (tab) {
      setTab(tab);
    }
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56"></div>
    </div>
  );
}

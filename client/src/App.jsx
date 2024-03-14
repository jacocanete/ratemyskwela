import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SchoolInfo from "./pages/SchoolInfo";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/school-info" element={<SchoolInfo />} /> {/* Add this route for the SchoolInfo component */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

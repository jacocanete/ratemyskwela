import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import UniPage from "./pages/UniPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { useSelector } from "react-redux";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  const { theme } = useSelector((state) => state.theme);
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/:uniSlug" element={<UniPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
      <Footer />
      <Toaster
        toastOptions={{
          className: "dark:bg-gray-700 dark:text-gray-200 dark:border-gray-700",
        }}
      />
    </BrowserRouter>
  );
}

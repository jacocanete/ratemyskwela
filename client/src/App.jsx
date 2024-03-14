import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from 'sonner'
import { useSelector } from "react-redux";

export default function App() {
  const { theme } = useSelector((state) => state.theme);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
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

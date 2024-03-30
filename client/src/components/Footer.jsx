import React from "react";
import { Footer } from "flowbite-react";
import { HiAcademicCap } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function FooterCom() {
  return (
    <div className="max-w-6xl mx-auto transition duration-300 ease-in-out ">
      <Footer container>
        <div className="w-full text-center">
          <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
            <div className="flex gap-1 justify-center">
              <HiAcademicCap className="w-10 h-10 text-pink-500 dark:text-pink-300" />
              <span className="self-center whitespace-nowrap text-xl font-bold dark:text-white hidden md:inline">
                RateMySkwela
              </span>
            </div>
            <Footer.LinkGroup className="justify-center">
              <Footer.Link as={Link} to="/about">
                About
              </Footer.Link>
              <Footer.Link as={Link} to="/privacy-policy">
                Privacy Policy
              </Footer.Link>
              <Footer.Link as={Link} to="/terms-of-service">
                Terms of Service
              </Footer.Link>
            </Footer.LinkGroup>
          </div>
          <Footer.Divider />
          <Footer.Copyright
            href="https://github.com/jacocanete/ratemyuni-app"
            by="RateMySkwela by Jaco x Ryu"
            year={2024}
          />
        </div>
      </Footer>
    </div>
  );
}

import React from "react";
import { Footer } from "flowbite-react";

export default function FooterCom() {
  return (
    <div className="max-w-6xl mx-auto">
      <Footer container className="flex-col md:flex-row">
        <Footer.Copyright
          href="#"
          by="RateMyUni™ by Jaco"
          year={2024}
          className="md:pb-0 pb-2 justify-center flex"
        />
        <Footer.LinkGroup className="justify-center">
          <Footer.Link href="#">About</Footer.Link>
          <Footer.Link href="#">Privacy Policy</Footer.Link>
          <Footer.Link href="#">Terms of Service</Footer.Link>
          <Footer.Link href="#">Contact</Footer.Link>
        </Footer.LinkGroup>
      </Footer>
    </div>
  );
}

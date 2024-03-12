import React from "react";
import { Footer } from "flowbite-react";

export default function FooterCom() {
  return (
    <div className="w-full max-w-7xl mx-auto">
      <Footer container>
        <Footer.Copyright href="#" by="RateMyUni™" year={2022} />
        <Footer.LinkGroup>
          <Footer.Link href="#">About</Footer.Link>
          <Footer.Link href="#">Privacy Policy</Footer.Link>
          <Footer.Link href="#">Licensing</Footer.Link>
          <Footer.Link href="#">Contact</Footer.Link>
        </Footer.LinkGroup>
      </Footer>
    </div>
  );
}

import React from "react";
import {Separator} from "../ui/separator";
import Link from "next/link";

function FooterSection() {
  return (
    <section className="flex flex-col gap-[1.9rem] w-full mt-[10.44rem]">
      <div className="flex flex-col md:flex-row gap-8 justify-between">
        <div>
          <img
            className="h-[1.7rem] w-[7rem]"
            src="/images/logo.png"
            alt="logo"
          />
        </div>
        <div className="text-lightBlue text-[1rem] font-serif">
          © 2024 Unfazed. All rights reserved.
        </div>
        <div className="flex gap-4">
          <Link href="/privacy-policy">
            <p className="text-lightBlue text-[1rem]">Privacy Policy</p>
          </Link>
          <Link href="/refund-policy">
            <p className="text-lightBlue text-[1rem]">Refund Policy</p>
          </Link>
          <Link href="/terms-and-conditions">
            <p className="text-lightBlue text-[1rem]">Terms & Conditions</p>
          </Link>
        </div>
      </div>
      <Separator />
      {/* <div className="pb-[2.56rem]">
        <p className="text-customGray">
          Startup Framework contains components and complex blocks which can
          easily be integrated into almost any design.
        </p>
      </div> */}
    </section>
  );
}

export default FooterSection;

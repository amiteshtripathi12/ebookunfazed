"use client";
import Link from "next/link";
import {useSearchParams} from "next/navigation";
import React from "react";

function RegisterSuccess() {
  const searchParams = useSearchParams();
  const pdfLink = searchParams.get("link") || "";

  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex items-center justify-end"
      style={{backgroundImage: "url('/images/event.jpg')"}}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Main container */}
      <div className="relative bg-white shadow-lg rounded-lg overflow-hidden max-w-xl w-full lg:max-w-xl mx-4">
        <div className="bg-green-500 text-white text-center py-3">
          <h2 className="text-xl font-bold">Payment Successful!</h2>
        </div>

        <div className="p-5">
          <h3 className="text-2xl font-bold text-center text-[#FF6600] mb-3">
            Thank You for Your Purchase!
          </h3>
          <p className="text-center text-gray-700 mb-5">
            <span className="font-semibold">Hosted by</span>
            <span className="text-blue-600 font-semibold"> Unfazed Team</span>
          </p>

          {/* <div className="bg-[#FF6600] text-white rounded-md text-center py-2 mb-3 shadow-md">
            <p className="font-bold">Your Payment is Confirmed</p>
            <p>Order Date: {new Date().toLocaleDateString()}</p>
          </div> */}

          {/* <div className="text-center mb-5">
            <a
              href="/path-to-download/invoice.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-[#FF6600] transition duration-200"
              download
            >
              Click here to download your invoice PDF
            </a>
          </div> */}

          <p className="text-gray-600 text-center mb-5">
            Your purchase was successful. You will receive an email with further
            details. Thanks!
          </p>

          <div className="bg-gray-50 border border-gray-300 p-4 rounded-md shadow-sm">
            <p className="text-gray-700 mb-2 font-semibold text-center">
              Functional Freeze eBook
            </p>
            <a
              href={pdfLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-[#FF6600] text-white p-2 rounded-md border border-[#FF6600] hover:bg-white hover:text-[#FF6600] transition duration-200 font-bold"
              download
            >
              Download PDF
            </a>
          </div>
        </div>

        <div className="text-center bg-gray-200 py-3 mt-3 text-sm">
          <Link
            href="/terms-and-conditions"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-[#FF6600] transition duration-200 mr-4"
          >
            Terms & Conditions
          </Link>
          <Link
            href="/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-[#FF6600] transition duration-200 mr-4"
          >
            Privacy Policy
          </Link>
          <Link
            href="/refund-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-[#FF6600] transition duration-200 mr-4"
          >
            Refund Policy
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterSuccess;

import React from "react";

function RefundPolicyPage() {
  return (
    <div className="bg-whitepx-4 md:px-16 pt-8 lg:px-16">
      <h1 className="text-4xl md:text-5xl font-castoro mb-6 text-gray-800">
        Refund Policy
      </h1>
      <p className="text-gray-600 mb-8">
        <span className="font-semibold">Effective Date:</span> 20th sep, 2024
      </p>
      <section className="my-8 border-b border-gray-200 pb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Refund Eligibility
        </h2>
        <p className="text-gray-700">
          At Unfazed, we are committed to ensuring your satisfaction with our
          services. If you are not completely satisfied with your purchase, we
          offer a refund according to the terms outlined in this policy.
        </p>
      </section>
      <section className="my-8 border-b border-gray-200 pb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Eligible Services
        </h2>
        <ul className="list-disc ml-6 text-gray-700 space-y-2">
          <li>Online Therapy Sessions</li>
          <li>Fashion Consultancy Services</li>
        </ul>
      </section>
      <section className="my-8 border-b border-gray-200 pb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Refund Request Deadline
        </h2>
        <p className="text-gray-700">
          To be eligible for a refund, you must submit a refund request at least
          24 hours before the booked session time.
        </p>
      </section>
      <section className="my-8 border-b border-gray-200 pb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Non-Eligibility
        </h2>
        <ul className="list-disc ml-6 text-gray-700 space-y-2">
          <li>Services that have already been provided.</li>
          <li>
            Services that have exceeded the applicable refund request period.
          </li>
        </ul>
      </section>
      <section className="my-8 border-b border-gray-200 pb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          How to Request a Refund
        </h2>
        <p className="text-gray-700">
          To request a refund, please contact our customer support team at{" "}
          <a
            href="mailto:contact@unfazed.co.in"
            className="text-blue-600 underline hover:text-blue-800"
          >
            contact@unfazed.co.in
          </a>{" "}
          or click on the following link:
        </p>
        <p className="mt-4 text-gray-700">Your request should include:</p>
        <ul className="list-disc ml-6 text-gray-700 space-y-2">
          <li>Your name and contact details</li>
          <li>Order or invoice number</li>
          <li>A detailed explanation of the reason for your refund request</li>
        </ul>
      </section>
      <section className="my-8 border-b border-gray-200 pb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Refund Process
        </h2>
        <p className="text-gray-700">
          Upon receiving your refund request, we will review the provided
          information. We may contact you for additional details if needed. Once
          your refund request is approved, we will process the refund within 30
          working days.
        </p>
      </section>
      <section className="my-8 border-b border-gray-200 pb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Refund Method
        </h2>
        <p className="text-gray-700">
          Refunds will be issued using the same payment method used for the
          original purchase. Please note that processing times for refunds may
          vary depending on your payment provider.
        </p>
      </section>
      <section className="my-8 border-b border-gray-200 pb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Contact Information
        </h2>
        <p className="text-gray-700">
          If you have any questions or concerns regarding our refund policy,
          please contact our customer support team at{" "}
          <a
            href="mailto:contact@unfazed.co.in"
            className="text-blue-600 underline hover:text-blue-800"
          >
            contact@unfazed.co.in
          </a>{" "}
          or call us at 6392-975097.
        </p>
      </section>
      <section className="my-8 border-b border-gray-200 pb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Policy Changes
        </h2>
        <p className="text-gray-700">
          Unfazed reserves the right to update and revise this refund policy as
          needed. Any changes will be posted on our website with the effective
          date. It is your responsibility to review our refund policy
          periodically.
        </p>
      </section>
      <section className="">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Governing Law
        </h2>
        <p className="text-gray-700">
          This refund policy is governed by and shall be construed in accordance
          with the laws of India.
        </p>
      </section>
    </div>
  );
}

export default RefundPolicyPage;

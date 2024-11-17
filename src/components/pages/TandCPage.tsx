import React from "react";

function TandCPage() {
  return (
    <div className="px-4 md:p-12 lg:p-16">
      <h1 className="text-4xl md:text-5xl font-castoro mb-6 text-gray-800">
        Terms & Conditions
      </h1>
      <p className="text-gray-700 mb-6">Last Updated: 20/09/2024</p>

      <section className="my-8 border-b border-gray-200 pb-6">
        <p className="text-gray-700">
          Welcome to Unfazed Therapy Solutions Pvt Ltd., a platform designed to
          provide therapy services and resources to support your mental
          well-being. These detailed Terms of Service ("Terms") outline the
          terms and conditions governing your use of our website and services.
          Please carefully read and understand these Terms before accessing or
          using Unfazed Therapy Solutions Pvt Ltd. Your use of our website and
          services signifies your agreement to abide by these Terms. If you do
          not agree with these Terms, please refrain from using our platform.
        </p>
      </section>

      <section className="my-8 border-b border-gray-200 pb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Use of Services
        </h2>

        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Eligibility
        </h3>
        <p className="text-gray-700 mb-4">
          By using Unfazed Therapy Solutions Pvt Ltd, you acknowledge that you
          are at least 12 years old. If you are under 12, you can use our
          services only with the consent and supervision of a parent or legal
          guardian.
        </p>

        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Educational and Informational Purposes
        </h3>
        <p className="text-gray-700">
          Unfazed Therapy Solutions Pvt Ltd provides information and educational
          content related to mental health. However, this content is not a
          substitute for professional therapy, medical, or psychological advice,
          diagnosis, or treatment. It is essential to consult qualified
          professionals for personalized guidance concerning your mental health.
        </p>
      </section>

      <section className="my-8 pb-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          User Accounts
        </h2>

        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Account Creation
        </h3>
        <p className="text-gray-700 mb-4">
          To access certain features of Unfazed Therapy Solutions Pvt Ltd, you
          are required to create a user account. During the account creation
          process, you agree to provide accurate, current, and complete
          information. It is your responsibility to update your account
          information promptly to ensure its accuracy and completeness.
        </p>

        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Account Security
        </h3>
        <p className="text-gray-700 mb-4">
          Safeguarding the confidentiality of your account credentials is your
          responsibility. You are liable for all activities that occur under
          your account.
        </p>

        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Unauthorized Access
        </h3>
        <p className="text-gray-700">
          If you suspect any unauthorized use of your account or any breach of
          security, you must notify
          <a
            href="mailto:contact@unfazed.co.in"
            className="text-blue-600 underline hover:text-blue-800"
          >
            contact@unfazed.co.in
          </a>
          immediately to address the situation.
        </p>
      </section>
    </div>
  );
}

export default TandCPage;

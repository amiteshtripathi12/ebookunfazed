import React from "react";

function ContactPage() {
  return (
    <>
      <section className="py-8 lg:py-10 bg-white text-center md:text-left">
        <div className="container mx-auto px-4 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 lg:gap-12">
          <div>
            <h2 className="text-4xl font-bold mb-5 font-castoro">
              We'd Love to Hear From <span className="text-[#FF7E24]">You</span>
            </h2>
            <p className="font-poppins">
              Share your thoughts, ask questions, or start your journey with
              Unfazed. We're here to listen and support you.
            </p>
            <div className="space-y-6 font-poppins mt-5 hidden md:block">
              <div className="flex justify-start items-start gap-3">
                <span className="bg-primary p-[2px] aspect-square min-w-7 min-h-7 flex justify-center items-center rounded-full">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 16 16"
                    className="text-white"
                    height="15"
                    width="15"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M15.854.146a.5.5 0 0 1 0 .708L11.707 5H14.5a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 1 0v2.793L15.146.146a.5.5 0 0 1 .708 0m-12.2 1.182a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58z"></path>
                  </svg>
                </span>
                <p className="text-left leading-4">
                  <span className="text-xl font-medium">Phone Number</span>
                  <br />
                  <span className="text-sm">+91 9911771977</span>
                </p>
              </div>
              <div className="flex justify-start items-start gap-3">
                <span className="bg-primary p-[2px] aspect-square min-w-7 min-h-7 flex justify-center items-center rounded-full">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    className="text-white"
                    height="20"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z"></path>
                  </svg>
                </span>
                <p className="text-left leading-4">
                  <span className="text-xl font-medium">Working Hours</span>
                  <br />
                  <span className="text-sm">Mon-Sat, 10:00 AM - 6:30 PM</span>
                </p>
              </div>
              <div className="flex justify-start items-start gap-3">
                <span className="bg-primary p-[2px] aspect-square min-w-7 min-h-7 flex justify-center items-center rounded-full">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 512 512"
                    className="text-white"
                    height="20"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="32"
                      d="M256 48c-79.5 0-144 61.39-144 137 0 87 96 224.87 131.25 272.49a15.77 15.77 0 0 0 25.5 0C304 409.89 400 272.07 400 185c0-75.61-64.5-137-144-137z"
                    ></path>
                    <circle
                      cx="256"
                      cy="192"
                      r="48"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="32"
                    ></circle>
                  </svg>
                </span>
                <p className="text-left leading-4">
                  <span className="text-xl font-medium">Address</span>
                  <br />
                  <span className="text-sm">
                    Nri City Township, Kanpur Nagar, Uttar Pradesh, India -
                    208002
                  </span>
                </p>
              </div>
            </div>
          </div>
          {/* <div className="bg-primary/10 p-5 rounded-2xl font-poppins">
            <form className="space-y-3 text-left">
              <div className="relative">
                <label className="flex text-primary items-center mb-2  text-base leading-6 font-medium">
                  Your Name
                </label>
                <div className="relative text-gray-500 focus-within:text-gray-900">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 21C20 18.1716 20 16.7574 19.1213 15.8787C18.2426 15 16.8284 15 14 15H10C7.17157 15 5.75736 15 4.87868 15.8787C4 16.7574 4 18.1716 4 21M12.1441 11C12.0541 10.991 11.9459 10.991 11.8468 11C9.7027 10.9278 8 9.16911 8 7.00451C8 4.79481 9.78378 3 12 3C14.2072 3 16 4.79481 16 7.00451C15.991 9.16911 14.2883 10.9278 12.1441 11Z"
                        stroke="#111827"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="default-search"
                    className="w-full focus:ring-2 focus:ring-primary/50 block h-12 pr-5 pl-12 py-2.5 text-lg leading-7 font-normal shadow-xs text-gray-900 bg-white border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
                    placeholder="John Doe"
                  />
                </div>
              </div>
              <div className="relative">
                <label className="flex text-primary items-center mb-2  text-base leading-6 font-medium">
                  Your Email
                </label>
                <div className="relative text-gray-500 focus-within:text-gray-900">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.25201 7L8.15881 10.8953C10.2686 12.1612 11.3235 12.7941 12.4825 12.7665C13.6416 12.739 14.6652 12.0566 16.7124 10.6917L21.748 7M10 20H14C17.7712 20 19.6569 20 20.8284 18.8284C22 17.6569 22 15.7712 22 12C22 8.22876 22 6.34315 20.8284 5.17157C19.6569 4 17.7712 4 14 4H10C6.22876 4 4.34315 4 3.17157 5.17157C2 6.34315 2 8.22876 2 12C2 15.7712 2 17.6569 3.17157 18.8284C4.34315 20 6.22876 20 10 20Z"
                        stroke="#6B7280"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="default-search"
                    className="w-full focus:ring-2 focus:ring-primary/50 block h-12 pr-5 pl-12 py-2.5 text-lg leading-7 font-normal shadow-xs text-gray-900 bg-white border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
                    placeholder="john@gmail.com"
                  />
                </div>
              </div>
              <div className="relative">
                <label className="flex text-primary items-center mb-2  text-base leading-6 font-medium">
                  Your Mobile
                </label>
                <div className="relative text-gray-500 focus-within:text-gray-900">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      width="24"
                      height="24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="default-search"
                    className="w-full focus:ring-2 focus:ring-primary/50 block h-12 pr-5 pl-12 py-2.5 text-lg leading-7 font-normal shadow-xs text-gray-900 bg-white border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
                    placeholder="9999999999"
                  />
                </div>
              </div>
              <div>
                <label className="flex text-primary items-center mb-2  text-base leading-6 font-medium">
                  Your Message
                </label>
                <div className="relative ">
                  <textarea
                    className="block w-full  px-4 focus:ring-2 focus:ring-primary/50 py-2.5 text-lg leading-7 font-normal shadow-xs text-gray-900 bg-white border border-gray-300 rounded-2xl placeholder-gray-400 focus:outline-none resize-none"
                    placeholder="Write your message"
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#FF7E24] text-white rounded-lg shadow-md hover:bg-orange-600 transition"
              >
                SEND MESSAGE
              </button>
            </form>
          </div> */}
          <div className="space-y-6 font-poppins md:hidden">
            <div className="flex justify-start items-start gap-3">
              <span className="bg-primary p-[2px] aspect-square min-w-7 min-h-7 flex justify-center items-center rounded-full">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 16 16"
                  className="text-white"
                  height="15"
                  width="15"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M15.854.146a.5.5 0 0 1 0 .708L11.707 5H14.5a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 1 0v2.793L15.146.146a.5.5 0 0 1 .708 0m-12.2 1.182a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58z"></path>
                </svg>
              </span>
              <p className="text-left leading-4">
                <span className="text-xl font-medium">Phone Number</span>
                <br />
                <span className="text-sm">+91 9911771977</span>
              </p>
            </div>
            <div className="flex justify-start items-start gap-3">
              <span className="bg-primary p-[2px] aspect-square min-w-7 min-h-7 flex justify-center items-center rounded-full">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  className="text-white"
                  height="20"
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z"></path>
                </svg>
              </span>
              <p className="text-left leading-4">
                <span className="text-xl font-medium">Working Hours</span>
                <br />
                <span className="text-sm">Mon-Sat, 10:00 AM - 6:30 PM</span>
              </p>
            </div>
            <div className="flex justify-start items-start gap-3">
              <span className="bg-primary p-[2px] aspect-square min-w-7 min-h-7 flex justify-center items-center rounded-full">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 512 512"
                  className="text-white"
                  height="20"
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="32"
                    d="M256 48c-79.5 0-144 61.39-144 137 0 87 96 224.87 131.25 272.49a15.77 15.77 0 0 0 25.5 0C304 409.89 400 272.07 400 185c0-75.61-64.5-137-144-137z"
                  ></path>
                  <circle
                    cx="256"
                    cy="192"
                    r="48"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="32"
                  ></circle>
                </svg>
              </span>
              <p className="text-left leading-4">
                <span className="text-xl font-medium">Address</span>
                <br />
                <span className="text-sm">
                  Nri City Township, Kanpur Nagar, Uttar Pradesh, India - 208002
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ContactPage;

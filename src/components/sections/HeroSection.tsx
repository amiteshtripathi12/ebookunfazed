"use client";
import React, {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {zodResolver} from "@hookform/resolvers/zod";
import {format} from "date-fns";
import {CalendarIcon, PhoneCall} from "lucide-react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {cn} from "@/lib/utils";
import {enUS} from "date-fns/locale"; // Adjust import based on your library

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";

import MainButton from "../common/MainButton";
import {DialogClose} from "@radix-ui/react-dialog";
import {Textarea} from "../ui/textarea";
import {useToast} from "@/hooks/use-toast";
import {DateTimePicker} from "../ui/datetime-picker";
import {useRouter} from "next/navigation";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Link from "next/link";

const FormSchema = z.object({
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
  firstName: z
    .string()
    .min(2, {message: "Firstname must be at least 2 characters."}),
  lastName: z
    .string()
    .min(2, {message: "Lastname must be at least 2 characters."}),
  message: z
    .string()
    .min(2, {message: "Message must be at least 2 characters."}),
  email: z.string().email({message: "Invalid email address."}),
  phoneNumber: z
    .string()
    .min(10, {message: "Phone number must be at least 10 digits."})
    .regex(/^\d+$/, {message: "Phone number must contain only digits."}),
});

function HeroSection() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const [showType, setShowType] = useState("form");
  const [userDetails, setUserDetails] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    phoneNumber: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [countryph, setCountryph] = useState("us");
  const {toast} = useToast();
  const router = useRouter();

  interface RazorpayResponse {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }

  interface PaymentResult {
    success: boolean;
  }

  // Prevent body scroll when dialog is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const loadScript = (src: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const script = document.createElement("script");

      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setIsDialogOpen(false);
    try {
      // Prepare form data for API call
      const formData = new FormData();
      formData.append("amount", "50000"); // Amount in paise (50000 = ₹500)
      formData.append("currency", "INR");
      formData.append("contact_id", userDetails?.id);

      // Create Razorpay order by calling your API
      const response = await fetch(
        "https://landing.unfazed.co.in/api/create-payment/",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (!data) {
        console.error("Failed to create order");
        return;
      }

      // Load the Razorpay script
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!res) {
        alert("Failed to load Razorpay checkout script.");
        return;
      }

      // Razorpay payment options
      const options: any = {
        key: "rzp_test_7GPcqJ45CdVJHP", // Replace with your Razorpay key
        amount: data.amount, // Amount in paise
        currency: data.currency,
        name: "Unfazed",
        description: "Test Transaction",
        order_id: data.id, // Razorpay order ID returned from backend
        handler: (response: RazorpayResponse) => {
          // This function triggers on payment success
          if (response.razorpay_payment_id) {
            // If payment was successful
            router.push("/register-success");
          } else {
            // If payment failed
            toast({
              variant: "destructive",
              title: "Uh oh! Something went wrong.",
              description: "Payment failed. Please try again.",
            });
            // alert("Payment failed. Please try again.");
          }
        },
        prefill: {
          name: `${userDetails?.firstName || "John"} ${
            userDetails?.lastName || "Doe"
          }`,
          email: userDetails?.email || "john.doe@example.com",
          contact: userDetails?.phoneNumber || "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      // Open Razorpay payment window
      const rzp1 = new (window as any).Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Error in processing payment:", error);

      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          "An error occurred while processing the payment. Please try again.",
      });
    }
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log({data});
    if (data.phoneNumber?.startsWith("91")) {
      setCountryph("ind");
    }
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          // Check if the value is a Date object or a valid date string
          if (key === "dob" && value instanceof Date) {
            // Format the date as dd/mm/yyyy
            const formattedDOB = `${value
              .getDate()
              .toString()
              .padStart(2, "0")}/${(value.getMonth() + 1)
              .toString()
              .padStart(2, "0")}/${value.getFullYear()}`;
            formData.append(key, formattedDOB);
          } else {
            formData.append(key, value as any);
          }
        }
      });

      const response = await fetch(
        "https://landing.unfazed.co.in/api/contact/",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setUserDetails(result);
      setShowType("pay");

      console.log("Form submitted successfully:", result);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
      console.error("Error submitting form:", error);
    }
  }

  return (
    <section className="flex justify-between flex-col md:flex-row gap-4 items-center">
      <div>
        <p className="font-[700] md:leading-[5.0625rem] text-2xl md:text-[3.375rem] text-darkBlue">
          India's Fastest Growing Mental Health Creator
        </p>
        <p className="text-[1.375rem] font-[500]">
          Presenting a life-changing guide to help you <br /> reconnect and
          heal!
        </p>

        <p className="text-[1rem] font-[500]">
          *Healing from the Functional Freeze State* – your path to resilience
          and growth.
        </p>

        <div className="flex gap-[1.75rem] items-center mt-[2rem]">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              {/* <MainButton
                text="Book Now"
                classes="shadow-none w-[10.125rem]"
              /> */}
              <Button
                onClick={() => setIsDialogOpen(true)}
                className=" bg-primary hover:opacity-90  hover:bg-secondary text-white shadow-none w-[10.125rem]"
              >
                Book Now
              </Button>
            </DialogTrigger>
            <DialogContent className="w-full max-w-[800px] sm:max-w-[800px]">
              <DialogHeader>
                <DialogTitle>Book Now</DialogTitle>
                {/* <DialogDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </DialogDescription> */}
              </DialogHeader>
              {showType === "form" ? (
                <Form {...form}>
                  <form id="myForm" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid gap-4 py-4 grid-cols-2">
                      <div>
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({field}) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Enter your first name"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div>
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({field}) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Enter your last name"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    <div className="grid gap-4 py-4 grid-cols-2">
                      <div>
                        <FormField
                          control={form.control}
                          name="email"
                          render={({field}) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="email"
                                  placeholder="Enter your email"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div>
                        <FormField
                          control={form.control}
                          name="phoneNumber"
                          render={({field}) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <PhoneInput
                                  {...field}
                                  country="us" // Default country (can change to any country code, e.g., "us", "ca", "gb")
                                  placeholder="Enter your phone number"
                                  value={field.value}
                                  onChange={field.onChange}
                                  inputClass="w-full py-2 px-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" // Tailwind classes for styling the input
                                  buttonClass="bg-gray-200 border-r-2 border-gray-300 rounded-l-md" // Style the flag button
                                  dropdownClass="bg-white border border-gray-300 shadow-lg rounded-md" // Style the dropdown (country selection)
                                  specialLabel="Phone"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    <div className="grid gap-4 py-4 grid-cols-2">
                      <div>
                        <FormField
                          control={form.control}
                          name="dob"
                          render={({field}) => (
                            <FormItem className="flex flex-col">
                              <FormLabel className="mb-2 mt-1">
                                Date of Birth
                              </FormLabel>
                              <DateTimePicker
                                granularity="day"
                                displayFormat={{hour24: "MMMM dd, yyyy"}}
                                value={field.value}
                                onChange={field.onChange}
                                placeholder="What's ur birthday?"
                                locale={enUS}
                                weekStartsOn={1}
                                showWeekNumber={false}
                                showOutsideDays={false}
                              />

                              {/* <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant={"outline"}
                                      className={cn(
                                        "w-full pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value ? (
                                        format(field.value, "PPP")
                                      ) : (
                                        <span>Pick a date</span>
                                      )}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent
                                  className="w-auto p-0"
                                  align="start"
                                >
                                  <Calendar
                                    mode="single"
                                    captionLayout="dropdown-buttons"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    fromYear={1960}
                                    toYear={2010}
                                  />

                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) =>
                                      date > new Date() ||
                                      date < new Date("1900-01-01")
                                    }
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover> */}
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div>
                        <FormField
                          control={form.control}
                          name="message"
                          render={({field}) => (
                            <FormItem>
                              <FormLabel>Message</FormLabel>
                              <FormControl>
                                <Textarea
                                  {...field}
                                  placeholder="Enter your message"
                                  className="w-full"
                                  rows={4}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    <div></div>
                  </form>
                </Form>
              ) : (
                <>
                  <div className="flex flex-col items-center justify-center p-8 mt-6 bg-white rounded-lg shadow-lg max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto">
                    <img
                      src="/images/enrollment.png"
                      alt="Planeeet Logo"
                      className="w-16 h-16 mb-4"
                    />

                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold">
                      Registered
                    </h1>
                    {/* <p className="text-gray-500 mt-2 flex text-center">
                      Our team will contact you soon...
                      <PhoneCall color="#ff6600" className="ml-1" />
                    </p> */}

                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-4">
                      Pay Now, Get Your eBook!
                    </h2>
                    {/* <p className="text-center text-gray-500 mt-2 text-sm sm:text-base lg:text-lg">
                      This feature is available for paid users only. Please, pay
                      now or book your seat to get full access to all our
                      course. Don’t miss out!
                    </p> */}

                    <div className="pt-4 px-6 text-center bg-gray-50 dark:bg-gray-900 lg:flex-shrink-0 lg:flex lg:flex-col lg:justify-center">
                      <p className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                        Limited Time Offer, First 500 readers only
                      </p>
                      {countryph === "ind" ? (
                        <>
                          {" "}
                          <div className="">
                            <span
                              // style="opacity:0.5"
                              className="font-mono text-xl md:text-lg font-medium text-gray-400 dark:text-gray-400"
                            >
                              ₹
                            </span>
                            <span
                              // style="opacity:0.5"
                              className="h1 line-through text-gray-600 dark:text-gray-400"
                            >
                              2500
                            </span>{" "}
                            <span className="text-red-600 text-sm">
                              Special promotion
                            </span>
                          </div>
                          <div className="mt-4 flex items-center justify-center text-5xl font-extrabold text-gray-900 dark:text-white">
                            <span>₹499</span>
                            <span className="ml-3 text-xl font-medium text-gray-500 dark:text-gray-400">
                              INR
                            </span>
                          </div>
                        </>
                      ) : (
                        <>
                          {" "}
                          <div className="">
                            <span
                              // style="opacity:0.5"
                              className="font-mono text-xl md:text-lg font-medium text-gray-400 dark:text-gray-400"
                            >
                              $
                            </span>
                            <span
                              // style="opacity:0.5"
                              className="h1 line-through text-gray-600 dark:text-gray-400"
                            >
                              129
                            </span>{" "}
                            <span className="text-red-600 text-sm">
                              Special promotion
                            </span>
                          </div>
                          <div className="mt-4 flex items-center justify-center text-5xl font-extrabold text-gray-900 dark:text-white">
                            <span>$39.99</span>
                            <span className="ml-3 text-xl font-medium text-gray-500 dark:text-gray-400">
                              USD
                            </span>
                          </div>
                        </>
                      )}
                    </div>

                    <Link
                      href={
                        countryph === "ind"
                          ? "https://rzp.io/rzp/wweNi4EM"
                          : "https://www.paypal.com/ncp/payment/DZGGQESRKJY4Q"
                      }
                      className="mt-6 bg-primary hover:opacity-90 hover:bg-secondary text-white py-2 px-6 rounded-full shadow-none text-sm sm:text-base lg:text-lg"
                    >
                      PAY NOW
                    </Link>
                  </div>
                </>
              )}
              <DialogFooter>
                {showType === "form" && (
                  <Button
                    type="submit"
                    form="myForm"
                    className="bg-primary w-[8.125rem] hover:opacity-90  hover:bg-secondary text-white shadow-none"
                  >
                    Book Now
                  </Button>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <div className="flex gap-[1.56rem] items-center">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <button className="flex gap-2 items-center hover:opacity-90 transition-opacity">
                  <img src="/images/fancy_play_icon.png" alt="play icon" />
                  <span className="font-bold text-base">Learn More</span>
                </button>
              </DialogTrigger>

              <DialogContent
                className="w-[95vw] h-[90vh] bg-black/95 sm:max-w-[800px] "
                onInteractOutside={(e) => e.preventDefault()} // Prevent unwanted closes on mobile
              >
                <DialogClose className="absolute right-4 top-4 rounded-sm bg-gray-500 text-white hover:bg-gray-600 p-2 transition-opacity opacity-70 hover:opacity-100"></DialogClose>

                <div className="w-full h-full flex items-center justify-center">
                  <video
                    className="w-full h-full object-contain"
                    controls
                    playsInline
                    controlsList="nodownload"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <source src="/video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <img
          src="/images/main_image.jpg"
          alt="guy with phone surrounded by action icons"
          className="w-full max-w-[80%] h-auto max-h-[80%] object-contain"
        />
      </div>
    </section>
  );
}

export default HeroSection;

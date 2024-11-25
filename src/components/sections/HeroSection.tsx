"use client";
import React, {useContext, useEffect, useRef, useState} from "react";
import {Button} from "@/components/ui/button";
import {DialogContext} from "@/app/layout";
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
import {CalendarIcon, CheckCircle, Clock, Copy, PhoneCall} from "lucide-react";
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
import {Alert, AlertDescription} from "@/components/ui/alert";
import MainButton from "../common/MainButton";
import {DialogClose} from "@radix-ui/react-dialog";
import {Textarea} from "../ui/textarea";
import {useToast} from "@/hooks/use-toast";
import {DateTimePicker} from "../ui/datetime-picker";
import {useRouter} from "next/navigation";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Link from "next/link";
import axios from "axios";

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

  const dialogContext = useContext(DialogContext);

  if (!dialogContext) {
    throw new Error(
      "DialogContext is not available. Ensure it's used within the provider."
    );
  }

  const {isDialogOpen, setIsDialogOpen} = dialogContext;

  const [showType, setShowType] = useState("form");
  const [userDetails, setUserDetails] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    phoneNumber: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [countryph, setCountryph] = useState("us");
  const {toast} = useToast();
  const router = useRouter();

  const [answers, setAnswers] = useState<boolean[]>([]);
  const [showCoupon, setShowCoupon] = useState(false);
  const [timeLeft, setTimeLeft] = useState(360); // 6 minutes in seconds
  const [copied, setCopied] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [isApplied, setIsApplied] = useState(false);
  const couponRef = useRef<HTMLDivElement | null>(null);
  const [couponInput, setCouponInput] = useState("");
  const [invalidCoupon, setInvalidCoupon] = useState(false);

  const [coupons, setCoupons] = useState<{code: string; expiresAt: number}[]>(
    []
  );

  const questions = [
    "Do you mindlessly scroll social media at night after work?",
    "Do you feel exhausted often after you finish a task?",
    "Are you social at work but ignore every text once you get home?",
    "Do you tend to overthink different scenarios in your head?",
    "Do you tend to stay back at home and never want to leave?",
    "Are you willing to get over these things?",
    "Are you willing to do whatever it takes to heal?",
    'Are you ready to get your hands on my life\'s work, made specially to help you break free from this "functional freeze" state?',
  ];

  interface RazorpayResponse {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }

  interface PaymentResult {
    success: boolean;
  }

  const generateCoupon = () => {
    const randomCode = `HEAL${Math.floor(100 + Math.random() * 900)}`;
    const expiresAt = Date.now() + 360000; // Expires in 6 minutes
    setCoupons([...coupons, {code: randomCode, expiresAt}]);
    return randomCode;
  };

  useEffect(() => {
    if (showCoupon && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [showCoupon, timeLeft]);

  const handleAnswer = (index: number, value: boolean) => {
    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[index] = value;
      return newAnswers;
    });
    if (Object.keys({...answers, [index]: value}).length === questions.length) {
      setShowCoupon(true);
      const newCoupon = generateCoupon();
    }
  };

  useEffect(() => {
    if (showCoupon && couponRef.current) {
      couponRef.current.scrollIntoView({behavior: "smooth", block: "start"});
    }
  }, [showCoupon]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const copyToClipboard = () => {
    const currentCoupon = coupons[coupons.length - 1]?.code;
    if (currentCoupon) {
      navigator.clipboard.writeText(currentCoupon);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleApplyCoupon = () => {
    const validCoupon = coupons.find(
      (c) => c.code === couponInput && c.expiresAt > Date.now()
    );
    if (validCoupon) {
      setIsApplied(true);
    } else {
      setInvalidCoupon(true);
    }
  };

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

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log({data});

    if (data.phoneNumber?.startsWith("91")) {
      setCountryph("ind");
    }

    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
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

      const response = await axios.post(
        "https://unfazed.medicslifecare.com/api/contact/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      setUserDetails(response.data);
      setShowType("question");

      console.log("Form submitted successfully:", response.data);
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
                                  country="us"
                                  placeholder="Enter your phone number"
                                  value={field.value}
                                  onChange={field.onChange}
                                  inputClass="w-full py-2 px-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  buttonClass="bg-gray-200 border-r-2 border-gray-300 rounded-l-md"
                                  dropdownClass="bg-white border border-gray-300 shadow-lg rounded-md"
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
              ) : showType === "question" ? (
                <div className="flex flex-col items-center justify-center mt-6 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto">
                  <div className="w-full space-y-4 max-h-[75vh] overflow-y-auto custom-scrollbar">
                    {questions.map((question, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between gap-4 p-2 hover:bg-gray-50 rounded-lg"
                      >
                        <p className="font-medium text-sm sm:text-base flex-1">
                          {question}
                        </p>
                        <div className="flex gap-2 shrink-0">
                          <Button
                            variant={
                              answers[index] === true ? "default" : "outline"
                            }
                            onClick={() => handleAnswer(index, true)}
                            className="w-16 h-8 text-sm"
                            size="sm"
                          >
                            Yes
                          </Button>
                          <Button
                            variant={
                              answers[index] === false ? "default" : "outline"
                            }
                            onClick={() => handleAnswer(index, false)}
                            className="w-16 h-8 text-sm"
                            size="sm"
                          >
                            No
                          </Button>
                        </div>
                      </div>
                    ))}

                    {showCoupon && (
                      <div
                        ref={couponRef}
                        className="mt-8 p-6 bg-gray-50 rounded-lg space-y-4"
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl font-bold text-primary">
                            Special Offer!
                          </h3>
                          <div className="flex items-center gap-2">
                            <Clock color="#ff6600" className="w-4 h-4" />
                            <span className="font-mono">
                              {formatTime(timeLeft)}
                            </span>
                          </div>
                        </div>

                        <Alert>
                          <AlertDescription className="font-medium">
                            HERE'S A COUPON CODE, MADE SPECIALLY FOR YOU! PASTE
                            IT IN THE COUPON BOX IN THE NEXT PAGE, AND JUST SEE
                            THE MAGIC UNFOLD!
                          </AlertDescription>
                        </Alert>

                        <div className="flex gap-2">
                          <Input
                            value={coupons[coupons.length - 1]?.code || ""}
                            readOnly
                            className="font-mono text-lg"
                          />
                          <Button
                            onClick={copyToClipboard}
                            variant="outline"
                            className="w-24"
                          >
                            {copied ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </Button>
                        </div>

                        <p className="text-sm text-gray-500">
                          P.S. THIS COUPON IS JUST VALID FOR THE NEXT 6 MINUTES!
                          SO, HURRY!
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-8 mt-6 bg-white rounded-lg shadow-lg max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto">
                  <img
                    src="/images/enrollment.png"
                    alt="Planeeet Logo"
                    className="w-16 h-16 mb-4"
                  />

                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold">
                    Get Your eBook Now!
                  </h1>

                  <div className="w-[80%] max-w-md mt-6">
                    <div className="flex gap-2 mb-2">
                      <Input
                        placeholder="Enter coupon code"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                      />
                      <Button
                        onClick={handleApplyCoupon}
                        disabled={couponInput?.length < 0}
                        variant="outline"
                        className="w-24"
                      >
                        Apply
                      </Button>
                    </div>
                    {isApplied &&
                      (invalidCoupon ? (
                        <span className="ml-2 text-red-600">
                          Invalid Coupon or Coupon Expired!
                        </span>
                      ) : (
                        <span className="ml-2 text-green-600">
                          Coupon applied successfully!
                        </span>
                      ))}
                  </div>

                  <div className="pt-4 px-6 text-center bg-gray-50 dark:bg-gray-900 lg:flex-shrink-0 lg:flex lg:flex-col lg:justify-center">
                    {/* <p className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                      Limited Time Offer, First 500 readers only
                    </p> */}
                    {countryph === "ind" ? (
                      <>
                        {isApplied && (
                          <div className="">
                            <span className="font-mono text-xl md:text-lg font-medium text-gray-400 dark:text-gray-400">
                              ₹
                            </span>
                            <span className="h1 line-through text-gray-600 dark:text-gray-400">
                              2499
                            </span>
                            <span className="text-red-600 text-sm ml-2">
                              Special promotion
                            </span>
                          </div>
                        )}

                        <div className="mt-4 flex items-center justify-center text-5xl font-extrabold text-gray-900 dark:text-white">
                          <span>₹{isApplied ? "499" : "2499"}</span>
                          <span className="ml-3 text-xl font-medium text-gray-500 dark:text-gray-400">
                            INR
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        {isApplied && (
                          <div className="flex justify-center">
                            <div className="">
                              <span className="font-mono text-xl md:text-lg font-medium text-gray-400 dark:text-gray-400">
                                $
                              </span>
                              <span className="h1 line-through text-gray-600 dark:text-gray-400">
                                99
                              </span>
                              <span className="text-red-600 text-sm ml-2">
                                Special promotion
                              </span>
                            </div>
                            <div className="flex items-center gap-2 ml-4">
                              <Clock color="#ff6600" className="w-4 h-4" />
                              <span className="font-mono">
                                {formatTime(timeLeft)}
                              </span>
                            </div>
                          </div>
                        )}

                        <div className="mt-4 flex items-center justify-center text-5xl font-extrabold text-gray-900 dark:text-white">
                          <span>${isApplied ? "39.99" : "99"}</span>
                          <span className="ml-3 text-xl font-medium text-gray-500 dark:text-gray-400">
                            USD
                          </span>
                        </div>
                      </>
                    )}
                  </div>

                  {isApplied ? (
                    <Link
                      href={
                        countryph === "ind"
                          ? "https://rzp.io/rzp/38770yOK"
                          : "https://rzp.io/rzp/pVu7MXf"
                      }
                      className="mt-6 bg-primary hover:opacity-90 hover:bg-secondary text-white py-2 px-6 rounded-full shadow-none text-sm sm:text-base lg:text-lg"
                    >
                      PAY NOW
                    </Link>
                  ) : (
                    <button
                      disabled
                      className="mt-6 bg-gray-400 text-white py-2 px-6 rounded-full text-sm sm:text-base lg:text-lg cursor-not-allowed"
                    >
                      PAY NOW
                    </button>
                  )}
                </div>
              )}
              <DialogFooter>
                {showType === "form" ? (
                  <Button
                    type="submit"
                    form="myForm"
                    className="bg-primary w-[8.125rem] hover:opacity-90 hover:bg-secondary text-white shadow-none"
                  >
                    Book Now
                  </Button>
                ) : showType === "question" ? (
                  <Button
                    onClick={() => {
                      setShowType("pay");
                    }}
                    disabled={!showCoupon}
                    className="bg-primary w-[8.125rem] hover:opacity-90 hover:bg-secondary text-white shadow-none"
                  >
                    Next
                  </Button>
                ) : null}
              </DialogFooter>
            </DialogContent>
          </Dialog>
          {/* <div className="flex gap-[1.56rem] items-center">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <button className="flex gap-2 items-center hover:opacity-90 transition-opacity">
                  <img src="/images/fancy_play_icon.png" alt="play icon" />
                  <span className="font-bold text-base">Learn More</span>
                </button>
              </DialogTrigger>

              <DialogContent
                className="w-[95vw] h-[90vh] bg-black/95 sm:max-w-[800px] "
                onInteractOutside={(e) => e.preventDefault()}
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
          </div> */}
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

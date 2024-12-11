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
import {
  CalendarIcon,
  CheckCircle,
  Clock,
  Copy,
  Loader2,
  PhoneCall,
} from "lucide-react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {cn} from "@/lib/utils";
import {enUS} from "date-fns/locale"; // Adjust import based on your library
import {TextGenerateEffect} from "../ui/text-generate-effect";
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
  email: z.string().email({message: "Invalid email address."}),
  phoneNumber: z
    .string()
    .min(10, {message: "Phone number must be at least 10 digits."})
    .regex(/^\d+$/, {message: "Phone number must contain only digits."}),
});

const cards = [
  {
    id: 0,
    priceINR: "₹2499",
    priceDiscountedINR: "₹999",
    price: "$99.98",
    priceDiscounted: "$39.99",
    features: [
      "1 Therapy Session(First 200 people)",
      "5 Different audiobooks",
      "Access to our Private Community for 3 Months",
      "Q&A sessions with Jasneet",
      "Journals",
      "Self Reflection worksheets",
      "Early bird offers to our upcoming webinars specially for clients",
    ],
    prices: ["$35", "$499", "$149", "$39.99", "$49.99", "$49.99", "$49.99"],
    pricesINR: ["₹1500", "₹5999", "₹1499", "₹999", "₹2499", "₹1999", "₹2499"],
  },
  {
    id: 1,
    priceINR: "₹16994",
    priceDiscountedINR: "₹1998",
    price: "$872.96",
    priceDiscounted: "$99.98",
    isPopular: true,
    features: [
      "1 Therapy Session(First 200 people)",
      "5 Different audiobooks",
      "Access to our Private Community for 3 Months",
      "Q&A sessions with Jasneet",
      "Journals",
      "Self Reflection worksheets",
      "Early bird offers to our upcoming webinars specially for clients",
    ],
    prices: ["$35", "$499", "$149", "$39.99", "$49.99", "$49.99", "$49.99"],
    pricesINR: ["₹1500", "₹5999", "₹1499", "₹999", "₹2499", "₹1999", "₹2499"],
  },
];

function HeroSection() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const dialogContext = useContext(DialogContext);
  const [selectedCard, setSelectedCard] = useState(0);

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
    message: "null",
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
  const [isSubmiting, setIsSubmiting] = useState(false);

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
      setSelectedCard(1);
    } else {
      setInvalidCoupon(true);
    }
  };

  const handlePayment = async () => {
    if (selectedCard == 1 && countryph === "ind") {
      router.push("https://rzp.io/rzp/rqKi68A"); //1998 test
    } else if (selectedCard == 0 && countryph === "ind") {
      router.push("https://rzp.io/rzp/38770yOK"); //
    } else if (selectedCard == 0 && countryph === "us") {
      router.push("https://rzp.io/rzp/pVu7MXf");
    } else if (selectedCard == 1 && countryph === "us") {
      router.push("https://rzp.io/rzp/r3Aqsoq");
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
    setIsSubmiting(true);
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
      setIsSubmiting(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
      console.error("Error submitting form:", error);
    }
    setIsSubmiting(false);
  }

  return (
    <>
      <section className="flex justify-between flex-col md:flex-row gap-4 items-center">
        <div>
          <p className="font-[700] md:leading-[4.5rem] text-xl md:text-[2.875rem] text-darkBlue">
            Break Free From Functional Freeze
          </p>

          <p className="text-[1.375rem] font-[500]">
            Unlock your potential, regain control, and live life with purpose
            and confidence
          </p>

          <p className="text-[1rem] font-[500]">
            Presenting a life-changing guide to help you reconnect and heal!
          </p>

          <div className="flex gap-[1.75rem] items-center mt-[2rem]">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
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
                      </div>
                      <div></div>
                    </form>
                  </Form>
                ) : showType === "question" ? (
                  <div className="flex flex-col items-center justify-center mt-6 w-full mx-auto">
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
                              HERE'S A COUPON CODE, MADE SPECIALLY FOR YOU!
                              PASTE IT IN THE COUPON BOX IN THE NEXT PAGE, AND
                              JUST SEE THE MAGIC UNFOLD!
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
                            P.S. THIS COUPON IS JUST VALID FOR THE NEXT 6
                            MINUTES! SO, HURRY!
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className=" max-h-[75vh] overflow-y-auto custom-scrollbar">
                    <div className="flex flex-col items-center justify-center rounded-lg  w-full mx-auto ">
                      <div className="mt-6">
                        <span className="ml-2 text-2xl font-semibold">
                          APPLY THE COUPON AND SEE THE MAGIC UNFOLD!!
                        </span>
                        <div className="flex justify-around w-full items-center mt-6 mb-2">
                          <div className="flex justify-around gap-2 mb-2">
                            <Input
                              placeholder="Enter coupon code"
                              value={couponInput}
                              onChange={(e) => setCouponInput(e.target.value)}
                              className="max-w-56"
                            />
                            {!isApplied ? (
                              <Button
                                onClick={handleApplyCoupon}
                                disabled={couponInput?.length === 0}
                                variant="outline"
                                className="w-24"
                              >
                                Apply
                              </Button>
                            ) : (
                              <Button
                                disabled={true}
                                variant="outline"
                                className="w-24"
                              >
                                Applied
                              </Button>
                            )}
                          </div>
                        </div>

                        {isApplied &&
                          (invalidCoupon ? (
                            <span className="ml-2 text-red-600">
                              Invalid Coupon or Coupon Expired!
                            </span>
                          ) : (
                            <div className="flex ">
                              <span className="ml-2 text-green-600">
                                Coupon applied successfully!
                              </span>
                              <div className="flex items-center gap-2 ml-4">
                                <Clock color="#ff6600" className="w-4 h-4" />
                                <span className="font-mono">
                                  {formatTime(timeLeft)}
                                </span>
                              </div>
                            </div>
                          ))}
                      </div>

                      <div className="w-[96%] pt-4 px-6 text-center dark:bg-gray-900 lg:flex-shrink-0 lg:flex lg:flex-col lg:justify-center">
                        <div className="py-4">
                          <div className="mx-auto max-w-7xl px-0 sm:px-6 lg:px-8">
                            <div
                              className={`${
                                !isApplied
                                  ? "flex justify-center items-center"
                                  : "space-y-8 lg:grid lg:grid-cols-2 sm:gap-6 xl:gap-8 lg:space-y-0 lg:items-center"
                              }`}
                            >
                              {cards
                                .filter(
                                  (card) => !(card.id === 1 && !isApplied)
                                )
                                .map((card) => (
                                  <div
                                    key={card.id}
                                    onClick={() => setSelectedCard(card.id)}
                                    className={`flex flex-col mx-auto max-w-sm text-gray-900 rounded-2xl 
                transition-all duration-500 cursor-pointer
              ${
                selectedCard === card.id
                  ? "bg-indigo-50 scale-105 border-2 border-primary"
                  : "bg-gray-50 hover:bg-gray-100"
              }`}
                                  >
                                    {card.isPopular && (
                                      <div className="uppercase bg-gradient-to-r from-primary to-secondary rounded-t-2xl p-3 text-center text-white">
                                        ONE TIME OFFER
                                      </div>
                                    )}

                                    <div className="p-2 xl:py-4 xl:px-6">
                                      <div className="flex items-center mb-4">
                                        <span
                                          className={`
                font-manrope mr-4 text-6xl font-semibold 
                ${card.id === 1 ? "text-primary" : ""}
              `}
                                        >
                                          {isApplied
                                            ? countryph === "ind"
                                              ? card.priceDiscountedINR
                                              : card.priceDiscounted
                                            : countryph === "ind"
                                            ? card.priceINR
                                            : card.price}
                                        </span>
                                        {isApplied && (
                                          <span className="text-gray-500 line-through text-3xl">
                                            {countryph === "ind"
                                              ? card.priceINR
                                              : card.price}
                                          </span>
                                        )}
                                      </div>
                                      <ul className="mb-4 space-y-2 text-left text-lg">
                                        <li className="flex justify-between items-start space-x-4 border-b pt-2 mt-2">
                                          <span className="ml-10">Bonus</span>
                                          <span className="text-gray-900 text-lg">
                                            Worth
                                          </span>
                                        </li>
                                        <li className="flex justify-between items-start space-x-4">
                                          <div className="flex items-center space-x-4">
                                            <svg
                                              className="flex-shrink-0 w-6 h-6 text-green-400"
                                              viewBox="0 0 30 30"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                d="M10 14.7875L13.0959 17.8834C13.3399 18.1274 13.7353 18.1275 13.9794 17.8838L20.625 11.25M15 27.5C8.09644 27.5 2.5 21.9036 2.5 15C2.5 8.09644 8.09644 2.5 15 2.5C21.9036 2.5 27.5 8.09644 27.5 15C27.5 21.9036 21.9036 27.5 15 27.5Z"
                                                stroke="currentColor"
                                                strokeWidth="1.6"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                              />
                                            </svg>
                                            <span>EBook</span>
                                          </div>
                                          <span className="text-gray-500 text-sm font-medium">
                                            {countryph === "ind"
                                              ? card.priceINR
                                              : card.price}
                                          </span>
                                        </li>

                                        {card.features.map((feature, index) => (
                                          <li
                                            key={index}
                                            className="flex justify-between items-start space-x-4"
                                          >
                                            <div className="flex items-center space-x-4">
                                              {card?.id === 1 ? (
                                                <svg
                                                  className="flex-shrink-0 w-6 h-6 text-green-400"
                                                  viewBox="0 0 30 30"
                                                  fill="none"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                >
                                                  <path
                                                    d="M10 14.7875L13.0959 17.8834C13.3399 18.1274 13.7353 18.1275 13.9794 17.8838L20.625 11.25M15 27.5C8.09644 27.5 2.5 21.9036 2.5 15C2.5 8.09644 8.09644 2.5 15 2.5C21.9036 2.5 27.5 8.09644 27.5 15C27.5 21.9036 21.9036 27.5 15 27.5Z"
                                                    stroke="currentColor"
                                                    strokeWidth="1.6"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                  />
                                                </svg>
                                              ) : (
                                                <svg
                                                  className="flex-shrink-0 w-6 h-6 text-red-500"
                                                  viewBox="0 0 30 30"
                                                  fill="none"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                >
                                                  <path
                                                    d="M8.75 8.75L21.25 21.25M21.25 8.75L8.75 21.25"
                                                    stroke="currentColor"
                                                    strokeWidth="1.6"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                  />
                                                  <circle
                                                    cx="15"
                                                    cy="15"
                                                    r="12.5"
                                                    stroke="currentColor"
                                                    strokeWidth="1.6"
                                                  />
                                                </svg>
                                              )}
                                              <span>{feature}</span>
                                            </div>
                                            <span className="text-gray-500 text-sm font-medium">
                                              {countryph === "ind"
                                                ? card.pricesINR[index]
                                                : card.prices[index]}
                                            </span>
                                          </li>
                                        ))}

                                        <li className="flex justify-between items-start space-x-4 border-t pt-2 mt-2">
                                          <span className="font-bold ml-12">
                                            Total
                                          </span>
                                          <span className="text-gray-900 font-semibold text-lg">
                                            {countryph === "ind"
                                              ? card.priceINR
                                              : card.price}
                                          </span>
                                        </li>
                                        {isApplied && (
                                          <li className="flex justify-between items-start space-x-4 border-t pt-2 mt-2">
                                            <span className="font-bold ml-12">
                                              At just
                                            </span>
                                            <span className="text-gray-900 font-semibold text-lg">
                                              {countryph === "ind"
                                                ? card.priceDiscountedINR
                                                : card.priceDiscounted}
                                            </span>
                                          </li>
                                        )}
                                      </ul>

                                      <button
                                        disabled={!isApplied}
                                        onClick={handlePayment}
                                        className={`
                  py-2.5 px-5 shadow-sm rounded-full transition-all duration-500 
                  text-base font-semibold text-center w-fit block mx-auto
                  ${
                    selectedCard === card.id
                      ? "bg-primary text-white hover:bg-secondary"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }
                `}
                                      >
                                        {selectedCard === card.id
                                          ? "Purchase Plan"
                                          : "Select Plan"}
                                      </button>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        </div>
                        {/* {countryph === "ind" ? (
                    <>
                      {isApplied && (
                        <div className="flex justify-center">
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
                  )} */}
                      </div>
                    </div>
                  </div>
                )}
                <DialogFooter>
                  {showType === "form" ? (
                    isSubmiting ? (
                      <Button
                        className="bg-primary w-[8.125rem] text-white shadow-none"
                        disabled
                      >
                        <Loader2 className="animate-spin" /> Please wait
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        form="myForm"
                        className="bg-primary w-[8.125rem] hover:opacity-90 hover:bg-secondary text-white shadow-none"
                      >
                        Book Now
                      </Button>
                    )
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
            alt="main_image"
            className="w-full max-w-[80%] h-auto max-h-[90vh] object-contain"
          />
        </div>
      </section>

      {/* Offer Section */}
      <section className="bg-lightGray py-12 px-6 md:px-12">
        <TextGenerateEffect
          className="text-center text-black mt-4 text-[1.375rem] font-[500]"
          // duration={0.0001}
          words="Transform your life with a complete bonus package worth a lifetime of value!"
        />

      {/* <TextGenerateEffect
        className="text-center text-black mt-4 text-[1.375rem] font-[500]"
        words={
          <>
            Transform your life with a complete{" "}
            <span className="text-red-500 font-bold">bonus package</span> worth a lifetime of value!
          </>
        }
      /> */}





        <div className="flex flex-col md:flex-row justify-center gap-6 mt-8">
          <div className="flex-1 text-center">
            <h3 className="font-[600] mb-4 text-3xl">What You’ll Unlock with the Ebook:</h3>
            
            <ul className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-2xl text-center">
              {[
                "5 Audiobooks",
                "5 Journals",
                "Self Reflection Worksheets",
                "Access to our exclusive Art Therapy Workshop",
                "Free Access to our Private Community!!",
                "FREE THERAPY SESSION !!!",
                "Access to private Q&A sessions with Jasneet!",
              ].map((item, index) => (
                <li
                  key={index}
                  className={`flex items-center justify-center ${
                    index % 2 === 0 ? "md:justify-start" : "md:justify-start"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <svg
                      className="flex-shrink-0 w-6 h-6 text-primary"
                      viewBox="0 0 30 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15 2.5L18.09 11.09L27.5 11.25L20.55 17.02L23.63 25.5L15 20.18L6.37 25.5L9.45 17.02L2.5 11.25L11.91 11.09L15 2.5Z"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </svg>
                    <span
                      className={item === "FREE THERAPY SESSION !!!" ? "text-red-600 font-bold" : ""}
                    >
                      {item}
                    </span>
                  </div>
                </li>
              ))}
            </ul>


            {/* <ul className="list-disc text-left mx-auto mt-4 max-w-sm space-y-2">
             
            </ul> */}
          </div>
        </div>
        <p className="text-center mt-6 text-3xl font-[500]">
          "Transform your life for less than the price of a weekend meal out!"
        </p>
        <p className="text-center text-red-600 font-[700] mt-4 text-4xl">
          UNLOCK A FREE THERAPY SESSION ALONG WITH THE EBOOK!! ONLY FOR 200
          PEOPLE!! 22 SPOTS LEFT ONLY!!
        </p>

        <div className="flex justify-center mt-6">
          <Button
            onClick={() => setIsDialogOpen(true)}
            className=" bg-primary hover:opacity-90  hover:bg-secondary text-white shadow-none w-[10.125rem]"
          >
            Book Now
          </Button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white py-12 px-6 md:px-12">
        <h2 className="text-[2rem] md:text-[2.5rem] font-[700] text-center text-darkBlue">
          Hear from the Ones Who Transformed Their Lives!
        </h2>
        <p className="text-center mt-4 text-lg">
          Rated 5 stars by over 10,000 people!
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {/* Testimonial 1 */}
          <div className="bg-lightGray p-6 rounded-md shadow-md text-center">
            <p className="italic">
              "This guide completely changed my perspective and helped me regain
              control of my life."
            </p>
            <p className="mt-4 font-[700]">- Rohit K</p>
          </div>
          {/* Testimonial 2 */}
          <div className="bg-lightGray p-6 rounded-md shadow-md text-center">
            <p className="italic">
              "The exercises are practical and easy to incorporate into daily
              life. A valuable resource for personal growth!"
            </p>
            <p className="mt-4 font-[700]">- Saurabh R</p>
          </div>
          {/* Testimonial 3 */}
          <div className="bg-lightGray p-6 rounded-md shadow-md text-center">
            <p className="italic">
              "A practical and effective guide to overcoming the freeze
              response."
            </p>
            <p className="mt-4 font-[700]">- Priyanka P</p>
          </div>
          {/* Testimonial 4 */}
          <div className="bg-lightGray p-6 rounded-md shadow-md text-center">
            <p className="italic">
              "The insights in this book have helped me better cope with stress
              and anxiety."
            </p>
            <p className="mt-4 font-[700]">- Raman T</p>
          </div>
          {/* Testimonial 5 */}
          <div className="bg-lightGray p-6 rounded-md shadow-md text-center">
            <p className="italic">
              "An inspiring and practical guide that has made a lasting impact
              on my life."
            </p>
            <p className="mt-4 font-[700]">- Neha M</p>
          </div>
          {/* Testimonial 6 */}
          <div className="bg-lightGray p-6 rounded-md shadow-md text-center">
            <p className="italic">
              "This book offers invaluable tools for achieving inner peace and
              clarity."
            </p>
            <p className="mt-4 font-[700]">- Aditya S</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default HeroSection;

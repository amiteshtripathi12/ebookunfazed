import React from "react";
import Header from "../common/Header";
import TestimonialCard from "../cards/TestimonialCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function FAQSection() {
  const faqsData = [
    {
      id: 0,
      question: "What is the 'Functional Freeze State'?",
      answer:
        "The Functional Freeze State is when you feel stuck in life despite being able to carry out your daily tasks. It’s like being on autopilot—doing what’s needed but feeling emotionally numb, disconnected, or unable to progress. This state often stems from overwhelming stress or unresolved emotions, leaving you functioning but not thriving.",
    },
    {
      id: 1,
      question: "How can this book help me overcome feeling 'stuck'?",
      answer:
        "This book provides practical strategies and insights to help you understand why you feel stuck and how to move forward. Through tried-and-tested techniques from therapy sessions, you’ll learn how to break free from the patterns keeping you in a functional freeze. It’s like having a guide to rediscovering motivation, building emotional resilience, and taking meaningful steps toward a more fulfilling life.",
    },
    {
      id: 2,
      question:
        "Is this book suitable for someone with no prior knowledge of trauma or therapy?",
      answer:
        "Absolutely! This book is written in simple, easy-to-understand language, making it accessible for everyone, regardless of their background. Whether you're new to the concept of trauma or therapy or just looking for practical solutions, it offers step-by-step guidance to help you understand and work through the functional freeze state.",
    },
    {
      id: 3,
      question: "What makes this book different from other self-help books?",
      answer:
        "This book stands out because it's crafted by a therapist who has worked closely with clients facing functional freeze. It combines tried-and-tested strategies with real-world insights, offering practical tools rather than generic advice. Unlike many self-help books, it provides a personalized, hands-on approach to help you actively overcome feeling stuck and regain control of your life.",
    },
  ];

  return (
    <section className="mt-[8rem]">
      <Header subtitle="Frequently asked questions" />
      <div className="p-[4rem]">
        <Accordion type="single" collapsible>
          {faqsData.map((faq) => (
            <AccordionItem key={faq.id} value={`item-${faq.id}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

export default FAQSection;

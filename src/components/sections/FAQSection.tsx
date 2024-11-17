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
        "The 'Functional Freeze State' is a natural response to overwhelming stress where the body and mind can feel immobilized or stuck. Our book explains how this state occurs and provides guidance on moving beyond it.",
    },
    {
      id: 1,
      question: "How can this book help me overcome feeling 'stuck'?",
      answer:
        "This book offers practical tools, self-assessment guides, and exercises to help you understand your freeze triggers and gently work through them, moving towards greater freedom and emotional resilience.",
    },
    {
      id: 2,
      question:
        "Is this book suitable for someone with no prior knowledge of trauma or therapy?",
      answer:
        "Absolutely. The book is written in an accessible way for anyone wanting to understand and heal from freeze responses. It explains concepts simply and offers step-by-step practices suitable for beginners.",
    },
    {
      id: 3,
      question: "What makes this book different from other self-help books?",
      answer:
        "This book focuses specifically on the freeze response, a topic often overlooked. It combines easy-to-understand science with somatic practices, mindfulness, and emotional support techniques designed to help readers break free from immobilization.",
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

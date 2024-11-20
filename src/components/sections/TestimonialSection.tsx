"use client";
import React, {useState} from "react";
import Header from "../common/Header";
import TestimonialCard from "../cards/TestimonialCard";

function TestimonialSection() {
  const appReviewData = [
    {
      id: 0,
      imageUrl: "/images/rayhan.jpg",
      reviewerName: "Aman A",
      review:
        "This book offers a perfect blend of theory and practical exercises, making it easy to understand and apply. The somatic practices and mindfulness exercises are transformative!",
    },
    {
      id: 1,
      imageUrl: "/images/gene.jpg",
      reviewerName: "Kayley F",
      review:
        "Filled with helpful insights and real-life examples, this book provides powerful strategies for overcoming feelings of being ‘stuck’ and reconnecting with oneself.",
    },
    {
      id: 2,
      imageUrl: "/images/gene.jpg",
      reviewerName: "Jasneet K",
      review:
        "The book breaks down complex concepts into manageable sections, making it easy to follow. It offers clear steps for moving beyond immobilization in daily life.",
    },
    {
      id: 3,
      imageUrl: "/images/rayhan.jpg",
      reviewerName: "Allan K",
      review:
        "Practical and accessible, this book demystifies the freeze response and gives me the confidence to apply these techniques in my own healing journey.",
    },
    {
      id: 4,
      imageUrl: "/images/gene.jpg",
      reviewerName: "Sneha S",
      review:
        "An insightful read! The techniques explained here have helped me feel more connected with my body and emotions.",
    },
    {
      id: 5,
      imageUrl: "/images/rayhan.jpg",
      reviewerName: "John D",
      review:
        "The exercises are practical and easy to incorporate into daily life. A valuable resource for personal growth!",
    },
    {
      id: 6,
      imageUrl: "/images/rayhan.jpg",
      reviewerName: "Rohit R",
      review:
        "This book's approach to addressing the freeze response is unique and highly effective.",
    },
    {
      id: 7,
      imageUrl: "/images/gene.jpg",
      reviewerName: "Sophia L",
      review:
        "Engaging and informative, this book has been a valuable tool in my personal journey.",
    },
    {
      id: 8,
      imageUrl: "/images/gene.jpg",
      reviewerName: "Nisha B",
      review:
        "The explanations are clear, and the exercises have made a noticeable difference in my life.",
    },
    {
      id: 9,
      imageUrl: "/images/rayhan.jpg",
      reviewerName: "David H",
      review:
        "Insightful and practical, this book provides powerful strategies for emotional release.",
    },
    {
      id: 10,
      imageUrl: "/images/rayhan.jpg",
      reviewerName: "Anjali C",
      review:
        "A comprehensive guide to understanding and overcoming the freeze response.",
    },
    {
      id: 11,
      imageUrl: "/images/gene.jpg",
      reviewerName: "Emily P",
      review:
        "A must-read for anyone looking to understand the mind-body connection.",
    },
    {
      id: 12,
      imageUrl: "/images/gene.jpg",
      reviewerName: "Aishwarya M",
      review:
        "Clear and concise, this book offers a fresh perspective on managing stress and emotions.",
    },
    {
      id: 13,
      imageUrl: "/images/rayhan.jpg",
      reviewerName: "Michael C",
      review:
        "The author's approach to explaining complex topics is both engaging and accessible.",
    },
    {
      id: 14,
      imageUrl: "/images/rayhan.jpg",
      reviewerName: "Siddharth V",
      review:
        "A practical and effective guide to overcoming the freeze response.",
    },
    {
      id: 15,
      imageUrl: "/images/rayhan.jpg",
      reviewerName: "Lucas W",
      review:
        "The structured approach in this book makes it easy to follow and apply the techniques.",
    },
    {
      id: 16,
      imageUrl: "/images/.jpg",
      reviewerName: "Priya T",
      review:
        "A well-written book that offers valuable insights into overcoming immobilization.",
    },
    {
      id: 17,
      imageUrl: "/images/gene.jpg",
      reviewerName: "Emma B",
      review:
        "The blend of scientific explanation and practical exercises is exceptional.",
    },
    {
      id: 18,
      imageUrl: "/images/rayhan.jpg",
      reviewerName: "Vikas P",
      review:
        "A practical guide that blends theory with exercises that are easy to follow and impactful.",
    },
    {
      id: 19,
      imageUrl: "/images/rayhan.jpg",
      reviewerName: "Olivia K",
      review: "A fantastic read with insightful approaches to managing stress.",
    },
    {
      id: 20,
      imageUrl: "/images/rayhan.jpg",
      reviewerName: "Arjun M",
      review:
        "This book offers practical tools that are easy to integrate into daily routines.",
    },
    {
      id: 21,
      imageUrl: "/images/gene.jpg",
      reviewerName: "Isabella G",
      review:
        "Highly recommend this book for its practical exercises and clear explanations.",
    },
    {
      id: 22,
      imageUrl: "/images/gene.jpg",
      reviewerName: "Sara D",
      review:
        "A fantastic guide with practical exercises that are easy to follow.",
    },
    {
      id: 23,
      imageUrl: "/images/rayhan.jpg",
      reviewerName: "William N",
      review:
        "The insights in this book have helped me better cope with stress and anxiety.",
    },
    {
      id: 24,
      imageUrl: "/images/gene.jpg",
      reviewerName: "Meera P",
      review:
        "Well-structured and insightful, this book has been very helpful in my journey.",
    },
    {
      id: 25,
      imageUrl: "/images/rayhan.jpg",
      reviewerName: "Benjamin J",
      review:
        "An invaluable resource for anyone looking to reconnect with their body.",
    },
    {
      id: 26,
      imageUrl: "/images/gene.jpg",
      reviewerName: "Shreya J",
      review: "An insightful guide with actionable steps for self-healing.",
    },
    {
      id: 27,
      imageUrl: "/images/gene.jpg",
      reviewerName: "Hannah K",
      review: "A great read for those interested in somatic healing practices.",
    },
    {
      id: 28,
      imageUrl: "/images/rayhan.jpg",
      reviewerName: "Rahul K",
      review:
        "An excellent blend of theory and practice for those looking to deepen their self-awareness.",
    },
    {
      id: 29,
      imageUrl: "/images/kayley.jpg",
      reviewerName: "Charlotte S",
      review:
        "A wonderful resource for anyone seeking to understand their body's stress response.",
    },
    {
      id: 30,
      imageUrl: "/images/gene.jpg",
      reviewerName: "Aditi T",
      review:
        "This book offers a fresh perspective on understanding the freeze response.",
    },
    {
      id: 31,
      imageUrl: "/images/alan.jpg",
      reviewerName: "Ethan W",
      review:
        "This book's practical exercises have been a great addition to my daily routine.",
    },
    {
      id: 32,
      imageUrl: "/images/rayhan.jpg",
      reviewerName: "Sanjay D",
      review:
        "A transformative read that dives deep into the mind-body connection.",
    },
    {
      id: 33,
      imageUrl: "/images/gene.jpg",
      reviewerName: "Alice F",
      review:
        "The mindfulness techniques in this book are easy to implement and very helpful.",
    },
    {
      id: 34,
      imageUrl: "/images/gene.jpg",
      reviewerName: "Ritu M",
      review:
        "A comprehensive and user-friendly approach to understanding stress responses.",
    },
    {
      id: 35,
      imageUrl: "/images/rayhan.jpg",
      reviewerName: "Daniel H",
      review:
        "A well-crafted book that provides deep insights into overcoming immobilization.",
    },
  ];

  const [visibleReviews, setVisibleReviews] = useState(8);

  const handleLoadMore = () => {
    setVisibleReviews((prevCount) => prevCount + 8);
  };

  return (
    <section className="mt-[9rem]">
      <Header subtitle="What people are saying about our book" />
      <div className="grid grid-cols-1 gap-16 md:grid-cols-2 mt-8 md:mt-[6.75rem]">
        {appReviewData.slice(0, visibleReviews).map((review) => (
          <TestimonialCard
            key={review.id}
            imageUrl={review.imageUrl}
            review={review.review}
            reviewerName={review.reviewerName}
          />
        ))}
      </div>
      {visibleReviews < appReviewData.length && (
        <div className="flex justify-center mt-8">
          <div className="flex justify-center mt-8">
            <button
              onClick={handleLoadMore}
              className="px-6 py-2 border border-gray-300 text-black rounded-lg hover:bg-gray-100 transition-colors"
            >
              View More Reviews
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default TestimonialSection;

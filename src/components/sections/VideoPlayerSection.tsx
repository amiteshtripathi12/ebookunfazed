"use client";
import React, {useEffect, useRef, useState} from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import MainButton from "../common/MainButton";
// import VideoPlayerControls from "../common/VideoPlayerControls";
import {Button} from "../ui/button";
import Image from "next/image";
import {
  Book,
  CalendarDays,
  Clock,
  GraduationCap,
  UserRound,
} from "lucide-react";
import Header from "../common/Header";

function VideoPlayerSection() {
  const coursesData = [
    {
      title: "Chapter 1: Understanding the Functional Freeze State",
      topics: [
        "Introduction to functional freeze",
        "Freeze, fight, flight, and fawn responses",
        "Unique characteristics of the freeze state",
      ],
    },
    {
      title: "Chapter 2: Recognizing the Signs of Being in Freeze Mode",
      topics: [
        "Signs and symptoms of functional freeze",
        "Numbness, emotional detachment, and feeling stuck",
        "Self-assessment tools for freeze triggers",
      ],
    },
    {
      title:
        "Chapter 3: The Science Behind Freeze: The Nervous System Connection",
      topics: [
        "Sympathetic and parasympathetic nervous systems",
        "The role of the nervous system in the freeze response",
        "Impact of prolonged freeze on mental and physical health",
        "Importance of balancing the nervous system",
      ],
    },
    {
      title:
        "Chapter 4: Reconnecting with Your Body: Somatic Techniques for Release",
      topics: [
        "Body-based practices for releasing freeze",
        "Body scans, grounding exercises, and muscle relaxation",
        "Reconnecting with physical sensations and awareness",
      ],
    },
    {
      title: "Chapter 5: Cultivating Emotional Awareness and Expression",
      topics: [
        "Role of suppressed emotions in freeze",
        "Processing repressed feelings",
        "Expressing emotions through journaling, drawing, and therapy",
      ],
    },
    {
      title:
        "Chapter 6: Building Mind-Body Connection with Mindfulness and Breathwork",
      topics: [
        "Mindful practices to break through immobilization",
        "Breathwork, meditation, and awareness exercises",
        "Developing inner stillness and reducing anxiety",
      ],
    },
    {
      title:
        "Chapter 7: Moving from Freeze to Flow: Physical Activity as Therapy",
      topics: [
        "Physical activities to transition from freeze",
        "Gentle stretching, yoga, and dance",
        "Creating routines for physical and emotional movement",
      ],
    },
    {
      title: "Chapter 8: Self-Compassion and Healing Trauma",
      topics: [
        "Cultivating self-compassion and forgiveness",
        "Healing from past freeze responses",
        "Exercises for self-acceptance and self-care",
      ],
    },
    {
      title: "Chapter 9: Rebuilding Connections and Communicating Your Needs",
      topics: [
        "Impact of freeze on relationships",
        "Rebuilding trust and intimacy",
        "Opening up, setting boundaries, and expressing emotional needs",
      ],
    },
    {
      title:
        "Chapter 10: Beyond Freeze: Developing Resilience for Lasting Growth",
      topics: [
        "Resilience-building practices for lasting growth",
        "Recognizing freeze triggers and preventive actions",
        "Sustaining growth beyond initial healing phase",
      ],
    },
  ];

  const [videoProgress, setVideoProgress] = useState<number>(0);
  const [videoDuration, setVideoDuration] = useState<number>();
  const [isPaused, setIsPaused] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      setVideoDuration(video.duration);
    }
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const currentTime = videoRef.current?.currentTime;
    if (videoDuration != null && currentTime != null) {
      let loadingTimeout = setTimeout(() => {
        if (videoProgress == currentTime / videoDuration) {
          setVideoProgress((prev) => prev + 0.000001);
        } else {
          setVideoProgress(currentTime / videoDuration);
        }
      }, 10);

      return () => {
        clearTimeout(loadingTimeout);
      };
    }
  }, [videoProgress, videoDuration, isPaused]);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (video) {
      setIsPaused(!video.paused);
      video.paused ? video.play() : video.pause();
    }
  };

  return (
    <section className="mt-[6rem]">
      <Header subtitle="About The EBook" />
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 mt-[4rem]">
        <div>
          <p className="text-lightBlue font-bold text-2xl">Our Book Content</p>
          <p className="text-customLightGray text-[1.2rem] mt-4 mb-8">
            Have you ever felt stuck in life—moving through daily routines but
            feeling emotionally numb and disconnected? Imagine feeling trapped
            in the stillness of your own mind—where the body moves through
            routines, yet the soul feels paralyzed, unable to break free.
          </p>

          <Dialog>
            <DialogTrigger asChild>
              {/* <MainButton
                text="Book Now"
                classes="shadow-none w-[10.125rem]"
              /> */}
              <Button className="!h-[3.01544rem] hover:bg-white w-[8.2925rem] text-lightBlue font-bold text-[1rem] rounded-[6.25rem] border-[4px] border-[#EBEAED] bg-white shadow-none">
                Explore
              </Button>
            </DialogTrigger>
            <DialogContent className="fixed left-[50%] top-[60%] w-full max-w-[800px] min-h-[90vh] sm:max-w-[800px] overflow-y-scroll max-h-screen ">
              <DialogHeader>
                <DialogTitle>More About Book</DialogTitle>
              </DialogHeader>

              <div className="p-6 mt-4 border rounded-lg shadow-sm space-y-6">
                <h2 className="text-2xl font-semibold">About the Book</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-4">
                    <CalendarDays color="#ff6600" />
                    <div>
                      <p className="font-semibold">Publish Date</p>
                      <p>08 October 2024</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Clock color="#ff6600" />
                    <div>
                      <p className="font-semibold">Reading Time</p>
                      <p>16hrs | 6 weeks</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <UserRound color="#ff6600" />
                    <div>
                      <p className="font-semibold">Who this book is for</p>
                      <p>
                        For anyone feeling stuck and seeking practical ways to
                        regain emotional balance and move
                        forward with confidence
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Book color="#ff6600" />
                    <div>
                      <p className="font-semibold">Format</p>
                      <p>EBook</p>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700">
                  Have you ever felt stuck in life—moving through daily routines
                  but feeling emotionally numb and disconnected? Imagine feeling
                  trapped in the stillness of your own mind—where the body moves
                  through routines, yet the soul feels paralyzed, unable to
                  break free. Functional Freeze delves into this silent struggle
                  that many experience but few can articulate. Break Free From
                  Functional Freeze uncovers this hidden state, where your mind
                  and emotions feel paralyzed even though your body keeps going.
                  Created by a therapist who has worked with numerous clients
                  facing the same struggle, this book combines relatable
                  stories, practical solutions, and insights rooted in
                  psychology. With tried-and-tested strategies and a
                  compassionate approach, it offers you the tools to heal, break
                  free from the cycle, and rediscover a life full of purpose,
                  connection, and joy.
                </p>
              </div>

              <div className="flex flex-col items-center justify-center mt-4">
                <h2 className="text-2xl font-semibold">What you'll learn</h2>
                <div className="mt-8">
                  <h2 className="text-xl font-bold mb-4">Book's Objective</h2>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="mr-2">—</span>
                      <span>
                        Understand the concept of functional freeze and its
                        impact on daily life.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">—</span>
                      <span>
                        Explore real-life examples and insights from a
                        therapist’s experience.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">—</span>
                      <span>
                        Learn practical, tried-and-tested strategies to break
                        free from emotional paralysis.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">—</span>
                      <span>
                        Develop tools to regain control, resilience, and
                        emotional clarity.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">—</span>
                      <span>
                        Build a personalized path toward lasting mental and
                        emotional well-being.
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="w-[77%] mt-8">
                  <h2 className="text-xl font-bold mb-2">Book RoadMap</h2>
                  <Accordion type="single" collapsible>
                    {coursesData.map((course, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-[1rem] font-[600]">
                          {course.title}
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="list-none pl-5 space-y-2">
                            {course.topics.map((topic, topicIndex) => (
                              <li key={topicIndex} className="relative pl-4">
                                <span className="absolute left-0 top-0 text-xl text-orange-500">
                                  •
                                </span>
                                {topic}
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex justify-center items-center w-[90%] max-w-4xl max-h-[28rem] mx-auto my-8 rounded-xl">
          <img
            src="/images/book.png"
            alt="book_image"
            className="w-full max-w-[80%] h-auto max-h-[80%] object-contain rounded-xl"
          />
        </div>
      </div>
    </section>
  );
}

export default VideoPlayerSection;

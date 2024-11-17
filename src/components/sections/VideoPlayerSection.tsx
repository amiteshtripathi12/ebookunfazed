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
    <section className="flex flex-col md:flex-row justify-between items-center gap-8 mt-[11.31rem]">
      <div>
        <p className="text-lightBlue font-bold text-2xl">Our Book Content</p>
        <p className="text-customLightGray text-[1.2rem] mt-4 mb-8">
          A transformative guide designed to help you reconnect with yourself
          and move forward with clarity and resilience.
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
                      For anyone seeking emotional healing and self-awareness
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Book color="#ff6600" />
                  <div>
                    <p className="font-semibold">Format</p>
                    <p>eBook</p>
                  </div>
                </div>
              </div>

              <p className="text-gray-700">
                *Healing from the Functional Freeze State* is a transformative
                guide that helps you understand and overcome the immobilizing
                effects of stress and trauma. Whether you are someone who has
                experienced emotional numbness or simply looking to regain a
                deeper connection with your body and mind, this book offers
                practical techniques, exercises, and expert insights to support
                your healing journey. It’s designed for those who want to break
                free from the freeze response and regain emotional balance,
                offering tools that can be applied immediately for lasting
                change.
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
                      Understand how the body responds with immobilization in
                      stressful situations
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">—</span>
                    <span>
                      Recognize the signs and symptoms of functional freeze,
                      including numbness and emotional detachment
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">—</span>
                    <span>
                      Learn somatic techniques for releasing the freeze state,
                      such as grounding exercises and body scans
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">—</span>
                    <span>
                      Cultivate emotional awareness and expression through
                      journaling and self-reflection
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">—</span>
                    <span>
                      Use mindfulness and breathwork to overcome the
                      immobilization of the freeze state
                    </span>
                  </li>
                </ul>
              </div>

              <div className="w-[77%] mt-8">
                <h2 className="text-xl font-bold mb-2">Book Roadmap</h2>
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
          src="/images/book_image.jpg"
          alt="book_image"
          className="w-full max-w-[80%] h-auto max-h-[80%] object-contain rounded-xl"
        />
      </div>
    </section>
  );
}

export default VideoPlayerSection;

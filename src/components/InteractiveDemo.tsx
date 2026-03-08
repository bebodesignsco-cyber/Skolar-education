"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

/**
 * Easily update this URL when the final video is ready.
 * Supports YouTube, Vimeo, or direct video file links.
 */
const VIDEO_URL = "https://www.youtube.com/embed/dQw4w9WgXcQ"; 

export const InteractiveDemo = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="container mx-auto px-4 py-24">
      <div className="flex flex-col items-center text-center mb-16">
        <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-6">
          Experience the Skolar difference
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl">
          See how our AI provides examiner-grade feedback in seconds. Watch our demo to see Skolar in action.
        </p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative mx-auto max-w-5xl"
      >
        {/* Video Container with StudyFetch-style aesthetic */}
        <div className="relative aspect-video overflow-hidden rounded-[2.5rem] border-8 border-white shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] bg-slate-100 ring-1 ring-slate-200">
          
          {!isPlaying ? (
            /* Placeholder / Thumbnail State */
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200">
              {/* Interactive Play Button Area */}
              <button 
                onClick={() => setIsPlaying(true)}
                className="group flex flex-col items-center outline-none focus:ring-4 focus:ring-primary/20 rounded-3xl p-8 transition-all"
                aria-label="Play Demo Video"
              >
                <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center shadow-2xl shadow-primary/40 group-hover:scale-110 group-active:scale-95 transition-all duration-300">
                  <Play className="w-10 h-10 fill-white text-white ml-1" />
                </div>
                <div className="mt-8 text-center">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Watch a Demo</h3>
                  <p className="text-slate-500 font-medium">Click to see how it works</p>
                </div>
              </button>
              
              {/* 
                PRO TIP: When you have a real thumbnail image, uncomment the line below 
                and add your image to the public folder.
              */}
              {/* <img src="/demo-thumbnail.png" alt="Skolar Demo" className="absolute inset-0 w-full h-full object-cover -z-10" /> */}
            </div>
          ) : (
            /* Actual Video Embed State */
            <iframe
              className="w-full h-full"
              src={`${VIDEO_URL}${VIDEO_URL.includes('?') ? '&' : '?'}autoplay=1`}
              title="Skolar Demo Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
        </div>

        {/* Decorative background glows - adding that premium feel */}
        <div className="absolute -z-10 -top-12 -right-12 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute -z-10 -bottom-12 -left-12 w-64 h-64 bg-blue-400/10 rounded-full blur-[100px]" />
      </motion.div>
    </section>
  );
};

"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const imgBoxVariants = {
  hidden: {
    x: 500,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.5,
    },
  },
};
export const AuthImageSlider = () => {
  const images = [
    {
      src: "/auth-image-slider/slider-1.png",
      alt: "image1",
      description: "Jadwalkan pekerjaan Anda",
    },
    {
      src: "/auth-image-slider/slider-2.png",
      alt: "image2",
      description: "Fleksible dan akuntabel",
    },
    {
      src: "/auth-image-slider/slider-3.png",
      alt: "image3",
      description: "Kelola pekerjaan Anda dengan Kerjatim",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to go to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 3000); // Transition every 3 seconds

    return () => {
      // Clear the interval when the component unmounts
      clearInterval(slideInterval);
    };
  }, [currentIndex, nextSlide]);

  return (
    <div className="flex h-full flex-col items-center justify-between gap-8 overflow-hidden">
      <div className="flex h-full w-full">
        <AnimatePresence initial={false}>
          {images.map(
            (image, index) =>
              index === currentIndex && (
                <motion.img
                  key={index}
                  initial={{
                    x: "100%",
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    maxWidth: "700px",
                    alignSelf: "center",
                    marginLeft: "66px",
                  }}
                  animate={{
                    x: "0%",
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    maxWidth: "700px",
                    alignSelf: "center",
                    marginLeft: "66px",
                  }}
                  exit={{
                    x: "-100%",
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    maxWidth: "700px",
                    alignSelf: "center",
                    marginLeft: "66px",
                  }}
                  transition={{ duration: 0.6 }}
                  src={image.src}
                  alt={`Image ${index + 1}`}
                />
              ),
          )}
        </AnimatePresence>
      </div>

      {/* caption */}
      <p className="text-2xl">{images[currentIndex].description}</p>

      {/* pagination */}
      <div className="flex items-center justify-center gap-3">
        {images.map((_, index) => (
          <span
            key={index}
            className={`h-3 w-3 cursor-pointer rounded-full bg-white ${
              index === currentIndex ? "opacity-100" : "opacity-50"
            }`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

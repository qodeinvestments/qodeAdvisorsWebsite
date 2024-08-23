import React from "react";
import { motion } from "framer-motion";




export const BackgroundSVG = () => {
    const width = 900;
    const height = 434;
    return (
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="-z-5 inset-10"
      >
        <path
          d="M269 220.5H16.5C10.9772 220.5 6.5 224.977 6.5 230.5V398.5"
          stroke="var(--slate-800)"
        />
        <path
          d="M568 200H841C846.523 200 851 195.523 851 190V40"
          stroke="var(--slate-800)"
        />
        <path
          d="M425.5 274V333C425.5 338.523 421.023 343 415.5 343H152C146.477 343 142 347.477 142 353V426.5"
          stroke="var(--slate-800)"
        />
        <path
          d="M493 274V333.226C493 338.749 497.477 343.226 503 343.226H760C765.523 343.226 770 347.703 770 353.226V427"
          stroke="var(--slate-800)"
        />
        <path
          d="M380 168V17C380 11.4772 384.477 7 390 7H414"
          stroke="var(--slate-800)"
        />
  
        {/* Gradient Beams */}
  
        <path
          d="M269 220.5H16.5C10.9772 220.5 6.5 224.977 6.5 230.5V398.5"
          stroke="url(#grad1)"
          strokeLinecap="round"
          strokeWidth="2"
        />
        <path
          d="M568 200H841C846.523 200 851 195.523 851 190V40"
          stroke="url(#grad2)"
        />
        <path
          d="M425.5 274V333C425.5 338.523 421.023 343 415.5 343H152C146.477 343 142 347.477 142 353V426.5"
          stroke="url(#grad3)"
        />
        <path
          d="M493 274V333.226C493 338.749 497.477 343.226 503 343.226H760C765.523 343.226 770 347.703 770 353.226V427"
          stroke="url(#grad4)"
        />
        <path
          d="M380 168V17C380 11.4772 384.477 7 390 7H414"
          stroke="url(#grad5)"
        />
  
        <defs>
          <motion.linearGradient
            animate={{
              x1: [0, width * 1.2],
              x2: [0, width],
              y1: [height, height / 2],
              y2: [height * 1.2, height],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 2,
            }}
            gradientUnits="userSpaceOnUse"
            id="grad1"
          >
            <GradientColors />
          </motion.linearGradient>
          <motion.linearGradient
            animate={{
              x1: [0, width * 1.2],
              x2: [0, width],
              y1: [height, height / 2],
              y2: [height * 1.2, height],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 3,
            }}
            id="grad2"
          >
            <GradientColors />
          </motion.linearGradient>
          <motion.linearGradient
            animate={{
              x1: [0, width * 1.2],
              x2: [0, width],
              y1: [height, height / 2],
              y2: [height * 1.2, height],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 2,
            }}
            gradientUnits="userSpaceOnUse"
            id="grad3"
          >
            <GradientColors />
          </motion.linearGradient>
          <motion.linearGradient
            animate={{
              x1: [0, width * 1.2],
              x2: [0, width],
              y1: [height, height / 2],
              y2: [height * 1.2, height],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 2,
            }}
            gradientUnits="userSpaceOnUse"
            id="grad4"
          >
            <GradientColors />
          </motion.linearGradient>
          <motion.linearGradient
            animate={{
              x1: [0, width * 1.2],
              x2: [0, width],
              y1: [height, height / 2],
              y2: [height * 1.2, height],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 2,
            }}
            gradientUnits="userSpaceOnUse"
            id="grad5"
          >
            <GradientColors />
          </motion.linearGradient>
        </defs>
        <circle
          cx="851"
          cy="34"
          r="6.5"
          fill="var(--slate-700)"
          stroke="var(--slate-600)"
        />
        <circle
          cx="770"
          cy="427"
          r="6.5"
          fill="var(--slate-700)"
          stroke="var(--slate-600)"
        />
        <circle
          cx="142"
          cy="427"
          r="6.5"
          fill="var(--slate-700)"
          stroke="var(--slate-600)"
        />
        <circle
          cx="6.5"
          cy="398.5"
          r="6"
          fill="var(--slate-700)"
          stroke="var(--slate-600)"
        />
        <circle
          cx="420.5"
          cy="6.5"
          r="6"
          fill="var(--slate-700)"
          stroke="var(--slate-600)"
        />
      </svg>
    );
  };
  const GradientColors = () => {
    return (
      <>
        <stop stopColor="#18CCFC" stopOpacity="0"></stop>
        <stop stopColor="#18CCFC"></stop>
        <stop offset="0.325" stopColor="#6344F5"></stop>
        <stop offset="1" stopColor="#AE48FF" stopOpacity="0"></stop>
      </>
    );
  };
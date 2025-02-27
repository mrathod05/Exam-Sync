"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";

const HomePage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 flex flex-col items-center justify-center p-6">
      <div className="flex flex-col items-center mb-12">
        <Image
          src="/app_logo.jpg"
          alt="Exam Sync Logo"
          width={160}
          height={160}
          className="mb-4 drop-shadow-xl rounded-lg"
        />
        <h1 className="text-5xl font-extrabold text-gray-900 drop-shadow-md">
          Exam Sync
        </h1>
        <p className="text-gray-700 text-lg mt-2 text-center max-w-xl leading-relaxed">
          Seamlessly manage and conduct exams with real-time monitoring and
          intuitive controls.
        </p>
      </div>

      <motion.p
        className="text-lg text-gray-600 mb-8 text-center max-w-md leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Choose your role to proceed
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-lg">
        <motion.button
          className="p-6 w-full bg-blue-600 text-white rounded-xl text-lg font-semibold shadow-lg hover:bg-blue-700 transform transition-all duration-200 hover:scale-105 active:scale-95"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/examiner")}
        >
          Examiner
        </motion.button>

        <motion.button
          className="p-6 w-full bg-green-600 text-white rounded-xl text-lg font-semibold shadow-lg hover:bg-green-700 transform transition-all duration-200 hover:scale-105 active:scale-95"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/student")}
        >
          Student
        </motion.button>
      </div>
    </div>
  );
};

export default HomePage;

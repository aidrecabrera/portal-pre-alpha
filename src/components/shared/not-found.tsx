import { Button } from "@/components/ui/button";
import { motion, useAnimationControls, Variants } from "framer-motion";
import { useEffect, useState } from "react";

export const NotFoundComponent = () => {
  const controls = useAnimationControls();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.05 },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const numberVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-between min-h-screen p-4 sm:p-6 md:p-8 bg-gradient-to-br from-background via-background to-secondary/5"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-col items-center justify-center flex-grow w-full max-w-4xl mx-auto">
        <motion.div
          className="relative mb-4 sm:mb-6"
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          <motion.h1
            className="text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] font-bold text-primary dark:text-primary-foreground tracking-tighter pointer-events-none select-none"
            variants={numberVariants}
            animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            404
          </motion.h1>
          <motion.div
            className="absolute inset-0 bg-primary/5 blur-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 0.7 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
        <motion.h2
          className="mb-4 text-xl font-medium text-center sm:text-2xl md:text-3xl"
          variants={itemVariants}
        >
          Page Not Found
        </motion.h2>
        <motion.p
          className="max-w-xs mb-6 text-sm text-center sm:mb-8 sm:text-base sm:max-w-sm md:max-w-md text-muted-foreground"
          variants={itemVariants}
        >
          The page you're looking for doesn't exist or has been moved.
        </motion.p>
        <motion.div variants={itemVariants}>
          <Button
            className="px-4 py-2 text-sm sm:px-6 sm:py-3 sm:text-base"
            variant="outline"
            onClick={() => window.history.back()}
          >
            Go Back
          </Button>
        </motion.div>
      </div>
      <motion.div
        className="mt-4 text-xs text-center sm:text-sm text-foreground sm:mt-4"
        variants={itemVariants}
      >
        <div className="flex flex-col items-center justify-center">
          <div>
            <img
              src="/public/cjc.png"
              alt="Cor Jesu
              College"
              className="mb-4 size-16"
            />
          </div>
        </div>
        <p className="mb-2">
          Cor Jesu College, Inc. • Aidre Cabrera Copyright © 2024. All Rights
          Reserved.
        </p>
        <p>
          <a href="#" className="hover:underline">
            Terms of Use
          </a>{" "}
          |{" "}
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
        </p>
      </motion.div>
    </motion.div>
  );
};

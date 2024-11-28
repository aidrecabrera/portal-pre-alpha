import {
  AnnouncementsSection,
  QuickActions,
  RecentTransactions,
  WeekClass,
  WelcomeSection,
} from "@/features/authenticated/index/component/dashboard";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/_authenticated/")({
  component: Dashboard,
});

function Dashboard() {
  const [formattedDate, setFormattedDate] = useState("");
  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-US", {
      dateStyle: "long",
      timeStyle: "short",
    });
    const updateTime = () => {
      setFormattedDate(formatter.format(new Date()));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <motion.div
      className="gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="grid grid-cols-12 gap-4">
        <motion.div
          className="flex flex-col col-span-6 col-start-1 gap-4"
          variants={itemVariants}
        >
          <motion.div className="col-span-6" variants={itemVariants}>
            <WelcomeSection formattedDate={formattedDate} />
          </motion.div>
          <motion.div className="h-auto col-span-3" variants={itemVariants}>
            <AnnouncementsSection />
          </motion.div>
          <motion.div className="h-auto col-span-6" variants={itemVariants}>
            <WeekClass />
          </motion.div>
        </motion.div>
        <motion.div
          className="flex flex-col col-span-6 col-start-7 row-start-1 gap-4"
          variants={itemVariants}
        >
          <motion.div variants={itemVariants}>
            <QuickActions />
          </motion.div>
          <motion.div className="space-y-4 " variants={itemVariants}>
            <RecentTransactions />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

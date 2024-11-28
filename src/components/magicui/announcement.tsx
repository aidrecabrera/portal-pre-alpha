import { cn } from "@/lib/utils";
import { Megaphone } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import { Card } from "../ui/card";
import { MarkdownComponent } from "./../shared/markdown-component";
import BlurFade from "./blur-fade";

const AnnouncementGrid = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <motion.div
      variants={listVariants}
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

const AnnouncementBanner = ({
  title,
  content,
}: {
  title: string;
  content: string;
  className?: string;
}) => (
  <Card className="flex flex-col sm:flex-row justify-between p-4 sm:p-8 border-none rounded-lg group text-primary-foreground bg-primary [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]">
    <div className="flex flex-col items-start justify-between transition-all duration-300 ease-out">
      <div>
        <h1 className="inline-flex items-center gap-2 mb-2 text-2xl font-bold sm:text-3xl">
          {title}
        </h1>
        <p className="text-sm dark:text-muted-foreground">{content}</p>
        <p className="mt-2 text-sm dark:text-muted-foreground">
          Stay informed to make the most of your academic journey!
        </p>
      </div>
    </div>
    <BlurFade delay={0.25}>
      <div className="w-[150px] sm:w-[250px] pointer-events-none mt-4 sm:mt-0">
        <div className="relative pt-4 transition-all duration-300 ease-out rounded-tr-none sm:absolute rounded-tl-md sm:-right-8 sm:-top-8">
          <motion.div
            initial={{ rotate: 45, scale: 0.5 }}
            animate={{
              rotate: [45, 55, 35, 45],
              scale: [0.8, 1, 0.9, 1],
            }}
            transition={{
              duration: 0.75,
              ease: "easeInOut",
            }}
          >
            <Megaphone className="w-24 h-24 opacity-100 sm:w-36 sm:h-36" />
          </motion.div>
        </div>
      </div>
    </BlurFade>
  </Card>
);

const AnnouncementCard = ({
  title,
  date,
  content,
  className,
}: {
  title: string;
  date: string;
  content: string;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    className={cn(
      "flex group mb-4 flex-col w-full justify-between overflow-hidden rounded-xl",
      "bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
      "dark:bg-card dark:text-primary-foreground",
      "hover:shadow-lg transition-shadow duration-300",
      className
    )}
  >
    <div className="z-10 flex flex-col p-5">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <MarkdownComponent content={content} />
    </div>
  </motion.div>
);
export { AnnouncementBanner, AnnouncementCard, AnnouncementGrid };

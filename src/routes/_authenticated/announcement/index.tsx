import {
  AnnouncementBanner,
  AnnouncementCard,
  AnnouncementGrid,
} from "@/components/magicui/announcement";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import { useState } from "react";

const announcements = [
  {
    id: 1,
    title: "Attention to all students - New Updates!",
    date: "8/15/2024",
    content:
      "You can now toggle live streaming for Runtime Logs to update every ~5 seconds without clearing existing logs or manual refreshes.",
  },
  {
    id: 2,
    title: "Guide for Students - Important Changes",
    date: "8/15/2023",
    content:
      "We've revamped the Account Settings with a new, intuitive navigation structure by breaking down into three different sections - Overview, Activity, and Settings. The Overview page now offers a quick snapshot of your teams and domains, including the option to request access to teams you're not part of. The Activity page presents a chronological list of events for the last 12 months. The Settings page consolidates all user-specific options, including authentication, billing, and access tokens. This streamlined layout aims to enhance clarity and simplify account management for all users.",
  },
];

const AnnouncementContent =
  "Important updates and information on schedules, events, and deadlines.";

export const Route = createFileRoute("/_authenticated/announcement/")({
  component: AnnouncementPage,
});

function AnnouncementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "recent" | "oldest">("all");

  const handleFilterChange = (newFilter: "all" | "recent" | "oldest") => {
    setFilter(newFilter);
  };

  const sortedAnnouncements = [...announcements].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    if (filter === "recent") {
      return dateB - dateA;
    } else if (filter === "oldest") {
      return dateA - dateB;
    }
    return 0;
  });

  return (
    <div>
      <div className="mb-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{
            opacity: 0,
            y: -20,
            transition: { duration: 0.3, ease: "easeOut" },
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <AnnouncementBanner
            title={"Announcements"}
            content={AnnouncementContent}
          />
        </motion.div>
        <motion.div
          className="flex flex-col items-end justify-start gap-2 mt-4 sm:flex-row sm:items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <motion.div
            className="relative w-full sm:w-64"
            initial={{ scale: 1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Input
              type="text"
              placeholder="Search announcements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2 pl-10 pr-4"
            />
            <Search
              className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2"
              size={18}
            />
          </motion.div>
          {["all", "recent", "oldest"].map((buttonFilter, index) => (
            <motion.div
              key={buttonFilter}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
            >
              <Button
                onClick={() =>
                  handleFilterChange(
                    buttonFilter as "all" | "recent" | "oldest"
                  )
                }
                variant={filter === buttonFilter ? "default" : "outline"}
              >
                {buttonFilter.charAt(0).toUpperCase() + buttonFilter.slice(1)}
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <AnimatePresence>
        <AnnouncementLogs
          searchTerm={searchTerm}
          announcements={sortedAnnouncements}
        />
      </AnimatePresence>
    </div>
  );
}
const MotionAnnouncementGrid = motion(AnnouncementGrid);

export const AnnouncementLogs = ({
  searchTerm,
  announcements,
}: {
  searchTerm: string;
  announcements: Array<{
    id: number;
    title: string;
    date: string;
    content: string;
  }>;
}) => {
  const filteredAnnouncements = announcements.filter(
    (announcement) =>
      announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      announcement.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MotionAnnouncementGrid
      initial="hidden"
      animate="visible"
      className="grid md:grid-cols-2 lg:grid-cols-3"
    >
      {filteredAnnouncements.map((announcement, index) => (
        <div
          key={announcement.id}
          className="flex flex-row gap-4 col-span-full"
        >
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="w-32 mt-6 text-sm text-right text-muted-foreground"
          >
            {announcement.date}
          </motion.p>
          <div
            className={index === filteredAnnouncements.length - 1 ? "mb-4" : ""}
          >
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{
                duration: 0.3,
                delay: index * 0.3,
                ease: "linear",
              }}
              style={{ height: "100%", transformOrigin: "top" }}
            >
              <Separator orientation="vertical" className="h-full" />
            </motion.div>
          </div>
          <AnnouncementCard
            title={announcement.title}
            date={announcement.date}
            content={announcement.content}
          />
        </div>
      ))}
    </MotionAnnouncementGrid>
  );
};

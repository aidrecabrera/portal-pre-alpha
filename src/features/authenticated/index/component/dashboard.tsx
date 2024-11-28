import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import NumberTicker from "@/components/magicui/number-ticker";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BookOpen,
  CalendarCheck,
  CalendarDots,
  Exam,
  Money,
  Moon,
  Sun,
  SunHorizon,
} from "@phosphor-icons/react";
import { ArrowDownIcon, ArrowRightLeft, ArrowUpIcon, Bell } from "lucide-react";
import React, { useState } from "react";

const WelcomeSection: React.FC<{ formattedDate: string }> = ({
  formattedDate,
}) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
      return {
        text: "Good morning",
        icon: <Sun className="w-8 h-8 animate-pulse" />,
      };
    }
    if (hour < 18) {
      return {
        text: "Good afternoon",
        icon: <SunHorizon className="w-8 h-8 animate-pulse" />,
      };
    }
    return {
      text: "Good evening",
      icon: <Moon className="w-8 h-8 animate-pulse" />,
    };
  };

  const { text: greeting, icon } = getGreeting();

  return (
    <Card className="flex flex-row justify-between p-8 border-none rounded-lg group text-primary-foreground bg-primary [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]">
      <div className="flex flex-col items-start justify-between transition-all duration-300 ease-out ">
        <div>
          <p className="text-sm opacity-90">{formattedDate}</p>
        </div>
        <div>
          <div>
            <h1 className="inline-flex items-center gap-2 text-xl font-semibold text-card-primary dark:text-neutral-300">
              {greeting}, Aidre Love {icon}
            </h1>
          </div>
          <div>
            <p className="max-w-lg text-sm text-card-primary dark:text-neutral-400">
              Ametur Cor Jesu, Ametur Cor Mariae!
            </p>
          </div>
        </div>
      </div>
      <div>
        <div className="relative w-[250px] pointer-events-none">
          <div className="absolute rounded-tl-md -top-10 -right-8 rounded-tr-none origin-top   transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)]">
            <img className="w-64 h-64" src="/public/cjc.png" alt="Logo" />
          </div>
        </div>
      </div>
    </Card>
  );
};

const QuickActions: React.FC = () => {
  const actions = [
    {
      Icon: CalendarCheck,
      name: "Schedules",
      description: "View your schedules",
      to: "/classes",
      cta: "View Schedules",
      background: (
        <Calendar
          mode="single"
          selected={new Date(2022, 4, 11, 0, 0, 0)}
          className="absolute hidden rounded-tl-md rounded-tr-none lg:block -right-2 top-10 origin-top  border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-105"
        />
      ),
      className:
        "col-span-4 md:col-span-2 md:row-start-1 lg:col-span-2 lg:row-span-2",
    },
    {
      Icon: BookOpen,
      name: "Courses",
      description: null,
      to: "/",
      cta: "View Courses",
      background: (
        <div className="relative">
          <img className="absolute -right-20 -top-20 opacity-60" />
        </div>
      ),
      className:
        "col-span-4 md:col-span-2 md:row-start-1 lg:col-span-1 lg:row-span-1",
    },
    {
      Icon: Exam,
      name: "Grades",
      description: null,
      to: "/student/records",
      cta: "View Grades",
      background: <img className="absolute -right-20 -top-20 opacity-60" />,
      className:
        "col-span-4 md:col-span-2 md:row-start-2 lg:col-span-1 lg:row-span-1",
    },
    {
      Icon: Money,
      name: "Finance",
      description: null,
      to: "/",
      cta: "View Financal Records",
      background: (
        <Card className="absolute dark:border dark:border-white/25 hidden h-52 rounded-tr-none lg:block -right-1 top-5 origin-top border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-105">
          <CardHeader>
            <h1 className="inline-flex text-2xl font-medium tracking-tight">
              ₱ <NumberTicker value={12300.56} delay={0} />
            </h1>
            <p>Current Balance</p>
          </CardHeader>
        </Card>
      ),
      className:
        "col-span-4 md:col-span-2 md:row-start-2 lg:col-span-2 lg:col-start-3 lg:row-span-1",
    },
  ];

  return (
    <motion.div>
      <BentoGrid className="grid-cols-4 grid-rows-4 text-xs md:grid-rows-2">
        {actions.map((action) => (
          <BentoCard key={action.name} {...action} />
        ))}
      </BentoGrid>
    </motion.div>
  );
};

import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";

const WeekClass: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<
    "today" | "weekly" | "full"
  >("today");
  const [selectedDay, setSelectedDay] = useState<string | null>(
    new Date().toLocaleString("en-us", { weekday: "short" }).slice(0, 3)
  );
  const scheduleData = [
    {
      day: "Mon",
      time: "8:00A-11:00A",
      subject: "Project Management",
      title: "",
      room: "N/A",
    },
    {
      day: "Wed",
      time: "8:00A-11:00A",
      subject: "Project Management",
      title: "",
      room: "N/A",
    },
    {
      day: "Tue",
      time: "3:00P-7:00P",
      subject: "Human Computer Interaction with Robotics",
      title: "",
      room: "N/A",
    },
    {
      day: "Thu",
      time: "3:00P-7:00P",
      subject: "Human Computer Interaction with Robotics",
      title: "",
      room: "N/A",
    },
  ];

  const today = new Date()
    .toLocaleString("en-us", { weekday: "short" })
    .slice(0, 3);
  const filteredSchedule = selectedDay
    ? scheduleData.filter((item) => item.day === selectedDay)
    : selectedOption === "today"
      ? scheduleData.filter((item) => item.day === today)
      : scheduleData;

  const fullSchedule = scheduleData.sort(
    (a, b) => a.day.localeCompare(b.day) || a.time.localeCompare(b.time)
  );

  const handleOptionChange = (value: string) => {
    if (value === "today" || value === "weekly" || value === "full") {
      setSelectedOption(value);
      if (value === "today") {
        setSelectedDay(null);
      }
    }
  };
  const handleDayClick = (day: string) => {
    setSelectedDay(day);
    setSelectedOption("weekly");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
        delayChildren: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <Card className="[box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] border-none pb-3">
        <div className="grid grid-rows-[auto,1fr]">
          <div className="row-start-1">
            <CardHeader className="flex flex-col items-start justify-between pb-2 space-y-2">
              <motion.div variants={itemVariants}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedOption}
                    initial={{ opacity: 0, y: 1 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -1 }}
                    transition={{ duration: 0.3 }}
                    className="text-xl font-semibold text-neutral-700 dark:text-neutral-300"
                  >
                    <CalendarDots className="inline mr-2" />
                    {selectedOption === "full"
                      ? "Full"
                      : selectedOption === "today"
                        ? "Today's"
                        : "Weekly"}{" "}
                    Schedule
                  </motion.div>
                </AnimatePresence>
              </motion.div>
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap items-center gap-2"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedOption}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-16 whitespace-nowrap"
                        >
                          {selectedOption === "today"
                            ? "Today"
                            : selectedOption === "weekly"
                              ? "Weekly"
                              : "General"}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Schedule View</DropdownMenuLabel>
                        <DropdownMenuRadioGroup
                          value={selectedOption}
                          onValueChange={handleOptionChange}
                        >
                          <DropdownMenuRadioItem value="today">
                            Today
                          </DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="weekly">
                            Weekly
                          </DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="full">
                            General
                          </DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </motion.div>
                </AnimatePresence>
                {selectedOption !== "full" && (
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-wrap items-center gap-2"
                    >
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                        (day, index) => (
                          <motion.div
                            key={index}
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            custom={index}
                          >
                            <Button
                              variant={
                                selectedDay === day ? "default" : "outline"
                              }
                              size="sm"
                              onClick={() => handleDayClick(day)}
                              className={`w-14 whitespace-nowrap ${day === today ? "ring-1 ring-primary border-none" : ""}`}
                            >
                              {day}
                            </Button>
                          </motion.div>
                        )
                      )}
                    </motion.div>
                  </AnimatePresence>
                )}
              </motion.div>
            </CardHeader>
          </div>
          <motion.div
            layout
            className="row-start-2 overflow-hidden"
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedOption + (selectedDay || "")}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{
                  duration: 0.3,
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              >
                <CardContent>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedOption + (selectedDay || "")}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{
                        duration: 0.3,
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                      className="mt-1"
                    >
                      <motion.div layout transition={{ duration: 0.3 }}>
                        {(selectedOption === "full"
                          ? fullSchedule
                          : filteredSchedule
                        ).length > 0 ? (
                          <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="space-y-2"
                          >
                            {(selectedOption === "full"
                              ? fullSchedule
                              : filteredSchedule
                            ).map((item, index) => (
                              <motion.div
                                key={index}
                                variants={itemVariants}
                                className={`p-3 transition-colors rounded-lg shadow-sm ${
                                  selectedOption === "full"
                                    ? "bg-muted hover:bg-muted/80"
                                    : "hover:bg-secondary bg-secondary/50 text-secondary-foreground"
                                }`}
                              >
                                <div className="flex items-center justify-between mb-1">
                                  <p className="text-sm font-semibold">
                                    {item.subject}
                                  </p>
                                  <Badge
                                    variant={
                                      selectedOption === "full"
                                        ? "outline"
                                        : "default"
                                    }
                                    className="text-xs"
                                  >
                                    {selectedOption === "full"
                                      ? `${item.day} ${item.time}`
                                      : item.time}
                                  </Badge>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                  Room: {item.room || "TBA"}
                                </p>
                              </motion.div>
                            ))}
                          </motion.div>
                        ) : (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-4 text-center text-muted-foreground"
                          >
                            No classes scheduled for{" "}
                            {selectedOption === "today"
                              ? "today"
                              : selectedDay
                                ? selectedDay
                                : "this week"}
                            .
                          </motion.p>
                        )}
                      </motion.div>
                    </motion.div>
                  </AnimatePresence>
                </CardContent>
                {selectedOption !== "full" && (
                  <CardFooter className="justify-center">
                    <motion.div variants={itemVariants}>
                      <Button
                        variant="link"
                        size="sm"
                        onClick={() => setSelectedOption("full")}
                      >
                        See full schedule
                      </Button>
                    </motion.div>
                  </CardFooter>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
};

const RecentTransactions: React.FC = () => {
  const transactions = [
    { label: "Tuition Payment", amount: -25000, date: new Date(2023, 4, 15) },
    { label: "Lab Fee", amount: -2500, date: new Date(2023, 4, 16) },
    { label: "Book Purchase", amount: -3750, date: new Date(2023, 4, 17) },
    { label: "Cafeteria Credit", amount: 5000, date: new Date(2023, 4, 18) },
    { label: "Parking Pass", amount: -3000, date: new Date(2023, 4, 19) },
  ];

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
    }).format(Math.abs(amount));
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="-mb-4">
        <CardTitle className="inline-flex text-xl font-semibold text-neutral-700 dark:text-neutral-300">
          <ArrowRightLeft className="mr-2" /> Announcements
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-y-auto">
          {transactions.map((transaction, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 + 0.5 }}
            >
              <div className="flex items-center justify-between px-6 py-4 transition-colors border-b hover:bg-muted/50 last:border-b-0">
                <div className="flex items-center space-x-4">
                  <div
                    className={`p-2 rounded-full ${transaction.amount < 0 ? "bg-red-100" : "bg-green-100"}`}
                  >
                    {transaction.amount < 0 ? (
                      <ArrowDownIcon className="w-5 h-5 text-red-500" />
                    ) : (
                      <ArrowUpIcon className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold">{transaction.label}</h3>
                    <p className="text-sm text-muted-foreground">
                      {format(transaction.date, "MMM d, yyyy")}
                    </p>
                  </div>
                </div>
                <span className="text-lg font-bold text-neutral-700 dark:text-neutral-300">
                  {transaction.amount < 0 ? "-" : "+"}
                  {formatAmount(transaction.amount)}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const AnnouncementsSection: React.FC = () => (
  <Card
    className={cn(
      // light styles
      "bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
      // dark styles
      "dark:bg-card dark:text-primary-foreground"
    )}
  >
    <CardHeader>
      <CardTitle className="inline-flex text-xl font-semibold text-neutral-700 dark:text-neutral-300">
        <Bell className="mr-2" /> Announcements
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {[
          {
            title: "Campus-wide Event",
            desc: "Join us for the annual spring festival next week!",
            date: "May 15, 2023",
          },
          {
            title: "Library Hours Extended",
            desc: "The library will be open 24/7 during finals week.",
            date: "May 20, 2023",
          },
        ].map((announcement, index) => (
          <div key={index} className="p-4 rounded-lg bg-muted">
            <h3 className="font-semibold">{announcement.title}</h3>
            <p className="text-sm text-muted-foreground">{announcement.desc}</p>
            <p className="mt-2 text-xs text-muted-foreground">
              {announcement.date}
            </p>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

WelcomeSection.displayName = "WelcomeSection";
QuickActions.displayName = "QuickActions";
RecentTransactions.displayName = "RecentTransactions";
WeekClass.displayName = "WeekClass";
AnnouncementsSection.displayName = "AnnouncementsSection";

export {
  AnnouncementsSection,
  QuickActions,
  RecentTransactions,
  WeekClass,
  WelcomeSection,
};

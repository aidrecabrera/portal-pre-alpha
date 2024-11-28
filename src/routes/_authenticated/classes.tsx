import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { ScheduleDialog } from "@/features/authenticated/classes/component/class-schedule-info";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const scheduleData = {
  Mon: [],
  Tue: [
    {
      day: "Tuesday",
      startTime: 18, // 6:00 PM in 24-hour format
      endTime: 19, // 7:00 PM in 24-hour format
      subject: "CE 221 Dynamics of Rigid Bodies",
      room: "(N/A)",
      startHour: 8, // Assuming the day starts at 8:00 AM
      hourFactor: 4,
    },
  ],
  Wed: [
    {
      day: "Wednesday",
      startTime: 13, // 1:00 PM in 24-hour format
      endTime: 15, // 3:00 PM in 24-hour format
      subject: "CE 222 Mechanics of Deformable Bodies",
      room: "(N/A)",
      startHour: 8,
      hourFactor: 4,
    },
    {
      day: "Wednesday",
      startTime: 18.5, // 6:30 PM in 24-hour format
      endTime: 20, // 8:00 PM in 24-hour format
      subject: "CE 223L Quantity Surveying-Lab",
      room: "(N/A)",
      startHour: 8,
      hourFactor: 4,
    },
    {
      day: "Wednesday",
      startTime: 17, // 5:00 PM in 24-hour format
      endTime: 18, // 6:00 PM in 24-hour format
      subject: "EGeo 221 Geology for Engineers",
      room: "(N/A)",
      startHour: 8,
      hourFactor: 4,
    },
    {
      day: "Wednesday",
      startTime: 15, // 3:00 PM in 24-hour format
      endTime: 16.5, // 4:30 PM in 24-hour format
      subject: "Gen Ed 7 Science, Technology and Society",
      room: "(N/A)",
      startHour: 8,
      hourFactor: 4,
    },
  ],
};

export const Route = createFileRoute("/_authenticated/classes")({
  component: () => {
    return (
      <div>
        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <div className="flex flex-row items-center gap-4 ml-2">
                <div>
                  <div className="flex flex-row items-baseline">
                    <h2 className="mt-2 text-2xl font-bold">1st Semester</h2>
                    <Badge className="mb-2 ml-1">2023-2024</Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    Your current schedule is based on the provided data.
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ExplicitSchedule scheduleData={scheduleData} />
            </CardContent>
            <CardFooter />
          </Card>
        </div>
      </div>
    );
  },
});

interface ScheduleCardProps {
  day: string;
  startTime: number;
  endTime: number;
  subject?: string;
  room?: string;
  startHour: number;
  hourFactor: number;
}

const ScheduleCard = ({
  startTime,
  endTime,
  subject,
  room,
  startHour,
  hourFactor,
}: ScheduleCardProps) => {
  const startIndex = (startTime - startHour) * hourFactor;
  const duration = (endTime - startTime) * hourFactor;
  const [open, setOpen] = useState(false);
  return (
    <div
      className="absolute left-0 right-0 flex flex-row items-center px-2 mx-1 my-1 text-xs rounded-md cursor-pointer bg-primary"
      style={{
        top: `${startIndex * 16 + 32}px`,
        height: `${duration * 16 - 8}px`,
      }}
      onClick={() => setOpen(!open)}
    >
      <div className="h-full py-2">
        <Separator
          orientation="vertical"
          className="w-1 py-4 mr-2 rounded-lg bg-primary-foreground"
        />
      </div>
      <div className="font-bold text-primary-foreground">{subject}</div>
      <ScheduleDialog
        courseCode={""}
        courseTitle={""}
        timeSlot={`${(startTime - 12).toString()} ${(endTime - 12).toString()}`}
        room={room || ""}
        professor={""}
        units={0}
        section={""}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
};

interface TimeLabelsProps {
  startHour: number;
  endHour: number;
}

const TimeLabels: React.FC<TimeLabelsProps> = ({ startHour, endHour }) => {
  const generateTimeLabels = () => {
    const labels = [];
    for (let i = startHour; i <= endHour; i++) {
      const hour = i % 12 || 12;
      const ampm = i < 12 || i === 24 ? "AM" : "PM";
      labels.push(
        <div
          key={i}
          className="h-16 mr-4 text-xs text-right"
        >{`${hour}:00 ${ampm}`}</div>
      );
    }
    return labels;
  };

  return (
    <div className="sticky left-0 z-10 min-w-20">
      <div className="h-8" />
      {generateTimeLabels()}
    </div>
  );
};

interface DayColumnProps {
  day: string;
  scheduleCards: ScheduleCardProps[];
  startHour: number;
  endHour: number;
  hourFactor: number;
}

interface HourLinesProps {
  startHour: number;
  endHour: number;
}

const HourLines: React.FC<HourLinesProps> = ({ startHour, endHour }) => {
  const lines = [];
  for (let i = startHour; i <= endHour; i++) {
    lines.push(
      <div
        key={i}
        className="absolute left-0 right-0 border-t border-gray-200"
        style={{ top: `${(i - startHour) * 64 + 32}px` }}
      />
    );
  }
  return <>{lines}</>;
};

const DayColumn: React.FC<DayColumnProps> = ({
  day,
  scheduleCards,
  startHour,
  endHour,
  hourFactor,
}) => {
  return (
    <div key={day} className="relative w-full ">
      <div className="flex flex-col items-center justify-center h-10 gap-2 py-1 text-center ">
        <p className="w-full mb-4 text-lg">{day}</p>
      </div>
      <HourLines startHour={startHour} endHour={endHour} />
      {scheduleCards.map((card, index) => (
        <ScheduleCard
          key={index}
          {...card}
          startHour={startHour}
          hourFactor={hourFactor}
        />
      ))}
    </div>
  );
};

interface ExplicitScheduleProps {
  scheduleData: {
    [key: string]: ScheduleCardProps[];
  };
}

const ExplicitSchedule: React.FC<ExplicitScheduleProps> = ({
  scheduleData,
}) => {
  const [startHour, setStartHour] = useState(6);
  const [endHour, setEndHour] = useState(24);
  const hourFactor = 4;
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const [viewMode, setViewMode] = useState<"1day" | "3days" | "week">("week");
  const [screenSize, setScreenSize] = useState<"mobile" | "tablet" | "desktop">(
    "desktop"
  );

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth < 640) {
        setScreenSize("mobile");
        setViewMode("1day");
      } else if (window.innerWidth < 1024) {
        setScreenSize("tablet");
        setViewMode(viewMode === "week" ? "3days" : viewMode);
      } else {
        setScreenSize("desktop");
        setViewMode("week");
      }
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const renderDesktopView = () => (
    <div className="flex flex-row min-w-max">
      <TimeLabels startHour={startHour} endHour={endHour} />
      {days.map((day) => (
        <DayColumn
          key={day}
          day={day}
          scheduleCards={scheduleData[day] || []}
          startHour={startHour}
          endHour={endHour}
          hourFactor={hourFactor}
        />
      ))}
    </div>
  );

  const renderTabletOrMobileView = () => {
    const visibleDays = viewMode === "1day" ? 1 : viewMode === "3days" ? 3 : 7;
    const carouselItems = [];
    for (let i = 0; i < days.length; i += visibleDays) {
      carouselItems.push(days.slice(i, i + visibleDays));
    }

    return (
      <Carousel className="w-full select-none">
        <CarouselContent>
          {carouselItems.map((item, index) => (
            <CarouselItem key={index}>
              <div className="flex flex-row select-none min-w-max">
                <TimeLabels startHour={startHour} endHour={endHour} />
                {item.map((day) => (
                  <DayColumn
                    key={day}
                    day={day}
                    scheduleCards={scheduleData[day] || []}
                    startHour={startHour}
                    endHour={endHour}
                    hourFactor={hourFactor}
                  />
                ))}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    );
  };

  return (
    <div className="overflow-x-auto">
      {screenSize !== "desktop" && (
        <div className="mb-4">
          <Button
            onClick={() => setViewMode("1day")}
            className={`mr-2 ${viewMode === "1day" ? "bg-primary" : ""}`}
          >
            1 Day
          </Button>
          {screenSize === "tablet" && (
            <Button
              onClick={() => setViewMode("3days")}
              className={`mr-2 ${viewMode === "3days" ? "bg-primary" : ""}`}
            >
              3 Days
            </Button>
          )}
        </div>
      )}
      {screenSize === "desktop"
        ? renderDesktopView()
        : renderTabletOrMobileView()}
    </div>
  );
};

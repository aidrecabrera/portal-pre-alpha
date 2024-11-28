import BlurFade from "@/components/magicui/blur-fade";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Eye, Printer } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

type RegularSemester = "1st Sem" | "2nd Sem";
type Semester = RegularSemester | "Summer";

type YearLevel = `${number}${"" | "st" | "nd" | "rd" | "th"} Year`;

interface CourseBase {
  yearLevel: YearLevel;
  grade?: number;
  code: string;
  units: number;
  title: string;
  description?: string;
  prerequisites?: string[];
}

interface RegularSemesterCourse extends CourseBase {
  semester: RegularSemester;
}

interface SummerCourse extends CourseBase {
  semester: "Summer";
}

type Course = RegularSemesterCourse | SummerCourse;

type Curriculum = Course[];

// Mock API function
const fetchCurriculum = async (): Promise<Curriculum> => {
  // Simulating API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return [
    {
      yearLevel: "1st Year",
      semester: "1st Sem",
      code: "CCE 101",
      units: 3,
      title: "INTRODUCTION TO COMPUTING",
      grade: 4.0,
    },
    {
      yearLevel: "1st Year",
      semester: "1st Sem",
      code: "CCE 109",
      units: 3,
      title: "FUNDAMENTALS OF PROGRAMMING",
      grade: 4.0,
    },
    {
      yearLevel: "1st Year",
      semester: "1st Sem",
      code: "GE 4",
      units: 3,
      title: "MATHEMATICS IN THE MODERN WORLD",
      grade: 2.5,
    },
    {
      yearLevel: "1st Year",
      semester: "1st Sem",
      code: "NSTP 1",
      units: 3,
      title: "NATIONAL SERVICE TRAINING PROGRAM 1",
      grade: 4.0,
    },
    {
      yearLevel: "1st Year",
      semester: "1st Sem",
      code: "GE 7",
      units: 3,
      title: "ART APPRECIATION",
      grade: 3.5,
    },
    {
      yearLevel: "1st Year",
      semester: "1st Sem",
      code: "GPE 1",
      units: 2,
      title: "MOVEMENT ENHANCEMENT",
      grade: 3.5,
    },
    {
      yearLevel: "1st Year",
      semester: "1st Sem",
      code: "GE 1",
      units: 3,
      title: "UNDERSTANDING THE SELF",
      grade: 4.0,
    },
    {
      yearLevel: "1st Year",
      semester: "1st Sem",
      code: "GE 2",
      units: 6,
      title: "PURPOSIVE COMMUNICATION W/ INTERACTIVE LEARNING",
      grade: 3.5,
    },
    {
      yearLevel: "1st Year",
      semester: "2nd Sem",
      code: "CCE 107",
      units: 3,
      title: "INTERMEDIATE PROGRAMMING",
      prerequisites: ["CCE 109/L"],
    },
    {
      yearLevel: "1st Year",
      semester: "2nd Sem",
      code: "NSTP 2",
      units: 3,
      title: "NATIONAL SERVICE TRAINING PROGRAM 2",
      prerequisites: ["NSTP 1"],
      grade: 2.0,
    },
    {
      yearLevel: "1st Year",
      semester: "2nd Sem",
      code: "GE 3",
      units: 3,
      title: "THE CONTEMPORARY WORLD",
      grade: 3.0,
    },
    {
      yearLevel: "1st Year",
      semester: "2nd Sem",
      code: "CS 25",
      units: 3,
      title: "DISCRETE STRUCTURES 1",
      grade: 2.5,
    },
    {
      yearLevel: "1st Year",
      semester: "2nd Sem",
      code: "GE 5",
      units: 3,
      title: "SCIENCE, TECHNOLOGY AND SOCIETY",
      grade: 3.5,
    },
    {
      yearLevel: "1st Year",
      semester: "2nd Sem",
      code: "MTH 101",
      units: 3,
      title: "DIFFERENTIAL CALCULUS",
      grade: 3.0,
    },
    {
      yearLevel: "1st Year",
      semester: "2nd Sem",
      code: "UGE 1",
      units: 6,
      title: "READING COMPREHENSION",
      grade: 2.5,
    },
    {
      yearLevel: "1st Year",
      semester: "2nd Sem",
      code: "GPE 2",
      units: 2,
      title: "FITNESS EXERCISES",
      prerequisites: ["GPE 1"],
      grade: 4.0,
    },
    {
      yearLevel: "2nd Year",
      semester: "1st Sem",
      code: "CS 11",
      units: 3,
      title: "DATA STRUCTURES",
      prerequisites: ["CCE 107/L"],
    },
    {
      yearLevel: "2nd Year",
      semester: "1st Sem",
      code: "CST 4",
      units: 3,
      title: "CS PROFESSIONAL TRACK 1",
      prerequisites: ["CCE 107/L"],
    },
    {
      yearLevel: "2nd Year",
      semester: "1st Sem",
      code: "GE 9",
      units: 3,
      title: "ETHICS (Disciplinal)",
    },
    {
      yearLevel: "2nd Year",
      semester: "1st Sem",
      code: "CS 26",
      units: 3,
      title: "SOFTWARE DEVELOPMENT FUNDAMENTALS",
      prerequisites: ["CCE 107/L"],
    },
    {
      yearLevel: "2nd Year",
      semester: "1st Sem",
      code: "MTH 105",
      units: 3,
      title: "INTEGRAL CALCULUS",
      prerequisites: ["MTH 101"],
    },
    {
      yearLevel: "2nd Year",
      semester: "1st Sem",
      code: "CS 3",
      units: 3,
      title: "DISCRETE STRUCTURES 2",
      prerequisites: ["CS 25"],
    },
    {
      yearLevel: "2nd Year",
      semester: "1st Sem",
      code: "GPE 3",
      units: 2,
      title: "PHYSICAL ACTIVITIES TOWARDS HEALTH & FITNESS",
      prerequisites: ["GPE 2"],
    },
    {
      yearLevel: "2nd Year",
      semester: "1st Sem",
      code: "CCE 105",
      units: 3,
      title: "DATA STRUCTURES AND ALGORITHMS",
      prerequisites: ["CCE 107/L"],
    },
    {
      yearLevel: "2nd Year",
      semester: "1st Sem",
      code: "GE 6",
      units: 3,
      title: "RIZAL'S LIFE AND WORKS",
    },
    {
      yearLevel: "2nd Year",
      semester: "1st Sem",
      code: "GE 8",
      units: 3,
      title: "READINGS IN PHILIPPINE HISTORY",
    },
    {
      yearLevel: "3rd Year",
      semester: "Summer",
      code: "CS 16",
      units: 6,
      title: "PRACTICUM",
      prerequisites: ["CS 17/L", "CS 11/L"],
    },
    {
      yearLevel: "3rd Year",
      semester: "Summer",
      code: "CS 20",
      units: 3,
      title: "CS PROFESSIONAL TRACK 5",
      prerequisites: ["CST 14/L"],
    },
    {
      yearLevel: "4th Year",
      semester: "1st Sem",
      code: "CS 19",
      units: 4,
      title: "OPERATING SYSTEMS",
      prerequisites: ["CS 11/L"],
    },
    {
      yearLevel: "4th Year",
      semester: "1st Sem",
      code: "CAED 500C",
      units: 3,
      title: "CAREER AND PERSONALITY DEVELOPMENT",
      prerequisites: ["4th Year Standing"],
    },
    {
      yearLevel: "4th Year",
      semester: "1st Sem",
      code: "CS 24",
      units: 3,
      title: "CS PROFESSIONAL TRACK 6",
      prerequisites: ["CS 20/L"],
    },
    {
      yearLevel: "4th Year",
      semester: "1st Sem",
      code: "CCE 106",
      units: 3,
      title: "APPLICATIONS DEV'T AND EMERGING TECHNOLOGIES",
      prerequisites: ["CST 9/L"],
    },
    {
      yearLevel: "4th Year",
      semester: "1st Sem",
      code: "CS 21",
      units: 3,
      title: "NETWORKS AND COMMUNICATIONS",
      prerequisites: ["CS 11/L"],
    },
    {
      yearLevel: "4th Year",
      semester: "1st Sem",
      code: "CS 18",
      units: 3,
      title: "CS THESIS WRITING 1",
      prerequisites: ["CS 17/L"],
    },
    {
      yearLevel: "4th Year",
      semester: "2nd Sem",
      code: "CS 23",
      units: 6,
      title: "CS THESIS WRITING 2",
      prerequisites: ["CS 18/L"],
    },
    {
      yearLevel: "4th Year",
      semester: "2nd Sem",
      code: "CS 22",
      units: 3,
      title: "INFORMATION ASSURANCE AND SECURITY",
      prerequisites: ["CS 21/L"],
    },
  ];
};

const animationConfig = {
  container: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  containerTransition: {
    duration: 0.6,
    ease: "easeInOut",
    staggerChildren: 0.2,
  },
  card: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
  },
  cardTransition: {
    duration: 0.4,
    ease: "easeOut",
  },
  row: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  rowTransition: {
    duration: 0.3,
    ease: "linear",
  },
};

const MotionTableRow = motion(TableRow);

export const ProgramEvaluationBanner = ({ program }: { program: string }) => {
  return (
    <>
      <Card className="flex flex-col sm:flex-row justify-between p-4 sm:p-8 border-none rounded-lg group text-primary-foreground bg-primary [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]">
        <div className="flex flex-row items-start justify-between transition-all duration-300 ease-out">
          <div>
            <h1 className="inline-flex items-center gap-2 mb-2 text-2xl font-bold sm:text-3xl">
              {program}
            </h1>
            <p className="text-sm dark:text-muted-foreground">
              This curriculum is designed to provide a comprehensive and
              balanced curriculum for {program} students.
            </p>
          </div>
        </div>
      </Card>
    </>
  );
};

const mockStudentData = {
  college: "College of Information and Computing",
  program: "Bachelor of Science in Computer Science",
  majorStudy: "Data Science",
  yearLevel: "2nd Year",
  curriculum: "BSCS SY 2018-2019",
  term: "2024-2025 1st Semester",
};

export const ProgramStudentInfo = ({ studentData = mockStudentData }) => {
  const [isPrintPreviewOpen, setIsPrintPreviewOpen] = useState(false);
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Student Information",
    onAfterPrint: () => setIsPrintPreviewOpen(false),
  });

  const [curriculum, setCurriculum] = useState<Curriculum>([]);

  useEffect(() => {
    fetchCurriculum().then((data) => {
      setCurriculum(data);
    });
  }, []);

  return (
    <Card className="overflow-hidden col-span-full lg:col-span-3 print:shadow-none print:border-none">
      <CardContent className="p-4 sm:p-8 print:p-0">
        <div className="w-full space-y-1">
          <BlurFade>
            <CardTitle className="text-xl font-bold break-words sm:text-2xl md:text-3xl print:text-4xl">
              Cabrera, Aidre Love S.
            </CardTitle>
          </BlurFade>
          <BlurFade>
            <CardDescription className="text-sm sm:text-base md:text-lg print:text-black">
              {studentData.college}
            </CardDescription>
          </BlurFade>
        </div>
        <div className="mt-2 -mb-2 text-md">
          <table>
            <tr>
              <td className="w-[200px]">
                <strong>Academic Program:</strong>
              </td>
              <td>{studentData.program}</td>
            </tr>
            <tr>
              <td className="w-[200px]">
                <strong>Major Study:</strong>
              </td>
              <td>{studentData.majorStudy}</td>
            </tr>
            <tr>
              <td className="w-[200px]">
                <strong>Year Level:</strong>
              </td>
              <td>{studentData.yearLevel}</td>
            </tr>
            <tr>
              <td className="w-[200px]">
                <strong>Curriculum:</strong>
              </td>
              <td>{studentData.curriculum}</td>
            </tr>
            <tr>
              <td className="w-[200px]">
                <strong>Term:</strong>
              </td>
              <td>{studentData.term}</td>
            </tr>
          </table>
        </div>
      </CardContent>
      <CardFooter className="flex-wrap justify-start gap-2">
        <Button size="sm" onClick={() => setIsPrintPreviewOpen(true)}>
          <Eye className="w-4 h-4 mr-2" />
          Print Preview
        </Button>
      </CardFooter>
      {isPrintPreviewOpen && (
        <Dialog open={isPrintPreviewOpen} onOpenChange={setIsPrintPreviewOpen}>
          <DialogContent className="max-w-4xl overflow-auto">
            <DialogHeader>
              <DialogTitle>Print Preview</DialogTitle>
            </DialogHeader>
            <div ref={componentRef} className="overflow-auto max-h-[80vh]">
              <PrintableEvaluation curriculum={curriculum} />
            </div>
            <DialogFooter>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsPrintPreviewOpen(false)}
                >
                  Close
                </Button>
                <Button onClick={handlePrint}>
                  <Printer className="w-4 h-4 mr-2" />
                  Print
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </Card>
  );
};

type StatisticsItem = {
  label: string;
  value: number;
  unit?: string;
};

type ProgramStatistics = {
  overallProgress: StatisticsItem;
  units: {
    earned: StatisticsItem;
    total: StatisticsItem;
    toEarn: StatisticsItem;
  };
  courses: {
    inCurriculum: StatisticsItem;
    total: StatisticsItem;
    credited: StatisticsItem;
    toEarn: StatisticsItem;
  };
  lectureUnits: {
    total: StatisticsItem;
    earned: StatisticsItem;
    toEarn: StatisticsItem;
  };
  laboratoryUnits: {
    total: StatisticsItem;
    earned: StatisticsItem;
    toEarn: StatisticsItem;
  };
};

const mockFetchProgramStatistics = async (): Promise<ProgramStatistics> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    overallProgress: { label: "Overall Progress", value: 46, unit: "%" },
    units: {
      earned: { label: "Units Earned", value: 46 },
      total: { label: "Total Units", value: 152 },
      toEarn: { label: "Units to Earn", value: 106 },
    },
    courses: {
      inCurriculum: { label: "Courses in Curriculum", value: 53 },
      total: { label: "Total Courses", value: 152 },
      credited: { label: "Credited Courses", value: 16 },
      toEarn: { label: "Courses to Earn", value: 37 },
    },
    lectureUnits: {
      total: { label: "Lecture Units", value: 130 },
      earned: { label: "Lecture Units Earned", value: 43 },
      toEarn: { label: "Lecture Units to Earn", value: 87 },
    },
    laboratoryUnits: {
      total: { label: "Laboratory Units", value: 22 },
      earned: { label: "Laboratory Units Earned", value: 3 },
      toEarn: { label: "Laboratory Units to Earn", value: 19 },
    },
  };
};

const StatisticItem: React.FC<{ item: StatisticsItem; index: number }> = ({
  item,
  index,
}) => (
  <motion.div
    className="flex flex-col p-4 rounded-lg shadow-sm bg-secondary"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: index * 0.1 }}
  >
    <span className="text-sm text-muted-foreground">{item.label}</span>
    <span className="text-2xl font-bold">
      {item.value}
      {item.unit && (
        <span className="ml-1 text-sm font-normal">{item.unit}</span>
      )}
    </span>
  </motion.div>
);

const StatisticsSection: React.FC<{
  title: string;
  items: StatisticsItem[];
}> = ({ title, items }) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold">{title}</h3>
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <StatisticItem key={item.label} item={item} index={index} />
      ))}
    </div>
  </div>
);

export const ProgramStudentStatistics: React.FC = () => {
  const [statistics, setStatistics] = React.useState<ProgramStatistics | null>(
    null
  );
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await mockFetchProgramStatistics();
        setStatistics(data);
      } catch (err) {
        setError("Failed to load statistics. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Card className="w-full">
        <CardContent className="flex items-center justify-center h-64">
          <motion.div
            className="w-16 h-16 border-t-4 border-blue-500 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full ">
        <CardContent className="flex items-center justify-center h-64">
          <div className="flex items-center space-x-2 text-red-500">
            <AlertCircle size={24} />
            <span>{error}</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!statistics) return null;

  return (
    <Card className="w-full ">
      <CardHeader>
        <CardTitle>Program Statistics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="flex justify-between mb-1">
              <span className="text-sm text-muted-foreground">
                {statistics.overallProgress.label}
              </span>
              <span className="text-sm font-medium">
                {statistics.overallProgress.value}%
              </span>
            </div>
            <Progress
              value={statistics.overallProgress.value}
              className="h-2"
            />
          </motion.div>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="units">Units</TabsTrigger>
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-4">
              <StatisticsSection
                title="Overall Statistics"
                items={[
                  statistics.units.earned,
                  statistics.units.total,
                  statistics.courses.inCurriculum,
                  statistics.courses.credited,
                ]}
              />
            </TabsContent>
            <TabsContent value="units" className="mt-4">
              <StatisticsSection
                title="Unit Statistics"
                items={[
                  statistics.units.earned,
                  statistics.units.total,
                  statistics.units.toEarn,
                  statistics.lectureUnits.earned,
                  statistics.lectureUnits.total,
                  statistics.laboratoryUnits.earned,
                  statistics.laboratoryUnits.total,
                ]}
              />
            </TabsContent>
            <TabsContent value="courses" className="mt-4">
              <StatisticsSection
                title="Course Statistics"
                items={[
                  statistics.courses.inCurriculum,
                  statistics.courses.total,
                  statistics.courses.credited,
                  statistics.courses.toEarn,
                ]}
              />
            </TabsContent>
            <TabsContent value="details" className="mt-4">
              <StatisticsSection
                title="Detailed Statistics"
                items={[
                  statistics.lectureUnits.total,
                  statistics.lectureUnits.earned,
                  statistics.lectureUnits.toEarn,
                  statistics.laboratoryUnits.total,
                  statistics.laboratoryUnits.earned,
                  statistics.laboratoryUnits.toEarn,
                ]}
              />
            </TabsContent>
          </Tabs>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

export const ProgramEvaluationTable = () => {
  const [curriculum, setCurriculum] = useState<Curriculum>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCurriculum().then((data) => {
      setCurriculum(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">Loading...</div>
    );
  }

  const groupedCurriculum = curriculum.reduce(
    (acc, course) => {
      if (!acc[course.yearLevel]) {
        acc[course.yearLevel] = { "1st Sem": [], "2nd Sem": [], Summer: [] };
      }
      acc[course.yearLevel][course.semester].push(course);
      return acc;
    },
    {} as Record<YearLevel, Record<string, Course[]>>
  );

  return (
    <motion.div
      className="w-full space-y-4"
      variants={animationConfig.container}
      initial="initial"
      animate="animate"
    >
      {Object.entries(groupedCurriculum).map(([yearLevel, semesters]) => (
        <div>
          {Object.entries(semesters).map(
            ([semester, courses]) =>
              courses.length > 0 && (
                <div key={semester} className="mb-8 last:mb-0">
                  <div className="overflow-x-auto rounded-lg bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-card">
                          <TableHead
                            colSpan={4}
                            className="p-4 text-xl font-bold text-left text-primary dark:text-primary-foreground"
                          >
                            {semester} - {yearLevel}
                          </TableHead>
                        </TableRow>
                        <TableRow>
                          <TableHead className="p-4 font-bold text-muted-foreground w-28">
                            Code
                          </TableHead>
                          <TableHead className="min-w-[200px] font-bold text-muted-foreground">
                            Title
                          </TableHead>
                          <TableHead className="w-20 font-bold text-muted-foreground">
                            Units
                          </TableHead>
                          <TableHead className="w-20 font-bold text-muted-foreground">
                            Grade
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {courses.map((course, index) => (
                          <MotionTableRow
                            key={course.code}
                            variants={animationConfig.row}
                            transition={{ delay: index * 0.1 }}
                          >
                            <TableCell className="p-4 font-medium">
                              {course.code}
                            </TableCell>
                            <TableCell>{course.title}</TableCell>
                            <TableCell className="p-4 text-center">
                              <Badge variant="outline">{course.units}</Badge>
                            </TableCell>
                            <TableCell className="p-4 text-center">
                              {course.grade ? (
                                <span className={`font-semibold p-4}`}>
                                  {course.grade.toFixed(1)}
                                </span>
                              ) : (
                                "N/A"
                              )}
                            </TableCell>
                          </MotionTableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )
          )}
        </div>
      ))}
    </motion.div>
  );
};

const PrintableEvaluation = React.forwardRef<
  HTMLDivElement,
  { curriculum: Curriculum }
>(({ curriculum }, ref) => {
  const groupedCurriculum = curriculum.reduce(
    (acc, course) => {
      if (!acc[course.yearLevel]) {
        acc[course.yearLevel] = { "1st Sem": [], "2nd Sem": [], Summer: [] };
      }
      acc[course.yearLevel][course.semester].push(course);
      return acc;
    },
    {} as Record<YearLevel, Record<string, Course[]>>
  );

  return (
    <div ref={ref} className="h-auto p-8 text-black bg-white">
      <h1 className="mb-6 text-3xl font-bold">Program Evaluation</h1>
      {Object.entries(groupedCurriculum).map(([yearLevel, semesters]) => (
        <div key={yearLevel} className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">{yearLevel}</h2>
          {Object.entries(semesters).map(
            ([semester, courses]) =>
              courses.length > 0 && (
                <div key={semester} className="mb-6">
                  <h3 className="mb-2 text-xl font-medium">{semester}</h3>
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="p-2 text-xs text-left">Code</th>
                        <th className="p-2 text-xs text-left">Title</th>
                        <th className="p-2 text-xs text-center">Units</th>
                        <th className="p-2 text-xs text-center">Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {courses.map((course) => (
                        <tr key={course.code} className="border-b">
                          <td className="p-2 text-xs">{course.code}</td>
                          <td className="p-2 text-xs">{course.title}</td>
                          <td className="p-2 text-xs text-center">
                            {course.units}
                          </td>
                          <td className="p-2 text-xs text-center">
                            {course.grade ? course.grade.toFixed(1) : "N/A"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )
          )}
        </div>
      ))}
    </div>
  );
});

PrintableEvaluation.displayName = "PrintableEvaluation";

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
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Eye, Info, Printer } from "@phosphor-icons/react";
import { motion } from "framer-motion";
// @ts-ignore
import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

// Define types for the data
interface Term {
  name: string;
  grade: number;
  status: string;
  progress: number;
}

interface Subject {
  code: string;
  title: string;
  units: number;
  final: string;
  reExam: string;
  remarks: string;
}

interface IStudentData {
  terms: Term[];
  subjects: Subject[];
  studentInfo: {
    name: string;
    idNumber: string;
    program: string;
    yearLevel: string;
    academicYear: string;
    semester: string;
    imageUrl: string;
  };
}

// Mock API function
const fetchStudentData = async (): Promise<IStudentData> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    terms: [
      { name: "Prelim", grade: 1.0, status: "Excellent", progress: 33 },
      { name: "Midterm", grade: 1.0, status: "Very Good", progress: 66 },
      { name: "Finals", grade: 1.0, status: "Good", progress: 100 },
    ],
    subjects: [
      {
        code: "CS 214",
        title: "Computer Networks Concepts and Theories",
        units: 3.0,
        final: "1.0",
        reExam: "-",
        remarks: "Passed",
      },
      {
        code: "IC 217",
        title: "Data Structures",
        units: 3.0,
        final: "1.0",
        reExam: "-",
        remarks: "Passed",
      },
      {
        code: "CS 213",
        title: "Database Management Systems",
        units: 3.0,
        final: "1.0",
        reExam: "-",
        remarks: "Passed",
      },
      {
        code: "CS 215",
        title: "Design and Analysis of Algorithm",
        units: 3.0,
        final: "1.0",
        reExam: "-",
        remarks: "Passed",
      },
      {
        code: "GE 215",
        title: "Life and Works of Jose Rizal",
        units: 3.0,
        final: "1.0",
        reExam: "-",
        remarks: "Passed",
      },
    ],
    studentInfo: {
      name: "Cabrera, Aidre Love S.",
      idNumber: "2023-12345",
      program: "Bachelor of Science in Computer Science",
      yearLevel: "3rd Year",
      academicYear: "2024-2025",
      semester: "1st Semester",
      imageUrl:
        "https://scontent.fdvo5-1.fna.fbcdn.net/v/t1.6435-9/81004314_2856676601049765_5171330711046586368_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=53a332&_nc_ohc=RMRc0glXjpwQ7kNvgFwIlYh&_nc_ht=scontent.fdvo5-1.fna&oh=00_AYB-RQTTQPA5KjtyR4xv4i7iKMP5r3a8YVqGEaYRhGGqtg&oe=66DBF7FF",
    },
  };
};

const getColorByGrade = (grade: number): string => {
  if (grade <= 1.0) return "text-green-500 print:text-black";
  if (grade <= 1.5) return "text-blue-500 print:text-black";
  if (grade <= 2.0) return "text-yellow-500 print:text-black";
  return "text-red-500 print:text-black";
};

const calculateGWA = (grades: number[]): string => {
  const sum = grades.reduce((acc, grade) => acc + grade, 0);
  return (sum / grades.length).toFixed(2);
};

const PrintableContent = React.forwardRef<HTMLDivElement, any>((props, ref) => {
  const { studentInfo, subjects } = props;
  return (
    <div
      ref={ref}
      className="flex flex-col p-8 space-y-4 text-black bg-white print:mx-6"
    >
      <div className="flex flex-col items-center justify-center gap-2 my-8">
        <img src="/public/cjc.png" className="size-24" />
        <div className="flex flex-col gap-6 text-center">
          <div>
            <h1 className="text-lg font-bold text-center">
              Cor Jesu College, Inc.
            </h1>
            <p className="text-sm">
              Sacred Heart Ave, Digos City, 8002 Davao del Sur
            </p>
          </div>
          <div>
            <h2 className="text-lg font-bold uppercase">Grade Report</h2>
            <p className="text-sm">{studentInfo.academicYear} 1st Semester</p>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center gap-4">
        <img src={studentInfo.imageUrl} alt="" className="size-40" />
        <table className="w-full text-sm">
          <tbody>
            <tr>
              <td className="font-bold w-[150px] py-1">Name</td>
              <td className="py-1">{studentInfo.name}</td>
            </tr>
            <tr>
              <td className="font-bold w-[150px] py-1">ID Number</td>
              <td className="py-1">{studentInfo.idNumber}</td>
            </tr>
            <tr>
              <td className="font-bold w-[150px] py-1">Program</td>
              <td className="py-1">{studentInfo.program}</td>
            </tr>
            <tr>
              <td className="font-bold w-[150px] py-1">Year Level</td>
              <td className="py-1">{studentInfo.yearLevel}</td>
            </tr>
            <tr>
              <td className="font-bold w-[150px] py-1">Academic Year</td>
              <td className="py-1">{studentInfo.academicYear}</td>
            </tr>
            <tr>
              <td className="font-bold w-[150px] py-1">Semester</td>
              <td className="py-1">{studentInfo.semester}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Table className="w-full mb-4">
        <TableCaption className="text-xs">
          This is a system generated report. No signature required. Date
          Generated:{" "}
          {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </TableCaption>
        <TableHeader>
          <TableRow className="border-b-black hover:bg-white">
            <TableHead>Term</TableHead>
            <TableHead>Grade</TableHead>
            <TableHead className="text-center">Units</TableHead>
            <TableHead className="text-center">Final</TableHead>
            <TableHead className="text-center">Re-exam</TableHead>
            <TableHead className="text-center">Remarks</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subjects.map((subject: any, index: React.Key) => (
            <TableRow className="hover:bg-white border-b-black" key={index}>
              <TableCell>{subject.code}</TableCell>
              <TableCell>{subject.title}</TableCell>
              <TableCell className="text-center">
                {subject.units.toFixed(1)}
              </TableCell>
              <TableCell className="text-center">{subject.final}</TableCell>
              <TableCell className="text-center">{subject.reExam}</TableCell>
              <TableCell className="text-center">
                <Badge
                  variant="outline"
                  className="text-green-500 border-green-500"
                >
                  {subject.remarks}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
});

const StudentBanner = ({
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
      </div>
    </div>
  </Card>
);

export const OverviewGrades = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPrintPreviewOpen, setIsPrintPreviewOpen] = useState(false);
  const componentRef = useRef(null);
  const [studentData, setStudentData] = useState<IStudentData>();

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await fetchStudentData();
      setStudentData(data);
    };
    fetchData();
  }, []);

  const gwa = studentData
    ? calculateGWA(studentData?.terms.map((term) => term.grade))
    : "0.00";

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Report of Grades",
    onAfterPrint: () => setIsPrintPreviewOpen(false),
  });

  if (!studentData || studentData.terms.length === 0) {
    return (
      <div className="flex items-center justify-center w-full h-full"></div>
    );
  }

  return (
    <div className="space-y-4 print:space-y-4">
      <StudentBanner
        title="Report of Grades"
        content="Student's Grade Report"
        className="print:hidden"
      />
      <div className="grid gap-4 lg:grid-cols-8">
        <Card className="overflow-hidden col-span-full lg:col-span-3 print:shadow-none print:border-none">
          <CardHeader className="flex flex-col items-start justify-between p-4 sm:p-6 print:bg-white print:text-black print:p-0">
            <div className="w-full space-y-1">
              <BlurFade>
                <CardTitle className="text-xl font-bold break-words sm:text-2xl md:text-3xl print:text-4xl">
                  {studentData?.studentInfo.name}
                </CardTitle>
              </BlurFade>
              <BlurFade>
                <CardDescription className="text-sm sm:text-base md:text-lg print:text-black">
                  {studentData?.studentInfo.program}
                </CardDescription>
              </BlurFade>
            </div>
          </CardHeader>
          <CardFooter className="flex-wrap justify-start gap-2">
            <Button
              variant="default"
              size="sm"
              className="w-full print:hidden sm:w-auto"
              onClick={() => setIsPrintPreviewOpen(true)}
            >
              <Eye className="w-4 h-4 mr-2" />
              Print Preview
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full print:hidden sm:w-auto"
                >
                  <Info className="w-4 h-4 mr-2" />
                  Formula
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Grade Computation Formula</DialogTitle>
                  <DialogDescription>
                    <p className="mb-2">
                      The grade for each term is computed as follows:
                    </p>
                    <ul className="space-y-1 text-sm list-disc list-inside">
                      <li>Quizzes: 30%</li>
                      <li>Assignments: 20%</li>
                      <li>Projects: 20%</li>
                      <li>Final Exam: 30%</li>
                    </ul>
                    <p className="mt-4 text-xs">
                      The General Weighted Average (GWA) is the average of all
                      term grades.
                    </p>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
        <div className="grid grid-cols-2 gap-4 col-span-full lg:col-span-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 print:grid-cols-4 print:gap-2">
          {studentData?.terms.map((term, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="w-full"
            >
              <Card className="relative h-full overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-lg print:shadow-none print:border-none">
                <CardHeader className="flex pb-2 print:p-0">
                  <h3 className="text-sm font-semibold text-left sm:text-base print:text-lg">
                    {term.name}
                  </h3>
                </CardHeader>
                <CardContent className="pt-0 print:p-0">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-baseline space-x-2">
                          <span
                            className={`text-2xl sm:text-3xl font-bold ${getColorByGrade(
                              term.grade
                            )}`}
                          >
                            {term.grade.toFixed(2)}
                          </span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs sm:text-sm">
                          {term.status} - Click for details
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <p className="mt-2 text-xs text-muted-foreground print:text-black">
                    General Average
                  </p>
                </CardContent>
                <div className="absolute inset-x-0 bottom-0 h-1 bg-primary print:hidden" />
              </Card>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: studentData.terms.length * 0.1 }}
            className="w-full"
          >
            <Card className="relative h-full overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-lg print:shadow-none print:border-none">
              <CardHeader className="flex pb-2 print:p-0">
                <h3 className="text-sm font-semibold text-left sm:text-base print:text-lg">
                  GWA
                </h3>
              </CardHeader>
              <CardContent className="pt-0 print:p-0">
                <div className="flex items-baseline space-x-2">
                  <span
                    className={`text-2xl sm:text-3xl font-bold ${getColorByGrade(
                      Number.parseFloat(gwa)
                    )}`}
                  >
                    {gwa}
                  </span>
                </div>
                <p className="mt-2 text-xs text-muted-foreground print:text-black">
                  Overall Performance
                </p>
              </CardContent>
              <div className="absolute inset-x-0 bottom-0 h-1 bg-primary print:hidden" />
            </Card>
          </motion.div>
        </div>
      </div>
      {isPrintPreviewOpen && (
        <Dialog open={isPrintPreviewOpen} onOpenChange={setIsPrintPreviewOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Print Preview</DialogTitle>
            </DialogHeader>
            <div className="overflow-auto max-h-[80vh]">
              <PrintableContent
                ref={componentRef}
                studentInfo={studentData?.studentInfo}
                subjects={studentData?.subjects}
              />
            </div>
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
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

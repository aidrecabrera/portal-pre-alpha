import NumberTicker from "@/components/magicui/number-ticker";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AssessmentBreakdown,
  TStudentAssessmentProps,
} from "@/features/authenticated/finance/components/assessment";
import FinanceOverview, {
  TFinanceOverviewProps,
} from "@/features/authenticated/finance/components/finance-overview";
import { createFileRoute } from "@tanstack/react-router";
import { FinanceCta } from "./../../../features/authenticated/finance/components/finance-cta";

export const Route = createFileRoute("/_authenticated/finance/assessment")({
  component: FinanceAssessments,
});

const assessmentData = {
  studentName: "Cabrera, Aidre Love",
  studentId: "536215",
  semester: "First Semester",
  academicYear: "2022-23",
  program: "1st Year Bachelor Of Science In Computer Science",
  assessmentItems: [
    {
      chargeDescription: "Per Unit Fee(545.00 X 23.0)",
      course: "",
      amount: 12535.0,
    },
    {
      chargeDescription: "Athletics Fee",
      course: "",
      amount: 300.0,
    },
    {
      chargeDescription: "Audio Visual Fee",
      course: "",
      amount: 430.0,
    },
    {
      chargeDescription: "Energy Fee",
      course: "",
      amount: 1750.0,
    },
  ],
};

const mockData: TFinanceOverviewProps = {
  totalPaid: 8499.16,
  quarterlyPayments: [
    {
      name: "Prelims",
      status: "Partially Paid",
      amountPaid: 8499.16,
      totalAmount: 14402,
    },
    { name: "Midterms", status: "Pending", amountPaid: 0, totalAmount: 6800 },
    { name: "Finals", status: "Pending", amountPaid: 0, totalAmount: 6800 },
  ],
  monthlyPayments: [
    {
      name: "August",
      status: "Fully Paid",
      amountPaid: 2833.05,
      totalAmount: 2833.05,
    },
    {
      name: "September",
      status: "Fully Paid",
      amountPaid: 2833.05,
      totalAmount: 2833.05,
    },
    {
      name: "October",
      status: "Fully Paid",
      amountPaid: 2833.06,
      totalAmount: 2833.06,
    },
    {
      name: "November",
      status: "Pending",
      amountPaid: 0,
      totalAmount: 2833.05,
    },
    {
      name: "December",
      status: "Pending",
      amountPaid: 0,
      totalAmount: 2833.05,
    },
  ],
};

const assessmentItems: TStudentAssessmentProps["assessmentItems"] = [
  {
    category: "Tuition",
    chargeDescription: "Per Unit Fee (545.00 X 23.0)",
    course: "",
    amount: 12535.0,
  },
  {
    category: "Miscellaneous",
    chargeDescription: "Athletics Fee",
    course: "",
    amount: 300.0,
  },
  {
    category: "Miscellaneous",
    chargeDescription: "Audio Visual Fee",
    course: "",
    amount: 410.0,
  },
  {
    category: "Miscellaneous",
    chargeDescription: "Energy Fee",
    course: "",
    amount: 1750.0,
  },
  {
    category: "Miscellaneous",
    chargeDescription: "External Relations/Internationalization",
    course: "",
    amount: 275.0,
  },
  {
    category: "Miscellaneous",
    chargeDescription: "Facilities Upgrading/Modernization",
    course: "",
    amount: 1525.0,
  },
  {
    category: "Miscellaneous",
    chargeDescription: "Guidance Fee",
    course: "",
    amount: 315.0,
  },
  {
    category: "Miscellaneous",
    chargeDescription: "Internet Fee",
    course: "",
    amount: 315.0,
  },
  {
    category: "Miscellaneous",
    chargeDescription: "Library Fee",
    course: "",
    amount: 1200.0,
  },
  {
    category: "Miscellaneous",
    chargeDescription: "Medical and Dental Fee",
    course: "",
    amount: 322.5,
  },
  {
    category: "Miscellaneous",
    chargeDescription: "Prisaa Fee",
    course: "",
    amount: 175.0,
  },
  {
    category: "Miscellaneous",
    chargeDescription: "Psychological testing",
    course: "",
    amount: 225.0,
  },
  {
    category: "Miscellaneous",
    chargeDescription: "Red Cross/Bloodletting",
    course: "",
    amount: 30.0,
  },
  {
    category: "Miscellaneous",
    chargeDescription: "Registration Fee",
    course: "",
    amount: 550.0,
  },
  {
    category: "Miscellaneous",
    chargeDescription: "Student -Learning Management System",
    course: "",
    amount: 450.0,
  },
  {
    category: "Miscellaneous",
    chargeDescription: "Student Development Fee",
    course: "",
    amount: 200.0,
  },
  {
    category: "Miscellaneous",
    chargeDescription: "Student Government",
    course: "",
    amount: 60.0,
  },
  {
    category: "Miscellaneous",
    chargeDescription: "Student Insurance",
    course: "",
    amount: 150.0,
  },
  {
    category: "Miscellaneous",
    chargeDescription: "Student Publication Fee",
    course: "",
    amount: 75.0,
  },
  {
    category: "Miscellaneous",
    chargeDescription: "Student Research and Community Extension Fee",
    course: "",
    amount: 225.0,
  },
  {
    category: "Miscellaneous",
    chargeDescription: "Testing Material Fee",
    course: "",
    amount: 362.25,
  },
  {
    category: "Lab Fees",
    chargeDescription: "E-learning It/cs/is",
    course: "",
    amount: 1000.0,
  },
  {
    category: "Miscellaneous",
    chargeDescription: "Examination Booklet Fee",
    course: "",
    amount: 176.0,
  },
  {
    category: "Miscellaneous",
    chargeDescription: "Handbook Fee",
    course: "",
    amount: 200.0,
  },
  {
    category: "Miscellaneous",
    chargeDescription: "ID Card",
    course: "",
    amount: 200.0,
  },
  {
    category: "Lab Fees",
    chargeDescription: "Computing It/cs/is Lab",
    course: "CCE 109L",
    amount: 1000.0,
  },
  {
    category: "Lab Fees",
    chargeDescription: "Computing It/cs/is Lab",
    course: "CCE 101L",
    amount: 1000.0,
  },
  {
    category: "Miscellaneous",
    chargeDescription: "e-book",
    course: "GE 7",
    amount: 200.0,
  },
  {
    category: "Miscellaneous",
    chargeDescription: "e-book",
    course: "GPE 1",
    amount: 100.0,
  },
  {
    category: "Miscellaneous",
    chargeDescription: "e-book",
    course: "GE 1",
    amount: 200.0,
  },
  {
    category: "Miscellaneous",
    chargeDescription: "e-book",
    course: "GE 2",
    amount: 190.0,
  },
  {
    category: "Miscellaneous",
    chargeDescription: "e-book",
    course: "GE 4",
    amount: 320.0,
  },
  {
    category: "Miscellaneous",
    chargeDescription: "Elearning-commo English",
    course: "GE 2",
    amount: 645.0,
  },
  {
    category: "Miscellaneous",
    chargeDescription: "NSTP Fee",
    course: "NSTP 1",
    amount: 817.5,
  },
  {
    category: "Miscellaneous",
    chargeDescription: "Refund",
    course: "",
    amount: -22904.0,
  },
];

function FinanceAssessments() {
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 ">
        <div className="flex flex-col gap-4">
          <Card className="bg-primary text-primary-foreground">
            <CardHeader>
              <CardTitle>Account Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <h1 className="inline-flex text-5xl font-medium tracking-tight">
                ₱{" "}
                <NumberTicker
                  value={12300.56}
                  delay={0}
                  className="text-primary-foreground"
                />
              </h1>
            </CardContent>
            <CardFooter>
              <CardDescription className="text-primary-foreground">
                Updated 30 minutes ago
              </CardDescription>
            </CardFooter>
          </Card>
          <div className="flex flex-col gap-4">
            <FinanceOverview
              totalPaid={mockData.totalPaid}
              quarterlyPayments={mockData.quarterlyPayments}
              monthlyPayments={mockData.monthlyPayments}
            />
            <div className="flex flex-col gap-4 lg:flex-row">
              <FinanceCta />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <AssessmentBreakdown assessmentItems={assessmentItems} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FinanceAssessments;

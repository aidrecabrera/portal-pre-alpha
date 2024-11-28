import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { currencyPhpFormatter } from "@/lib/utils";
import { Download, Printer } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

export type TAssessmentItem = {
  chargeDescription: string;
  course: string;
  amount: number;
  category: "Tuition" | "Miscellaneous" | "Lab Fees";
};

export type TStudentAssessmentProps = {
  assessmentItems: TAssessmentItem[];
};

export const AssessmentBreakdown: React.FC<TStudentAssessmentProps> = ({
  assessmentItems,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const componentRef = useRef(null);

  const totalAssessment = assessmentItems.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  const categorizedItems = assessmentItems.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, TAssessmentItem[]>
  );

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Assessment Breakdown",
  });

  const handleExport = () => {
    console.log("Exporting assessment breakdown...");
  };

  const assessmentItemsSummary = [
    { chargeDescription: "Miscellaneous", amount: 2480.0 },
    { chargeDescription: "Tuition Fee", amount: 12535.0 },
    { chargeDescription: "Lab Fees", amount: 1500.0 },
  ];

  return (
    <Card className="w-full">
      <motion.div
        initial={false}
        animate={{ height: "auto" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="flex flex-col gap-2 p-4 sm:p-6" ref={componentRef}>
          <div className="flex flex-col items-start justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0">
            <div className="flex flex-col w-full gap-3 print:hidden">
              <CardTitle>Assessment Breakdown</CardTitle>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-medium sm:text-4xl text-primary">
                  ₱ {totalAssessment.toFixed(2)}
                </span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handlePrint}>
                    <Printer className="w-4 h-4 mr-2" />
                    Print
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleExport}>
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                  >
                    {isCollapsed ? (
                      <ChevronDown className="w-4 h-4 mr-2" />
                    ) : (
                      <ChevronUp className="w-4 h-4 mr-2" />
                    )}
                    {isCollapsed ? "Expand" : "Collapse"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <AnimatePresence>
            {!isCollapsed ? (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-x-auto"
              >
                <Table>
                  <TableBody>
                    {Object.entries(categorizedItems).map(
                      ([category, items], index) => (
                        <React.Fragment key={category}>
                          <TableRow key={`${category}-${index}`}>
                            <TableCell
                              colSpan={4}
                              className="text-lg font-semibold border-t-0 border-b"
                            >
                              {category}
                            </TableCell>
                          </TableRow>
                          {items.map((item, index) => (
                            <TableRow
                              className="border-0"
                              key={`${category}-${index}`}
                            >
                              <TableCell>{item.chargeDescription}</TableCell>
                              <TableCell>{item.course}</TableCell>
                              <TableCell className="text-right"></TableCell>
                              <TableCell className="text-right">
                                {currencyPhpFormatter(item.amount)}
                              </TableCell>
                            </TableRow>
                          ))}
                          <TableRow className="border-0 border-t">
                            <TableCell
                              colSpan={3}
                              className="font-semibold text-left"
                            >
                              Subtotal for {category}
                            </TableCell>
                            <TableCell className="font-semibold text-right">
                              {currencyPhpFormatter(
                                items.reduce(
                                  (sum, item) => sum + item.amount,
                                  0
                                )
                              )}
                            </TableCell>
                          </TableRow>
                        </React.Fragment>
                      )
                    )}
                    <TableRow>
                      <TableCell
                        colSpan={3}
                        className="text-xl font-semibold text-left"
                      >
                        Total Assessment
                      </TableCell>
                      <TableCell className="text-xl font-bold text-right">
                        {currencyPhpFormatter(totalAssessment)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </motion.div>
            ) : (
              <div>
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-x-auto"
                  >
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Charge Description</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {assessmentItemsSummary.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>{item.chargeDescription}</TableCell>
                            <TableCell className="text-right">
                              {currencyPhpFormatter(item.amount)}
                            </TableCell>
                          </TableRow>
                        ))}
                        <TableRow>
                          <TableCell className="font-bold">
                            Total Assessment
                          </TableCell>
                          <TableCell className="font-bold text-right">
                            {currencyPhpFormatter(totalAssessment)}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </motion.div>
                </AnimatePresence>
              </div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </Card>
  );
};

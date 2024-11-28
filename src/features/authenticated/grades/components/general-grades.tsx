import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export const GeneralGrades = () => {
  return (
    <div className="border rounded-xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Code</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="text-center">Units</TableHead>
            <TableHead className="text-center">Hours</TableHead>
            <TableHead className="text-center">Prelim</TableHead>
            <TableHead className="text-center">Midterm</TableHead>
            <TableHead className="text-center">Finals</TableHead>
            <TableHead className="text-center">Average</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[
            {
              code: "CS 214",
              title: "Computer Networks Concepts and Theories",
              units: 3.0,
              hours: 0.0,
              prelim: "1.0",
              midterm: "1.0",
              finals: "1.0",
              average: 1.0,
            },
            {
              code: "IC 217",
              title: "Data Structures",
              units: 3.0,
              hours: 0.0,
              prelim: "1.0",
              midterm: "1.0",
              finals: "1.0",
              average: 1.0,
            },
            {
              code: "CS 213",
              title: "Database Management Systems",
              units: 3.0,
              hours: 0.0,
              prelim: "1.0",
              midterm: "1.0",
              finals: "1.0",
              average: 1.0,
            },
            {
              code: "CS 215",
              title: "Design and Analysis of Algorithm",
              units: 3.0,
              hours: 0.0,
              prelim: "1.0",
              midterm: "1.0",
              finals: "1.0",
              average: 1.0,
            },
            {
              code: "GE 215",
              title: "Life and Works of Jose Rizal",
              units: 3.0,
              hours: 0.0,
              prelim: "1.0",
              midterm: "1.0",
              finals: "1.0",
              average: 1.0,
            },
            {
              code: "PE 213",
              title: "Physical Activities Towards Health & Fitness 1",
              units: 2.0,
              hours: 0.0,
              prelim: "1.0",
              midterm: "1.0",
              finals: "1.0",
              average: 1.0,
            },
            {
              code: "GE 216",
              title: "Readings in Philippine History",
              units: 3.0,
              hours: 0.0,
              prelim: "1.0",
              midterm: "1.0",
              finals: "1.0",
              average: 1.0,
            },
          ].map((subject, index) => (
            <TableRow key={index} className={cn("h-14")}>
              <TableCell className="font-medium uppercase">
                {subject.code}
              </TableCell>
              <TableCell>{subject.title}</TableCell>
              <TableCell className="text-center">
                {subject.units.toFixed(2)}
              </TableCell>
              <TableCell className="text-center">
                {subject.hours.toFixed(2)}
              </TableCell>
              <TableCell className="text-center">{subject.prelim}</TableCell>
              <TableCell className="text-center">{subject.midterm}</TableCell>
              <TableCell className="text-center">{subject.finals}</TableCell>
              <TableCell className="font-semibold text-center">
                <Badge
                  variant="outline"
                  className={cn(
                    "",
                    subject.average <= 3.0
                      ? "bg-green-600 border-green-600 text-primary-foreground"
                      : "bg-red-600 border-red-600 text-primary-foreground"
                  )}
                >
                  {subject.average.toFixed(2)}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

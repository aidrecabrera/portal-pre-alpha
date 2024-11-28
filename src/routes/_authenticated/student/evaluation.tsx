import {
  ProgramEvaluationBanner,
  ProgramEvaluationTable,
  ProgramStudentInfo,
  ProgramStudentStatistics,
} from "@/features/authenticated/grades/components/program-evaluation-table";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/student/evaluation")({
  component: ProgramEvaluation,
});

function ProgramEvaluation() {
  return (
    <div className="flex flex-col gap-4">
      <ProgramEvaluationBanner program="BS Computer Science" />
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-5">
          <ProgramStudentInfo />
        </div>
        <div className="col-span-7">
          <ProgramStudentStatistics />
        </div>
      </div>
      <ProgramEvaluationTable />
    </div>
  );
}

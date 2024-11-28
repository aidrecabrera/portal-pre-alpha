import { GeneralGrades } from "@/features/authenticated/grades/components/general-grades";
import { OverviewGrades } from "@/features/authenticated/grades/components/overview-grades";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/student/records")({
  component: () => (
    <div className="flex flex-col gap-4">
      <OverviewGrades />
      <GeneralGrades />
    </div>
  ),
});

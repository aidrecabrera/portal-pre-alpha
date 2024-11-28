import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarDot } from "@phosphor-icons/react";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

enum SemesterType {
  FirstSemester = 0,
  SecondSemester = 1,
  Summer = 2,
  More = 3,
}

interface Semester {
  key: SemesterType;
  label: string;
}

interface AcademicYear {
  year: string;
  semesters: Semester[];
}

const academicYears: AcademicYear[] = [
  {
    year: "2023-2024",
    semesters: [
      { key: SemesterType.FirstSemester, label: "1st Semester" },
      { key: SemesterType.SecondSemester, label: "2nd Semester" },
    ],
  },
  {
    year: "2022-2023",
    semesters: [
      { key: SemesterType.FirstSemester, label: "1st Semester" },
      { key: SemesterType.SecondSemester, label: "2nd Semester" },
    ],
  },
  {
    year: "2021-2022",
    semesters: [
      { key: SemesterType.FirstSemester, label: "1st Semester" },
      { key: SemesterType.SecondSemester, label: "2nd Semester" },
    ],
  },
];

const summerSemesters = [
  { key: SemesterType.Summer, label: "Summer 2023" },
  { key: SemesterType.Summer, label: "Summer 2024" },
  { key: SemesterType.Summer, label: "Summer 2025" },
];

const formSchema = z.object({
  semesterType: z.string().optional(),
  year: z.string().min(1, { message: "Year is required" }),
});

type FormData = z.infer<typeof formSchema>;

const currentYear = new Date().getFullYear();
const yearOptions = Array.from({ length: 8 }, (_, index) =>
  (currentYear - index).toString()
);

export function SemesterDropdown() {
  const defaultSemester: string = `${academicYears[0].semesters[0].label} ${academicYears[0].year}`;
  const [selectedSemester, setSelectedSemester] =
    useState<string>(defaultSemester);
  const { control, handleSubmit, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      semesterType: "",
      year: "",
    },
  });

  const [isFormValid, setIsFormValid] = useState(true);

  const handleSemesterSelect = (label: string) => {
    setSelectedSemester(label);
  };

  const onSubmit = (data: FormData) => {
    if (!data.year) {
      setIsFormValid(false);
      return;
    }
    setIsFormValid(true);
    const label = data.semesterType
      ? `${data.semesterType} ${data.year}`
      : `Summer ${data.year}`;
    handleSemesterSelect(label);
    handleOpen();
    reset();
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpen}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="justify-between w-full text-xs text-left shadow-none"
            >
              <span> {selectedSemester}</span>
              <ChevronRight className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 -mt-[40px] ml-[275px]">
            <DropdownMenuLabel>Summer</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Academic Year</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    {summerSemesters.map((semester) => (
                      <DropdownMenuItem
                        key={semester.label}
                        onSelect={() => handleSemesterSelect(semester.label)}
                      >
                        {semester.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
            </DropdownMenuGroup>
            <DropdownMenuLabel>Semester</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>1st Semester</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    {academicYears.map((year) => (
                      <DropdownMenuItem
                        key={`${year.year}-1`}
                        onSelect={() =>
                          handleSemesterSelect(`${year.year} 1st Semester`)
                        }
                      >
                        {`${year.year} 1st Semester`}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>2nd Semester</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    {academicYears.map((year) => (
                      <DropdownMenuItem
                        key={`${year.year}-2`}
                        onSelect={() =>
                          handleSemesterSelect(`${year.year} 2nd Semester`)
                        }
                      >
                        {`${year.year} 2nd Semester`}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuItem asChild>
                <DialogTrigger>
                  <div className="flex flex-row items-center w-[197px]">
                    <span>Custom</span>
                    <CalendarDot className="w-4 h-4 ml-auto" />
                  </div>
                </DialogTrigger>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogContent>
          <DialogTitle>Select Additional Semester</DialogTitle>
          <DialogDescription>
            Choose a semester type and specify the year.
          </DialogDescription>
          <Tabs defaultValue="semester">
            <TabsList className="w-full">
              <TabsTrigger className="w-full" value="semester">
                Semester
              </TabsTrigger>
              <TabsTrigger className="w-full" value="summer">
                Summer
              </TabsTrigger>
            </TabsList>
            <TabsContent value="semester">
              <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-row space-x-2">
                  <Controller
                    name="semesterType"
                    control={control}
                    render={({
                      field,
                      fieldState,
                    }: {
                      field: any;
                      fieldState: any;
                    }) => (
                      <div>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a semester" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="1st Semester">
                                1st Semester
                              </SelectItem>
                              <SelectItem value="2nd Semester">
                                2nd Semester
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        {fieldState.error && (
                          <p className="text-red-600">
                            {fieldState.error.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                  <Controller
                    name="year"
                    control={control}
                    render={({
                      field,
                      fieldState,
                    }: {
                      field: any;
                      fieldState: any;
                    }) => (
                      <div>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a year" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Years</SelectLabel>
                              {yearOptions.map((year) => (
                                <SelectItem
                                  key={year}
                                  value={`${year}-${Number.parseInt(year) + 1}`}
                                >
                                  {year}-{Number.parseInt(year) + 1}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        {fieldState.error && (
                          <p className="text-red-600">
                            {fieldState.error.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                </div>
                <Button className="w-full" type="submit">
                  Add
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="summer">
              <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  name="year"
                  control={control}
                  render={({
                    field,
                    fieldState,
                  }: {
                    field: any;
                    fieldState: any;
                  }) => (
                    <div>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select a year" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Years</SelectLabel>
                            {yearOptions.map((year) => (
                              <SelectItem key={year} value={year}>
                                {year}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      {fieldState.error && (
                        <p className="text-red-600">
                          {fieldState.error.message}
                        </p>
                      )}
                    </div>
                  )}
                />
                <Button className="w-full" type="submit">
                  Add
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
}

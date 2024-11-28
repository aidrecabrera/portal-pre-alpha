import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { zodResolver } from "@hookform/resolvers/zod";
import { HashStraight } from "@phosphor-icons/react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const Route = createFileRoute("/_authenticated/profile")({
  component: StudentProfile,
});

function StudentProfile() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-6 auto-rows-auto">
      <div className="flex flex-col col-span-1 gap-4 md:col-span-4">
        <ProfileAcademicInformation />
        <StudentEnrollmentHistory />
      </div>
      <div className="flex flex-col w-full col-span-1 gap-4 md:col-span-2">
        <StudentGoogleSuite />
        <StudentChangePassword />
      </div>
    </div>
  );
}

function ProfileAcademicInformation() {
  return (
    <Card className="w-full">
      <CardHeader>
        <div>
          <Badge variant="outline">
            <HashStraight className="mr-1" />
            20241707
          </Badge>
        </div>
        <CardTitle className="inline-flex items-center gap-2">
          <h2 className="text-2xl font-bold">Cabrera, Aidre Love S.</h2>{" "}
        </CardTitle>
        <CardDescription>
          <h2>Bachelor of Science in Computer Science</h2>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Student ID</TableCell>
              <TableCell>2023-00904</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Program</TableCell>
              <TableCell>Bachelor of Science in Computer Science</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Major Study</TableCell>
              <TableCell>Data Science</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>College</TableCell>
              <TableCell>College of Information and Computing</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Campus</TableCell>
              <TableCell>obrero</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Year Level</TableCell>
              <TableCell>2nd Year</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Curriculum</TableCell>
              <TableCell>BSCS SY 2018-2019</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function StudentGoogleSuite() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Google Suite Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Google Email</TableCell>
              <TableCell>aidre.cabrera@cor-jesu.edu.ph</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Default Password</TableCell>
              <TableCell>Cjc@2023</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Status</TableCell>
              <TableCell>
                <Badge variant="default">Active</Badge>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function StudentEnrollmentHistory() {
  const [selectedYears, setSelectedYears] = useState<string[]>(["All"]);
  const years = ["All", "2023", "2022", "2021", "2020"];
  const handleYearChange = (year: string) => {
    if (year === "All") {
      setSelectedYears(["All"]);
    } else {
      const newSelectedYears = selectedYears.includes("All")
        ? [year]
        : selectedYears.includes(year)
          ? selectedYears.filter((y) => y !== year)
          : [...selectedYears, year];
      setSelectedYears(newSelectedYears.length ? newSelectedYears : ["All"]);
    }
  };

  const filteredEnrollments = Array.from({ length: 5 }).filter((_, index) => {
    if (
      !selectedYears.includes("All") &&
      !selectedYears.includes((index + 2020).toString())
    )
      return false;
    return true;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Enrollment History</CardTitle>
        <div className="flex space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                {selectedYears.includes("All")
                  ? "All Years"
                  : selectedYears.join(", ")}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {years.map((year) => (
                <DropdownMenuCheckboxItem
                  key={year}
                  checked={selectedYears.includes(year)}
                  onCheckedChange={() => handleYearChange(year)}
                >
                  {year}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent className="-ml-4">
              {filteredEnrollments.map((_, index) => (
                <CarouselItem
                  key={index}
                  className="pl-2 basis-1/2 lg:basis-1/3 md:pl-4"
                >
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex items-center justify-center p-6 aspect-square">
                        <span className="text-3xl font-semibold">
                          {index + 1}
                        </span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </CardContent>
    </Card>
  );
}

const animationConfig = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
  item: {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  },
  button: {
    rest: { scale: 1 },
    hover: { scale: 1.05 },
    pressed: { scale: 0.95 },
  },
};

type PasswordInputProps = {
  name: string;
  label: string;
  onChange?: (value: string) => void;
};

type PasswordStrengthIndicatorProps = {
  strength: number;
};

type PasswordRequirements = {
  length: boolean;
  uppercase: boolean;
  lowercase: boolean;
  number: boolean;
  special: boolean;
};

type PasswordRequirementsProps = {
  requirements: PasswordRequirements;
};

const passwordChangeSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const PasswordInput = ({ name, label, onChange }: PasswordInputProps) => (
  <motion.div variants={animationConfig.item}>
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type="password"
              {...field}
              className="w-full"
              onChange={(e) => {
                field.onChange(e);
                if (onChange) onChange(e.target.value);
              }}
            />
          </FormControl>
        </FormItem>
      )}
    />
  </motion.div>
);

const PasswordStrengthIndicator = ({
  strength,
}: PasswordStrengthIndicatorProps) => (
  <div className="mt-2">
    <div className="flex justify-between mb-1 text-sm">
      <span>Password strength:</span>
      <span>{["Weak", "Fair", "Good", "Strong", "Very Strong"][strength]}</span>
    </div>
    <div className="w-full h-2 bg-gray-200 rounded-full">
      <motion.div
        className="h-2 bg-blue-600 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${(strength / 5) * 100}%` }}
        transition={{ duration: 0.3 }}
      />
    </div>
  </div>
);

const PasswordRequirements = ({ requirements }: PasswordRequirementsProps) => (
  <ul className="mt-2 space-y-1 text-xs">
    {Object.entries(requirements).map(([key, met]) => (
      <li key={key} className={met ? "text-green-600" : "text-gray-600"}>
        {key === "length" ? "Minimum of 8 characters" : `A ${key} character`}
      </li>
    ))}
  </ul>
);

function StudentChangePassword() {
  const form = useForm<z.infer<typeof passwordChangeSchema>>({
    resolver: zodResolver(passwordChangeSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const [passwordStrength, setPasswordStrength] = useState(0);
  const [requirements, setRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  const onSubmit = (values: z.infer<typeof passwordChangeSchema>) => {
    console.log(values);
  };

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    const newRequirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
    };

    setRequirements(newRequirements);

    strength = Object.values(newRequirements).filter(Boolean).length;
    setPasswordStrength(strength);
  };
  return (
    <motion.div
      className="w-full"
      initial="hidden"
      animate="visible"
      variants={animationConfig.container}
    >
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="-mb-3 text-2xl font-bold">
            Change Password
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <PasswordInput name="currentPassword" label="Current Password" />
              <PasswordInput
                name="newPassword"
                label="New Password"
                onChange={calculatePasswordStrength}
              />
              <PasswordStrengthIndicator strength={passwordStrength} />
              <PasswordRequirements requirements={requirements} />
              <PasswordInput
                name="confirmPassword"
                label="Confirm New Password"
              />
              <motion.div
                variants={animationConfig.item}
                whileHover="hover"
                whileTap="pressed"
              >
                <Button type="submit" className="w-full">
                  Change Password
                </Button>
              </motion.div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  );
}

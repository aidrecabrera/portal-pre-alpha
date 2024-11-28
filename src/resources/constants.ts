import {
  AddressBook,
  Article,
  ChalkboardTeacher,
  CreditCard,
  Exam,
  GraduationCap,
  IconProps,
  Megaphone,
  Money,
  Receipt,
  SquaresFour,
  User,
} from "@phosphor-icons/react";

import { getAllRoutes } from "./routes";

type RoutesPaths = typeof getAllRoutes extends () => (infer R)[] ? R : never;

export interface IRouteInterface {
  to: RoutesPaths;
  label: string;
  icon: React.ComponentType<IconProps>;
  children?: IRouteInterface[];
}

export const routes: IRouteInterface[] = [
  { to: "/", label: "Dashboard", icon: SquaresFour },
  { to: "/profile", label: "Profile", icon: User },
  { to: "/announcement", label: "Announcement", icon: Megaphone },
  { to: "/classes", label: "Classes", icon: ChalkboardTeacher },
  {
    to: "/finance",
    label: "Finance",
    icon: Money,
    children: [
      {
        to: "/finance/assessment",
        label: "Assessment",
        icon: Receipt,
      },
      {
        to: "/finance/ledger",
        label: "Ledger",
        icon: AddressBook,
      },
      {
        to: "/finance/payment",
        label: "Payment",
        icon: CreditCard,
      },
    ],
  },
  {
    to: "/transcript",
    label: "Records & Admissions",
    icon: Article,
    children: [
      { to: "/student/records", label: "Student Records", icon: Exam },
      {
        to: "/student/evaluation",
        label: "Program Evaluation",
        icon: GraduationCap,
      },
    ],
  },
  // {
  //   to: "/services",
  //   label: "Services",
  //   icon: ChalkboardTeacher,
  //   children: [
  //     {
  //       to: "/services/promissory",
  //       label: "Promissory",
  //       icon: Note,
  //     },
  //     {
  //       to: "/services/excess-option",
  //       label: "Excess Option",
  //       icon: HandCoins,
  //     },
  //     {
  //       to: "/services/scholarship",
  //       label: "Scholarships",
  //       icon: Student,
  //     },
  //   ],
  // },
];

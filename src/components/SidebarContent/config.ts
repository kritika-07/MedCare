import {
  FiHome,
  FiBook,
  FiFilePlus,
  FiCalendar,
  FiUsers,
  FiList,
  FiClock,
  FiDroplet,
} from "react-icons/fi";
import { GrHistory } from "react-icons/gr";

export const DoctorLinks = [
  { name: "Home", icon: FiHome, href: "/" },
  { name: "Register EMR", icon: FiBook, href: "/emr-history" },
  { name: "Add EMR", icon: FiFilePlus, href: "/add-emr" },
];

export const PatientLinks = [
  { name: "Home", icon: FiHome, href: "/" },
  { name: "Reservation Form", icon: FiCalendar, href: "/form-reservasi" },
  { name: "EMR history", icon: FiBook, href: "/my-emr" },
  {
    name: "Reservation History",
    icon: GrHistory,
    href: "/reservation-history",
  },
];

export const AdminLinks = [
  { name: "Home", icon: FiHome, href: "/" },
  { name: "Medicine", icon: FiList, href: "/medicine" },
  { name: "Schedule", icon: FiClock, href: "/schedule" },
  { name: "Application Users", icon: FiUsers, href: "/user" },
];

export const ReceptionistLinks = [
  { name: "Home", icon: FiHome, href: "/" },
  { name: "Patient queue", icon: FiUsers, href: "/queue-patient" },
  { name: "Medicine Queue", icon: FiDroplet, href: "/queue-medicine" },
];

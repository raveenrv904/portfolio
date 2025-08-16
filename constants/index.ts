import { Archive, CheckCircle, Circle, Clock } from "lucide-react";

export const statusOptions = [
  {
    value: "completed",
    label: "Completed",
    icon: CheckCircle,
    color: "text-green-600",
  },
  {
    value: "development",
    label: "In Development",
    icon: Clock,
    color: "text-blue-600",
  },
  {
    value: "planning",
    label: "Planning",
    icon: Circle,
    color: "text-yellow-600",
  },
  {
    value: "archived",
    label: "Archived",
    icon: Archive,
    color: "text-gray-600",
  },
];

export const currentUser = {
  agency: "Export Services Division",
  name: "John Smith",
  roles: ["Export officer", "Approver", "Dairy exports"],
  jobtitle: "Senior assessment officer",
};

export const summaryCards = [
  {
    label: "Open tasks",
    href: "#dashboard-tasks",
    value: "8",
    description: "Assigned actions awaiting review",
  },
  {
    label: "Due today",
    href: "#dashboard-tasks",
    value: "3",
    description: "Tasks that need attention today",
  },
  {
    label: "Active jobs",
    href: "#dashboard-jobs",
    value: "12",
    description: "Applications in your work queue",
  },
  {
    label: "Unread messages",
    href: "#",
    value: "5",
    description: "New comments and service updates",
  },
];

export const assignedTasks = [
  {
    due: "Today",
    priority: "High",
    reference: "TASK-1048",
    status: "Ready for review",
    statusTone: "infoHigh",
    title: "Review supporting evidence",
  },
  {
    due: "Today",
    priority: "High",
    reference: "TASK-1049",
    status: "Action required",
    statusTone: "warningHigh",
    title: "Respond to exporter query",
  },
  {
    due: "Tomorrow",
    priority: "Medium",
    reference: "TASK-1050",
    status: "In progress",
    statusTone: "inProgressLow",
    title: "Check establishment accreditation",
  },
] as const;

export const assignedJobs = [
  {
    applicant: "Harbour Exports Pty Ltd",
    due: "31 May 2026",
    reference: "EX-2026-0184",
    stage: "Assessment",
    status: "In progress",
    statusTone: "inProgressLow",
    type: "Export certificate",
  },
  {
    applicant: "Southern Dairy Cooperative",
    due: "1 Jun 2026",
    reference: "EX-2026-0185",
    stage: "Quality review",
    status: "Ready",
    statusTone: "successLow",
    type: "Market access request",
  },
  {
    applicant: "Australian Grain Traders",
    due: "3 Jun 2026",
    reference: "EX-2026-0186",
    stage: "Information request",
    status: "Waiting",
    statusTone: "pausedLow",
    type: "Inspection booking",
  },
] as const;

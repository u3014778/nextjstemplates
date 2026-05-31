export const pageAlerts = [
  {
    id: "service-unavailable",
    tone: "error",
    title: "Service unavailable",
    message:
      "Export application services are currently unavailable. Try again later or contact support if the issue continues.",
  },
  {
    id: "scheduled-maintenance",
    tone: "warning",
    title: "Scheduled maintenance",
    message:
      "Online services will be unavailable from 8:00 pm to 11:00 pm AEST on Saturday while maintenance is completed.",
  },
  {
    id: "request-submitted",
    tone: "success",
    title: "Request submitted",
    message:
      "Your request has been received. We have sent a confirmation email with your reference number.",
  },
] as const;

export const sectionAlerts = [
  {
    id: "action-required",
    tone: "warning",
    title: "Action required",
    message:
      "Some supporting documents are missing. Upload the requested files before submitting this application.",
  },
  {
    id: "processing-update",
    tone: "infoHigh",
    title: "Processing update",
    message:
      "Applications for this market are currently taking up to seven business days to review.",
  },
] as const;

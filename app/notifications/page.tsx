"use client";

import { useState } from "react";
import { Box } from "@ag.ds-next/react/box";
import { Button } from "@ag.ds-next/react/button";
import { Callout } from "@ag.ds-next/react/callout";
import { Content } from "@ag.ds-next/react/content";
import { H1, H2 } from "@ag.ds-next/react/heading";
import { PageAlert } from "@ag.ds-next/react/page-alert";
import { Prose } from "@ag.ds-next/react/prose";
import { SectionAlert } from "@ag.ds-next/react/section-alert";
import { Stack } from "@ag.ds-next/react/stack";
import { Text } from "@ag.ds-next/react/text";

const pageAlerts = [
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

const sectionAlerts = [
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

export default function NotificationsPage() {
  const [dismissedNotifications, setDismissedNotifications] = useState<
    string[]
  >([]);

  const dismissNotification = (id: string) => {
    setDismissedNotifications((currentNotifications) => [
      ...currentNotifications,
      id,
    ]);
  };

  return (
    <Content>
      <Box paddingY={3}>
        <Stack gap={3}>
          <Prose>
            <H1>Notifications</H1>
            <Text as="p" fontSize="md">
              Use these notification patterns for service status messages,
              planned maintenance, confirmations and updates.
            </Text>
          </Prose>

          {dismissedNotifications.length > 0 ? (
            <Box>
              <Button
                onClick={() => setDismissedNotifications([])}
                type="button"
                variant="secondary"
              >
                Show all notifications
              </Button>
            </Box>
          ) : null}

          <Stack gap={1.5}>
            <H2>Page-level messages</H2>
            {pageAlerts
              .filter((alert) => !dismissedNotifications.includes(alert.id))
              .map((alert) => (
                <PageAlert
                  key={alert.id}
                  onDismiss={() => dismissNotification(alert.id)}
                  tone={alert.tone}
                  title={alert.title}
                >
                  {alert.message}
                </PageAlert>
              ))}
          </Stack>

          <Stack gap={1.5}>
            <H2>Section messages</H2>
            {sectionAlerts
              .filter((alert) => !dismissedNotifications.includes(alert.id))
              .map((alert) => (
                <SectionAlert
                  key={alert.id}
                  onDismiss={() => dismissNotification(alert.id)}
                  tone={alert.tone}
                  title={alert.title}
                >
                  {alert.message}
                </SectionAlert>
              ))}
          </Stack>

          <Callout title="When to use notifications">
            Use page alerts for messages that affect the whole task or page.
            Use section alerts when the message belongs to one part of a form,
            application or workflow.
          </Callout>
        </Stack>
      </Box>
    </Content>
  );
}

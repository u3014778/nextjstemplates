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
import { pageAlerts, sectionAlerts } from "@/TestData/notificationData";

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

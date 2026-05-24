import { Box } from "@ag.ds-next/react/box";
import { Callout } from "@ag.ds-next/react/callout";
import { Content } from "@ag.ds-next/react/content";
import { H1, H2 } from "@ag.ds-next/react/heading";
import { PageAlert } from "@ag.ds-next/react/page-alert";
import { Prose } from "@ag.ds-next/react/prose";
import { SectionAlert } from "@ag.ds-next/react/section-alert";
import { Stack } from "@ag.ds-next/react/stack";
import { Text } from "@ag.ds-next/react/text";

export default function NotificationsPage() {
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

          <Stack gap={1.5}>
            <H2>Page-level messages</H2>
            <PageAlert tone="error" title="Service unavailable">
              Export application services are currently unavailable. Try again
              later or contact support if the issue continues.
            </PageAlert>

            <PageAlert tone="warning" title="Scheduled maintenance">
              Online services will be unavailable from 8:00 pm to 11:00 pm AEST
              on Saturday while maintenance is completed.
            </PageAlert>

            <PageAlert tone="success" title="Request submitted">
              Your request has been received. We have sent a confirmation email
              with your reference number.
            </PageAlert>
          </Stack>

          <Stack gap={1.5}>
            <H2>Section messages</H2>
            <SectionAlert tone="warning" title="Action required">
              Some supporting documents are missing. Upload the requested files
              before submitting this application.
            </SectionAlert>

            <SectionAlert tone="infoHigh" title="Processing update">
              Applications for this market are currently taking up to seven
              business days to review.
            </SectionAlert>
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

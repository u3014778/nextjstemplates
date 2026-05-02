"use client";

import { Box } from "@ag.ds-next/react/box";
import { Callout } from "@ag.ds-next/react/callout";
import { H1, H2 } from "@ag.ds-next/react/heading";
import { Prose } from "@ag.ds-next/react/prose";
import { Stack } from "@ag.ds-next/react/stack";
import {
  SummaryList,
  SummaryListItem,
  SummaryListItemDescription,
  SummaryListItemTerm,
} from "@ag.ds-next/react/summary-list";
import { Content } from "@ag.ds-next/react/content";
import { Text } from "@ag.ds-next/react/text";

export default function ContentPage() {
  return (
    <Content>
      <Box paddingY={3}>
        <Stack gap={3}>
          <Prose>
            <H1>Preparing export documentation</H1>
            <br/>
            <Text as="p" fontSize="md">
              Use this content page structure for guidance, policy summaries
              and long-form service information.
            </Text>
            <br/>
            <br/>
            <H2>Before you begin</H2>
            <Text as="p" fontSize="sm">
              Confirm the importing market requirements, gather supporting
              evidence and make sure establishment details are current.
            </Text>
          </Prose>

          <Callout title="Processing times">
            Most complete documentation requests are reviewed within five
            business days.
          </Callout>

          <SummaryList>
            <SummaryListItem>
              <SummaryListItemTerm>Template type</SummaryListItemTerm>
              <SummaryListItemDescription>
                Long-form content page
              </SummaryListItemDescription>
            </SummaryListItem>
            <SummaryListItem>
              <SummaryListItemTerm>Useful for</SummaryListItemTerm>
              <SummaryListItemDescription>
                Guidance, requirements and service instructions
              </SummaryListItemDescription>
            </SummaryListItem>
          </SummaryList>
        </Stack>
      </Box>
    </Content>
  );
}

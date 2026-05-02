"use client";

import { Box } from "@ag.ds-next/react/box";
import { ButtonLink } from "@ag.ds-next/react/button";
import { Card, CardInner, CardLink } from "@ag.ds-next/react/card";
import { Columns } from "@ag.ds-next/react/columns";
import { Content } from "@ag.ds-next/react/content";
import { H1, H2, H3 } from "@ag.ds-next/react/heading";
import { HeroBanner } from "@ag.ds-next/react/hero-banner";
import { Stack } from "@ag.ds-next/react/stack";
import { Text } from "@ag.ds-next/react/text";

const serviceCards = [
  {
    title: "Apply for an export certificate",
    href: "#",
    text: "Prepare a new application and check supporting evidence before submission.",
  },
  {
    title: "Track an application",
    href: "#",
    text: "View status, respond to requests and download approved documents.",
  },
  {
    title: "Manage establishment details",
    href: "#",
    text: "Keep contact, premises and accreditation information up to date.",
  },
];

export default function HomePage() {
  return (
    <>
      <HeroBanner background="bodyAlt">
        <Box paddingY={4}>
          <Stack gap={2}>
            <H1>Export services</H1>
            <Text fontSize="lg">
              Manage applications, track approvals and keep export information
              current in one place.
            </Text>
            <Box display="flex" flexWrap="wrap" gap={1}>
              <ButtonLink href="#">Start an application</ButtonLink>
              <ButtonLink href="#" variant="secondary">
                Sign in
              </ButtonLink>
            </Box>
          </Stack>
        </Box>
      </HeroBanner>

      <Content>
        <Box paddingY={3}>
          <Stack gap={1}>
            <H2>Services</H2>
            <Columns
              as="ul"
              cols={{ xs: 1, md: 3 }}
              gap={1.5}
              style={{ listStyle: "none", margin: 0, padding: 0 }}
            >
              {serviceCards.map((card) => (
                <Card as="li" clickable key={card.title}>
                  <CardInner>
                    <Stack gap={1}>
                      <H3>
                        <CardLink href={card.href}>{card.title}</CardLink>
                      </H3>
                      <Text>{card.text}</Text>
                    </Stack>
                  </CardInner>
                </Card>
              ))}
            </Columns>
          </Stack>
        </Box>
      </Content>
    </>
  );
}

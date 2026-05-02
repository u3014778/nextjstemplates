"use client";

import { Box } from "@ag.ds-next/react/box";
import { Button } from "@ag.ds-next/react/button";
import { ControlGroup } from "@ag.ds-next/react/control-group";
import { FormStack } from "@ag.ds-next/react/form-stack";
import { H1 } from "@ag.ds-next/react/heading";
import { Prose } from "@ag.ds-next/react/prose";
import { Radio } from "@ag.ds-next/react/radio";
import { Stack } from "@ag.ds-next/react/stack";
import { Textarea } from "@ag.ds-next/react/textarea";
import { TextInput } from "@ag.ds-next/react/text-input";
import { Content } from "@ag.ds-next/react/content";
import { Breadcrumbs } from "@ag.ds-next/react/breadcrumbs";
import { Text } from "@ag.ds-next/react/text";

export default function SinglePageForm() {
  return (
    <Content>
      <Box paddingY={3}>
        <Stack gap={3}>
          <Breadcrumbs
            links={[
              { href: '/', label: 'Home' },
              { href: '/forms', label: 'Forms' },
              { label: 'Single-page form' },
            ]}
          />
          <Prose>
            <H1>Request a document review</H1>
            <Text as="p" fontSize="sm">
              Use this form page structure for short, single-step transactions.
            </Text>
          </Prose>

          <Box as="form">
            <FormStack>
              <TextInput
                id="full-name"
                label="Full name"
                name="fullName"
                required
              />
              <TextInput
                id="email"
                label="Email address"
                name="email"
                required
                type="email"
              />
              <ControlGroup
                block
                label="What type of document do you need reviewed?"
                name="documentType"
                required
              >
                <Radio id="export-certificate" value="certificate">
                  Export certificate
                </Radio>
                <Radio id="supporting-evidence" value="evidence">
                  Supporting evidence
                </Radio>
                <Radio id="other-document" value="other">
                  Other document
                </Radio>
              </ControlGroup>
              <Textarea
                id="notes"
                label="Additional details"
                name="notes"
                rows={5}
                block
              />
              <Button type="submit" alignSelf="flex-start">
                Submit request
              </Button>
            </FormStack>
          </Box>
        </Stack>
      </Box>
    </Content>
  );
}

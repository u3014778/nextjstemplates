import { Box } from "@ag.ds-next/react/box";
import { Breadcrumbs } from "@ag.ds-next/react/breadcrumbs";
import { Card, CardInner, CardLink } from "@ag.ds-next/react/card";
import { Columns } from "@ag.ds-next/react/columns";
import { Content } from "@ag.ds-next/react/content";
import { H1, H2 } from "@ag.ds-next/react/heading";
import { Prose } from "@ag.ds-next/react/prose";
import { Stack } from "@ag.ds-next/react/stack";
import { Text } from "@ag.ds-next/react/text";
import { formTemplates } from "@/TestData/formData";

export default function FormsPage() {
  return (
    <Content>
      <Box paddingY={3}>
        <Stack gap={3}>
          <Breadcrumbs
            links={[
              { href: '/', label: 'Home' },
              { label: 'Forms' },
            ]}
          />

          <Prose>
            <H1>Forms</H1>
            <Text as="p" fontSize="sm">
              Use these templates to start common form patterns for services
              and applications.
            </Text>
          </Prose>

          <Stack gap={1.5}>
            <H2>Choose a form template</H2>
            <Columns
              as="ul"
              cols={{ xs: 1, md: 2 }}
              gap={1.5}
              style={{ listStyle: "none", margin: 0, padding: 0 }}
            >
              {formTemplates.map((template) => (
                <Card as="li" clickable key={template.href}>
                  <CardInner>
                    <Stack gap={1}>
                      <H2>
                        <CardLink href={template.href}>
                          {template.title}
                        </CardLink>
                      </H2>
                      <Text>{template.description}</Text>
                    </Stack>
                  </CardInner>
                </Card>
              ))}
            </Columns>
          </Stack>
        </Stack>
      </Box>
    </Content>
  );
}

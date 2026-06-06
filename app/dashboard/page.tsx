import { Box } from "@ag.ds-next/react/box";
import { ButtonLink } from "@ag.ds-next/react/button";
import { Card, CardInner, CardLink } from "@ag.ds-next/react/card";
import { Columns } from "@ag.ds-next/react/columns";
import { Content } from "@ag.ds-next/react/content";
import { H1, H2 } from "@ag.ds-next/react/heading";
import { Prose } from "@ag.ds-next/react/prose";
import { Stack } from "@ag.ds-next/react/stack";
import { StatusBadge } from "@ag.ds-next/react/status-badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableWrapper,
} from "@ag.ds-next/react/table";
import { Text } from "@ag.ds-next/react/text";
import { TextLink } from "@ag.ds-next/react/text-link";
import {
  assignedJobs,
  assignedTasks,
  summaryCards,
} from "@/TestData/dashboardData";

export default function DashboardPage() {
  return (
    <Content>
      <Box paddingY={3}>
        <Stack gap={3}>
          <div className="dashboardHero">
            <Prose>
              <H1>Dashboard</H1>
              <Text as="p" fontSize="md">
                Manage your assigned tasks and jobs from one place.
              </Text>
            </Prose>
            <div className="dashboardHeroActions">
              <ButtonLink >Start task</ButtonLink>
              <ButtonLink href="#" variant="secondary">
                Search records
              </ButtonLink>
            </div>
          </div>

          <Columns
            as="ul"
            className="dashboardSummaryList"
            cols={{ xs: 1, sm: 2, lg: 4 }}
            gap={1}
          >
            {summaryCards.map((summary) => (
              <Card as="li" clickable key={summary.label}>
                <CardInner>
                  <Stack gap={0.5}>
                    <Text as="p" fontSize="sm" fontWeight="bold">
                      <CardLink href={summary.href}>{summary.label}</CardLink>
                    </Text>
                    <Text as="p" className="dashboardMetric">
                      {summary.value}
                    </Text>
                    <Text as="p" fontSize="sm">
                      {summary.description}
                    </Text>
                  </Stack>
                </CardInner>
              </Card>
            ))}
          </Columns>

          <Stack gap={2}>
            <Stack gap={1.5}>
              <div className="dashboardSectionHeader">
                <H2 id="dashboard-tasks">My tasks</H2>
                <TextLink href="#">View all tasks</TextLink>
              </div>
              <div className="dashboardTableWrapper">
                <TableWrapper>
                  <Table tableLayout="fixed">
                    <TableCaption>Tasks assigned to you</TableCaption>
                    <TableHead>
                      <TableRow>
                        <TableHeader width="18rem">Task</TableHeader>
                        <TableHeader width="8rem">Priority</TableHeader>
                        <TableHeader width="9rem">Due</TableHeader>
                        <TableHeader width="11rem">Status</TableHeader>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {assignedTasks.map((task) => (
                        <TableRow key={task.reference}>
                          <TableCell as="th" scope="row">
                            <Stack gap={0.25}>
                              <TextLink href="#">{task.title}</TextLink>
                              <Text as="span" fontSize="sm">
                                {task.reference}
                              </Text>
                            </Stack>
                          </TableCell>
                          <TableCell>{task.priority}</TableCell>
                          <TableCell>{task.due}</TableCell>
                          <TableCell>
                            <StatusBadge
                              label={task.status}
                              tone={task.statusTone}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableWrapper>
              </div>
            </Stack>

            <Stack gap={1.5}>
              <div className="dashboardSectionHeader">
                <H2 id="dashboard-jobs">My jobs</H2>
                <TextLink href="#">View all jobs</TextLink>
              </div>
              <div className="dashboardTableWrapper">
                <TableWrapper>
                  <Table tableLayout="fixed">
                    <TableCaption>Jobs assigned to you</TableCaption>
                    <TableHead>
                      <TableRow>
                        <TableHeader>Reference</TableHeader>
                        <TableHeader>Applicant</TableHeader>
                        <TableHeader>Stage</TableHeader>
                        <TableHeader width="9rem">Due</TableHeader>
                        <TableHeader width="10rem">Status</TableHeader>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {assignedJobs.map((job) => (
                        <TableRow key={job.reference}>
                          <TableCell as="th" scope="row">
                            <Stack gap={0.25}>
                              <TextLink href="#">{job.reference}</TextLink>
                              <Text as="span" fontSize="sm">
                                {job.type}
                              </Text>
                            </Stack>
                          </TableCell>
                          <TableCell>{job.applicant}</TableCell>
                          <TableCell>{job.stage}</TableCell>
                          <TableCell>{job.due}</TableCell>
                          <TableCell>
                            <StatusBadge
                              label={job.status}
                              tone={job.statusTone}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableWrapper>
              </div>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Content>
  );
}

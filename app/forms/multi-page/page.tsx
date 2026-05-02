"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Box } from "@ag.ds-next/react/box";
import { Button } from "@ag.ds-next/react/button";
import { ControlGroup } from "@ag.ds-next/react/control-group";
import { Content } from "@ag.ds-next/react/content";
import {
  FileUpload,
  type FileWithStatus,
} from "@ag.ds-next/react/file-upload";
import { FormStack } from "@ag.ds-next/react/form-stack";
import { H1, H2 } from "@ag.ds-next/react/heading";
import { ProgressIndicator } from "@ag.ds-next/react/progress-indicator";
import { Prose } from "@ag.ds-next/react/prose";
import { Radio } from "@ag.ds-next/react/radio";
import { Stack } from "@ag.ds-next/react/stack";
import { Textarea } from "@ag.ds-next/react/textarea";
import { TextInput } from "@ag.ds-next/react/text-input";
import { Breadcrumbs } from "@ag.ds-next/react/breadcrumbs";
import { Text } from "@ag.ds-next/react/text";

const steps = [
  { label: "Step 1 of 3: Applicant details" },
  { label: "Step 2 of 3: Export details" },
  { label: "Step 3 of 3: Review notes" },
];

function StepContent({
  activeStepIndex,
  uploadedFiles,
  setUploadedFiles,
}: {
  activeStepIndex: number;
  uploadedFiles: FileWithStatus[];
  setUploadedFiles: Dispatch<SetStateAction<FileWithStatus[]>>;
}) {
  if (activeStepIndex === 0) {
    return (
      <Stack gap={1}>
        <H2>Step 1 of 3: Applicant details</H2>
        <TextInput
          id="business-name"
          label="Business name"
          name="businessName"
          required
        />
        <TextInput
          id="contact-email"
          label="Contact email"
          name="contactEmail"
          required
          type="email"
        />
      </Stack>
    );
  }

  if (activeStepIndex === 1) {
    return (
      <Stack gap={1}>
        <H2>Step 2 of 3: Export details</H2>
        <ControlGroup
          block
          label="What are you exporting?"
          name="exportType"
          required
        >
          <Radio id="plant-products" value="plant-products">
            Plant products
          </Radio>
          <Radio id="animal-products" value="animal-products">
            Animal products
          </Radio>
          <Radio id="other-products" value="other">
            Other products
          </Radio>
        </ControlGroup>
        <TextInput
          id="destination-market"
          label="Destination market"
          name="destinationMarket"
          required
        />
      </Stack>
    );
  }

  return (
    <Stack gap={1}>
      <H2>Step 3 of 3: Review notes</H2>
      <Textarea
        id="supporting-notes"
        label="Supporting notes"
        name="supportingNotes"
        rows={5}
        block
      />
      <FileUpload
        id="supporting-documents"
        name="supportingDocuments"
        label="Upload supporting documents"
        hint="Accepted formats: PDF, JPG or PNG. Maximum size 10MB per file."
        accept={["application/pdf", "image/jpeg", "image/png"]}
        maxSize={10240}
        multiple
        value={uploadedFiles}
        onChange={setUploadedFiles}
      />
    </Stack>
  );
}

export default function MultiPageForm() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState<FileWithStatus[]>([]);
  const activeStep = steps[activeStepIndex];
  const isFirstStep = activeStepIndex === 0;
  const isLastStep = activeStepIndex === steps.length - 1;

  return (
    <Content>
      <Box paddingY={3}>
        <Stack gap={3}>
          <Breadcrumbs
            links={[
              { href: "/", label: "Home" },
              { href: "/forms", label: "Forms" },
              { label: "Multi-page form" },
            ]}
          />

          <Prose>
            <H1>Export application</H1>
            <Text as="p" fontSize="sm">
              Use this multi-page form pattern for longer transactions that
              need to be broken into clear steps.
            </Text>
          </Prose>

          <div className="multiPageFormLayout">
            <div className="multiPageFormProgress">
              <ProgressIndicator
                activePath={activeStep.label}
                items={steps.map((step, index) => ({
                  label: step.label,
                  onClick: () => setActiveStepIndex(index),
                  status:
                    index < activeStepIndex
                      ? "done"
                      : index === activeStepIndex
                      ? "started"
                      : "todo",
                  type: "button",
                }))}
              />
            </div>

            <Box as="form" onSubmit={(event) => event.preventDefault()}>
              <FormStack>
                <StepContent
                  activeStepIndex={activeStepIndex}
                  uploadedFiles={uploadedFiles}
                  setUploadedFiles={setUploadedFiles}
                />

                <div className="multiPageFormActions">
                  {!isFirstStep && (
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => setActiveStepIndex(activeStepIndex - 1)}
                    >
                      Back
                    </Button>
                  )}
                  <Button
                    type={isLastStep ? "submit" : "button"}
                    onClick={() => {
                      if (!isLastStep) setActiveStepIndex(activeStepIndex + 1);
                    }}
                  >
                    {isLastStep ? "Submit" : "Continue"}
                  </Button>
                  <Button type="button" variant="tertiary">
                    Save and exit
                  </Button>
                </div>
              </FormStack>
            </Box>
          </div>
        </Stack>
      </Box>
    </Content>
  );
}

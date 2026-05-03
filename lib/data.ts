export const resultStatuses = [
  "Draft",
  "Submitted",
  "In review",
  "Approved",
] as const;

export const commodities = ["Beef", "Dairy", "Grain", "Seafood", "Wool"] as const;

export const markets = [
  "Australia",
  "Indonesia",
  "Japan",
  "Singapore",
  "Vietnam",
] as const;

export type SearchResult = {
  applicant: string;
  commodity: (typeof commodities)[number];
  market: (typeof markets)[number];
  reference: string;
  status: (typeof resultStatuses)[number];
  submitted: string;
};

const applicantNames = [
  "Harbour Exports Pty Ltd",
  "Northern Grain Co",
  "Riverland Dairy",
  "Coastal Wool Exporters",
  "Southern Beef Partners",
  "Bluewater Trading",
  "Goldfields Grain",
  "Hinterland Dairy Group",
  "Western Wool Collective",
  "Oak Ridge Beef",
  "Coral Coast Seafood",
  "Central Plains Grain",
  "Sunrise Pastoral",
  "Evergreen Produce Logistics",
  "Southern Cross Export Group",
] as const;

export const searchResults: SearchResult[] = Array.from(
  { length: 300 },
  (_, index) => {
    const recordNumber = 1300 - index;
    const commodity = commodities[index % commodities.length];
    const market = markets[index % markets.length];
    const status = resultStatuses[index % resultStatuses.length];
    const applicant = applicantNames[index % applicantNames.length];
    const submittedDate = new Date(Date.UTC(2026, 4, 3 - (index % 28)));

    return {
      reference: `EX-2026-${recordNumber}`,
      applicant,
      commodity,
      market,
      status,
      submitted: submittedDate.toLocaleDateString("en-AU", {
        day: "numeric",
        month: "short",
        year: "numeric",
        timeZone: "UTC",
      }),
    };
  }
);

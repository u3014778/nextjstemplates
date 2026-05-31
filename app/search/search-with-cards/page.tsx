"use client";

import { type ChangeEvent, useMemo, useState } from "react";
import { Box } from "@ag.ds-next/react/box";
import { Button } from "@ag.ds-next/react/button";
import { Card, CardInner, CardLink } from "@ag.ds-next/react/card";
import { Columns } from "@ag.ds-next/react/columns";
import { Content } from "@ag.ds-next/react/content";
import { Divider } from "@ag.ds-next/react/divider";
import { Flex } from "@ag.ds-next/react/flex";
import { H1, H2, H3 } from "@ag.ds-next/react/heading";
import { CloseIcon, FilterIcon, HelpIcon } from "@ag.ds-next/react/icon";
import {
  PaginationButtons,
  generatePaginationRangeText,
} from "@ag.ds-next/react/pagination";
import { Prose } from "@ag.ds-next/react/prose";
import { SearchInput } from "@ag.ds-next/react/search-input";
import { Select } from "@ag.ds-next/react/select";
import { Stack } from "@ag.ds-next/react/stack";
import { Tags } from "@ag.ds-next/react/tags";
import { Text } from "@ag.ds-next/react/text";
import {
  commodities,
  markets,
  resultStatuses,
  searchResults,
} from "@/TestData/searchData";

type Criteria = {
  commodity: string;
  keyword: string;
  market: string;
  status: string;
};

type SortOrder = "newest" | "oldest" | "applicant-asc" | "applicant-desc";

const initialCriteria: Criteria = {
  commodity: "",
  keyword: "",
  market: "",
  status: "",
};

const pageSizeOptions = [5, 10, 20];

function toOptions(values: readonly string[]) {
  return [
    { label: "All", value: "" },
    ...values.map((value) => ({ label: value, value })),
  ];
}

function getReferenceNumber(reference: string) {
  return Number(reference.replace("EX-2026-", ""));
}

export default function SearchWithCardsPage() {
  const [criteria, setCriteria] = useState<Criteria>(initialCriteria);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(pageSizeOptions[0]);
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");

  const activeFilterCount = Object.values(criteria).filter(Boolean).length;

  const filteredResults = useMemo(() => {
    const keyword = criteria.keyword.trim().toLowerCase();

    return searchResults
      .filter((result) => {
        const matchesKeyword =
          !keyword ||
          result.reference.toLowerCase().includes(keyword) ||
          result.applicant.toLowerCase().includes(keyword);
        const matchesCommodity =
          !criteria.commodity || result.commodity === criteria.commodity;
        const matchesMarket =
          !criteria.market || result.market === criteria.market;
        const matchesStatus =
          !criteria.status || result.status === criteria.status;

        return (
          matchesKeyword && matchesCommodity && matchesMarket && matchesStatus
        );
      })
      .sort((first, second) => {
        if (sortOrder === "applicant-asc") {
          return first.applicant.localeCompare(second.applicant);
        }

        if (sortOrder === "applicant-desc") {
          return second.applicant.localeCompare(first.applicant);
        }

        const firstReference = getReferenceNumber(first.reference);
        const secondReference = getReferenceNumber(second.reference);

        return sortOrder === "newest"
          ? secondReference - firstReference
          : firstReference - secondReference;
      });
  }, [criteria, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(filteredResults.length / itemsPerPage));
  const visibleResults = filteredResults.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const activeFilters = [
    criteria.keyword
      ? {
          label: `Search: ${criteria.keyword}`,
          onRemove: () => updateCriteria("keyword", ""),
        }
      : undefined,
    criteria.status
      ? {
          label: `Status: ${criteria.status}`,
          onRemove: () => updateCriteria("status", ""),
        }
      : undefined,
    criteria.commodity
      ? {
          label: `Commodity: ${criteria.commodity}`,
          onRemove: () => updateCriteria("commodity", ""),
        }
      : undefined,
    criteria.market
      ? {
          label: `Market: ${criteria.market}`,
          onRemove: () => updateCriteria("market", ""),
        }
      : undefined,
  ].filter((filter): filter is { label: string; onRemove: () => void } =>
    Boolean(filter)
  );

  function updateCriteria(field: keyof Criteria, value: string) {
    setCriteria((current) => ({
      ...current,
      [field]: value,
    }));
    setCurrentPage(1);
  }

  function handleSelectChange(
    field: keyof Criteria,
    event: ChangeEvent<HTMLSelectElement>
  ) {
    updateCriteria(field, event.target.value);
  }

  function clearFilters() {
    setCriteria(initialCriteria);
    setCurrentPage(1);
  }

  function handlePageSizeChange(nextItemsPerPage: number) {
    setItemsPerPage(nextItemsPerPage);
    setCurrentPage(1);
  }

  return (
    <Content>
      <Box paddingY={3}>
        <Stack gap={3}>
          <Prose>
            <H1>Search with cards</H1>
            <Text as="p" fontSize="sm">
              Browse export applications using the AgDS search filters pattern
              with card results.
            </Text>
          </Prose>

          <Stack gap={1}>
            <Flex
              gap={1}
              justifyContent="space-between"
              flexDirection={{ xs: "column", md: "row" }}
            >
              <Flex
                flexDirection={{ xs: "column", md: "row" }}
                gap={1}
                alignItems={{ xs: "stretch", md: "flex-end" }}
              >
                <Box aria-label="Export applications" role="search">
                  <SearchInput
                    block
                    hideOptionalLabel
                    label="Search"
                    onChange={(value) => updateCriteria("keyword", value)}
                    onClear={() => updateCriteria("keyword", "")}
                    value={criteria.keyword}
                  />
                </Box>
                <Button
                  aria-controls="card-search-filters"
                  aria-expanded={isFilterPanelOpen}
                  iconAfter={FilterIcon}
                  onClick={() =>
                    setIsFilterPanelOpen((currentValue) => !currentValue)
                  }
                  type="button"
                  variant="secondary"
                >
                  {isFilterPanelOpen ? "Hide filters" : "Show filters"}
                  {activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}
                </Button>
              </Flex>
              <Select
                hideOptionalLabel
                label="Sort by"
                onChange={(event) =>
                  setSortOrder(event.target.value as SortOrder)
                }
                options={[
                  { value: "newest", label: "Newest to oldest" },
                  { value: "oldest", label: "Oldest to newest" },
                  { value: "applicant-asc", label: "Applicant (A-Z)" },
                  { value: "applicant-desc", label: "Applicant (Z-A)" },
                ]}
                value={sortOrder}
              />
            </Flex>

            <Box
              background="bodyAlt"
              border
              id="card-search-filters"
              padding={1.5}
              rounded
              hidden={!isFilterPanelOpen}
            >
              <Columns cols={{ xs: 1, md: 3 }} gap={1.5}>
                <Select
                  block
                  id="card-search-status"
                  label="Status"
                  name="status"
                  onChange={(event) => handleSelectChange("status", event)}
                  options={toOptions(resultStatuses)}
                  value={criteria.status}
                />
                <Select
                  block
                  id="card-search-commodity"
                  label="Commodity"
                  name="commodity"
                  onChange={(event) => handleSelectChange("commodity", event)}
                  options={toOptions(commodities)}
                  value={criteria.commodity}
                />
                <Select
                  block
                  id="card-search-market"
                  label="Market"
                  name="market"
                  onChange={(event) => handleSelectChange("market", event)}
                  options={toOptions(markets)}
                  value={criteria.market}
                />
              </Columns>
            </Box>

            {activeFilters.length > 0 ? (
              <Flex flexWrap="wrap" gap={0.75} alignItems="flex-end">
                <Tags
                  heading={<Text fontWeight="bold">Active filters</Text>}
                  items={activeFilters}
                />
                <Button
                  iconAfter={CloseIcon}
                  onClick={clearFilters}
                  size="sm"
                  type="button"
                  variant="text"
                >
                  Clear filters
                </Button>
              </Flex>
            ) : null}

            <Divider />
          </Stack>

          <Stack gap={1.5}>
            <H2>
              <span role="status">
                {filteredResults.length} result
                {filteredResults.length === 1 ? "" : "s"}
              </span>
            </H2>

            {visibleResults.length > 0 ? (
              <Stack as="ul" gap={1} className="searchCardList">
                {visibleResults.map((result) => (
                  <Card as="li" clickable key={result.reference} shadow>
                    <CardInner>
                      <Stack gap={1}>
                        <H3>
                          <CardLink
                            href={`/search/search-with-cards#${result.reference}`}
                          >
                            {result.reference}
                          </CardLink>
                        </H3>
                        <Text as="p">
                          {result.applicant} has a {result.status.toLowerCase()}{" "}
                          {result.commodity.toLowerCase()} export application for{" "}
                          {result.market}.
                        </Text>
                        <Text as="p" fontSize="sm">
                          Submitted {result.submitted}
                        </Text>
                      </Stack>
                    </CardInner>
                  </Card>
                ))}
              </Stack>
            ) : (
              <Stack gap={2} alignItems="flex-start" role="alert">
                <Stack gap={1}>
                  <HelpIcon size="lg" color="muted" />
                  <H2>No results found</H2>
                  <Text>Try adjusting your filter options.</Text>
                </Stack>
                <Button onClick={clearFilters} type="button" variant="secondary">
                  Clear filters
                </Button>
              </Stack>
            )}

            {filteredResults.length > 0 ? (
              <PaginationButtons
                aria-label="Search card results pagination"
                currentPage={currentPage}
                itemRangeText={generatePaginationRangeText({
                  currentPage,
                  itemsPerPage,
                  pluralNoun: "results",
                  singularNoun: "result",
                  totalItems: filteredResults.length,
                })}
                itemsPerPage={itemsPerPage}
                itemsPerPageOptions={pageSizeOptions}
                onChange={setCurrentPage}
                onItemsPerPageChange={handlePageSizeChange}
                totalPages={totalPages}
              />
            ) : null}
          </Stack>
        </Stack>
      </Box>
    </Content>
  );
}

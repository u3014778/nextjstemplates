"use client";

import { type ChangeEvent, type FormEvent, useMemo, useState } from "react";
import { Box } from "@ag.ds-next/react/box";
import { Button } from "@ag.ds-next/react/button";
import { Content } from "@ag.ds-next/react/content";
import { FormStack } from "@ag.ds-next/react/form-stack";
import { H1, H2 } from "@ag.ds-next/react/heading";
import {
  PaginationButtons,
  generatePaginationRangeText,
} from "@ag.ds-next/react/pagination";
import { Prose } from "@ag.ds-next/react/prose";
import { Select } from "@ag.ds-next/react/select";
import { Stack } from "@ag.ds-next/react/stack";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeaderSortable,
  TableRow,
  TableWrapper,
} from "@ag.ds-next/react/table";
import { Text } from "@ag.ds-next/react/text";
import { TextInput } from "@ag.ds-next/react/text-input";
import {
  commodities,
  markets,
  resultStatuses,
  searchResults,
  type SearchResult,
} from "@/TestData/searchData";

type Criteria = {
  commodity: string;
  keyword: string;
  market: string;
  status: string;
};

type SortDirection = "ASC" | "DESC";
type SortField = keyof Pick<
  SearchResult,
  "applicant" | "commodity" | "market" | "reference" | "status" | "submitted"
>;

type SortState = {
  direction: SortDirection;
  field: SortField;
};

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

function getSortValue(result: SearchResult, field: SortField) {
  if (field === "reference") {
    return getReferenceNumber(result.reference);
  }

  if (field === "submitted") {
    return Date.parse(result.submitted);
  }

  return result[field];
}

export default function SearchPage() {
  const [draftCriteria, setDraftCriteria] = useState<Criteria>(initialCriteria);
  const [criteria, setCriteria] = useState<Criteria>(initialCriteria);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(pageSizeOptions[0]);
  const [sort, setSort] = useState<SortState>({
    direction: "DESC",
    field: "reference",
  });

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
        const firstValue = getSortValue(first, sort.field);
        const secondValue = getSortValue(second, sort.field);
        const comparison =
          typeof firstValue === "number" && typeof secondValue === "number"
            ? firstValue - secondValue
            : String(firstValue).localeCompare(String(secondValue));

        return sort.direction === "ASC" ? comparison : comparison * -1;
      });
  }, [criteria, sort]);

  const totalPages = Math.max(1, Math.ceil(filteredResults.length / itemsPerPage));
  const visibleResults = filteredResults.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  function updateDraftCriteria(
    field: keyof Criteria,
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setDraftCriteria((current) => ({
      ...current,
      [field]: event.target.value,
    }));
  }

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCriteria(draftCriteria);
    setCurrentPage(1);
  }

  function handleClear() {
    setDraftCriteria(initialCriteria);
    setCriteria(initialCriteria);
    setCurrentPage(1);
  }

  function handlePageSizeChange(nextItemsPerPage: number) {
    setItemsPerPage(nextItemsPerPage);
    setCurrentPage(1);
  }

  function handleSort(field: SortField) {
    setSort((current) => ({
      field,
      direction:
        current.field === field && current.direction === "ASC" ? "DESC" : "ASC",
    }));
    setCurrentPage(1);
  }

  function getSortDirection(field: SortField) {
    return sort.field === field ? sort.direction : undefined;
  }

  return (
    <Content>
      <Box paddingY={3}>
        <Stack gap={3}>
          <Prose>
            <H1>Search</H1>
            <Text as="p" fontSize="sm">
              Search export applications by reference, applicant, commodity,
              market and status.
            </Text>
          </Prose>

          <div className="searchPageLayout">
            <Box as="form" onSubmit={handleSearch}>
              <FormStack>
                <H2>Search criteria</H2>
                <TextInput
                  block
                  id="keyword"
                  label="Reference or applicant"
                  name="keyword"
                  onChange={(event) => updateDraftCriteria("keyword", event)}
                  value={draftCriteria.keyword}
                />
                <Select
                  block
                  id="status"
                  label="Status"
                  name="status"
                  onChange={(event) => updateDraftCriteria("status", event)}
                  options={toOptions(resultStatuses)}
                  value={draftCriteria.status}
                />
                <Select
                  block
                  id="commodity"
                  label="Commodity"
                  name="commodity"
                  onChange={(event) => updateDraftCriteria("commodity", event)}
                  options={toOptions(commodities)}
                  value={draftCriteria.commodity}
                />
                <Select
                  block
                  id="market"
                  label="Market"
                  name="market"
                  onChange={(event) => updateDraftCriteria("market", event)}
                  options={toOptions(markets)}
                  value={draftCriteria.market}
                />
                <div className="searchActions searchSidebarActions">
                  <Button type="submit">Search</Button>
                  <Button onClick={handleClear} type="button" variant="secondary">
                    Clear
                  </Button>
                </div>
              </FormStack>
            </Box>

            <Stack gap={1.5}>
              <div className="searchResultsHeader">
                <H2 id="search-results-heading">Results</H2>
                <Text as="p" fontSize="sm">
                  {filteredResults.length} result
                  {filteredResults.length === 1 ? "" : "s"} found
                </Text>
              </div>

              <div className="searchTableWrapper">
                <TableWrapper>
                  <Table
                    aria-labelledby="search-results-heading"
                    aria-rowcount={filteredResults.length}
                    striped
                    tableLayout="fixed"
                  >
                    <TableCaption>Export application search results</TableCaption>
                    <TableHead>
                      <TableRow>
                        <TableHeaderSortable
                          onClick={() => handleSort("reference")}
                          sort={getSortDirection("reference")}
                          width="9rem"
                        >
                          Reference
                        </TableHeaderSortable>
                        <TableHeaderSortable
                          onClick={() => handleSort("applicant")}
                          sort={getSortDirection("applicant")}
                        >
                          Applicant
                        </TableHeaderSortable>
                        <TableHeaderSortable
                          onClick={() => handleSort("commodity")}
                          sort={getSortDirection("commodity")}
                        >
                          Commodity
                        </TableHeaderSortable>
                        <TableHeaderSortable
                          onClick={() => handleSort("market")}
                          sort={getSortDirection("market")}
                        >
                          Market
                        </TableHeaderSortable>
                        <TableHeaderSortable
                          onClick={() => handleSort("status")}
                          sort={getSortDirection("status")}
                        >
                          Status
                        </TableHeaderSortable>
                        <TableHeaderSortable
                          onClick={() => handleSort("submitted")}
                          sort={getSortDirection("submitted")}
                        >
                          Submitted
                        </TableHeaderSortable>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {visibleResults.length > 0 ? (
                        visibleResults.map((result) => (
                          <TableRow key={result.reference}>
                            <TableCell as="th" fontWeight="bold" scope="row">
                              <span className="searchTableCellText">
                                {result.reference}
                              </span>
                            </TableCell>
                            <TableCell>
                              <span className="searchTableCellText">
                                {result.applicant}
                              </span>
                            </TableCell>
                            <TableCell>
                              <span className="searchTableCellText">
                                {result.commodity}
                              </span>
                            </TableCell>
                            <TableCell>
                              <span className="searchTableCellText">
                                {result.market}
                              </span>
                            </TableCell>
                            <TableCell>
                              <span className="searchTableCellText">
                                {result.status}
                              </span>
                            </TableCell>
                            <TableCell>
                              <span className="searchTableCellText">
                                {result.submitted}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6}>
                            No results match the selected search criteria.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableWrapper>
              </div>

              {filteredResults.length > 0 ? (
                <PaginationButtons
                  aria-label="Search results pagination"
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
          </div>
        </Stack>
      </Box>
    </Content>
  );
}

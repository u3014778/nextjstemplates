"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar } from "@ag.ds-next/react/avatar";
import { Box } from "@ag.ds-next/react/box";
import { Button } from "@ag.ds-next/react/button";
import {
  DropdownMenu,
  DropdownMenuButton,
  DropdownMenuItemLink,
  DropdownMenuPanel,
} from "@ag.ds-next/react/dropdown-menu";
import { Text } from "@ag.ds-next/react/text";
import { currentUser } from "@/TestData/dashboardData";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Notifications", href: "/notifications" },
];

const searchItems = [
  { label: "Search with table", href: "/search/search-with-table" },
  { label: "Search with cards", href: "/search/search-with-cards" },
];
const formItems = [
  { label: "Forms", href: "/forms" },
  { label: "Single-page form", href: "/forms/single-page" },
  { label: "Multi-page form", href: "/forms/multi-page" },
];

function DammyLogo() {
  return (
    <Box
      as="span"
      className="logo"
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      width={403}
      height={117}
      rounded
      border
      fontSize="md"
      fontWeight="bold"
    >
      Your company logo
    </Box>
  );
}

export function Header() {
  const pathname = usePathname();
  const showDashboardAvatar = pathname === "/dashboard";

  return (
    <>
      <header className="appHeader">
        <div className="headerInner">
          <Link
            aria-label="Next.js Templates home"
            className="brandLink"
            href="/"
          >
            <DammyLogo />
          </Link>
          <div className="brandText">
            <Link className="headingLink" href="/">
              Title - Next.js Templates
            </Link>
            <Text as="p" className="subline" fontSize="sm">
              Subtitle - Template starter for Next.js
            </Text>
          </div>
        </div>
      </header>
      <nav aria-label="Primary" className="mainNav">
        <div className="navInner">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(`${item.href}/`));

            return (
              <Link
                aria-current={isActive ? "page" : undefined}
                className={`navLink${isActive ? " navLinkActive" : ""}`}
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            );
          })}

          <div className="navDropdown">
            <DropdownMenu popoverPlacement="bottom-start">
              <DropdownMenuButton
                className={`navLink navMenuButton${
                  pathname.startsWith("/forms") ? " navLinkActive" : ""
                }`}
                variant="text"
              >
                Forms
              </DropdownMenuButton>
              <DropdownMenuPanel>
                {formItems.map((item) => (
                  <DropdownMenuItemLink href={item.href} key={item.href}>
                    {item.label}
                  </DropdownMenuItemLink>
                ))}
              </DropdownMenuPanel>
            </DropdownMenu>
          </div>
          <div className="navDropdown">
            <DropdownMenu popoverPlacement="bottom-start">
              <DropdownMenuButton
                className={`navLink navMenuButton${
                  pathname.startsWith("/search") ? " navLinkActive" : ""
                }`}
                variant="text"
              >
                Search
              </DropdownMenuButton>
              <DropdownMenuPanel>
                {searchItems.map((item) => (
                  <DropdownMenuItemLink href={item.href} key={item.href}>
                    {item.label}
                  </DropdownMenuItemLink>
                ))}
              </DropdownMenuPanel>
            </DropdownMenu>
          </div>

          {(() => {
            const isActive = pathname === "/dashboard";

            return (
              <Link
                aria-current={isActive ? "page" : undefined}
                className={`navLink${isActive ? " navLinkActive" : ""}`}
                href="/dashboard"
              >
                Dashboard
              </Link>
            );
          })()}

          {showDashboardAvatar ? (
            <div className="navAvatar">
              <DropdownMenu popoverPlacement="bottom-end">
                <DropdownMenuButton
                  aria-label={`User menu for ${currentUser.name}`}
                  className="navAvatarButton"
                  variant="text"
                >
                  <Avatar
                    aria-hidden
                    name={currentUser.name}
                    size="lg"
                    tone="action"
                  />
                </DropdownMenuButton>
                <DropdownMenuPanel>
                  <div className="navUserPanel">
                    <Text as="p" fontWeight="bold">
                      {currentUser.name}
                    </Text>
                    <Text as="p" fontSize="sm">
                      {currentUser.jobtitle}
                    </Text>
                    <Text as="p" fontSize="sm">
                      {currentUser.agency}
                    </Text>
                    <div className="navUserRoles" aria-label="User roles">
                      {currentUser.roles.map((role) => (
                        <span className="dashboardRole" key={role}>
                          {role}
                        </span>
                      ))}
                    </div>
                    <div className="navUserActions">
                      <Button type="button" variant="secondary">
                        Sign out
                      </Button>
                    </div>
                  </div>
                </DropdownMenuPanel>
              </DropdownMenu>
            </div>
          ) : null}
        </div>
      </nav>
    </>
  );
}

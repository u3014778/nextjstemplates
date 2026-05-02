"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Box } from "@ag.ds-next/react/box";
import {
  DropdownMenu,
  DropdownMenuButton,
  DropdownMenuItemLink,
  DropdownMenuPanel,
} from "@ag.ds-next/react/dropdown-menu";
import { Text } from "@ag.ds-next/react/text";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
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
      Your campany logo
    </Box>
  );
}

export function Header() {
  const pathname = usePathname();

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
              Next.js Templates
            </Link>
            <Text as="p" className="subline" fontSize="sm">
              Template starter for Next.js
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
        </div>
      </nav>
    </>
  );
}

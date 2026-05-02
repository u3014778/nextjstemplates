import { Divider } from "@ag.ds-next/react/divider";
import { Footer as AgdsFooter } from "@ag.ds-next/react/footer";
import { LinkList } from "@ag.ds-next/react/link-list";
import { Stack } from "@ag.ds-next/react/stack";
import { Text } from "@ag.ds-next/react/text";

export function Footer() {
  return (
    <div className="appFooter">
      <AgdsFooter background="bodyAlt">
        <Stack gap={1.5}>
          <nav aria-label="Footer">
            <LinkList
              horizontal
              links={[
                { href: "#about", label: "About" },
                { href: "#copyright", label: "Copyright" },
                { href: "#privacy", label: "Privacy" },
                { href: "#disclaimer", label: "Disclaimer" },
                { href: "#updates", label: "Updates" },
              ]}
            />
          </nav>
          <Divider />
          <Text fontSize="sm">
            Built with Next.js and the Agriculture Design System component
            library.
          </Text>
        </Stack>
      </AgdsFooter>
    </div>
  );
}

import * as React from "react";
import Link, { type LinkProps } from "next/link";
import { cn } from "@/lib/utils";

export type NavItemProps = Omit<LinkProps, "href"> & {
  href: LinkProps["href"];
  label: string;
  className?: string;
};

const NavItem = React.forwardRef<HTMLAnchorElement, NavItemProps>(function NavItem(
  { href, label, className, ...props },
  ref
) {
  return (
    <Link
      ref={ref}
      href={href}
      className={cn(
        "text-sm uppercase tracking-[0.35em] text-foreground/50 transition hover:text-foreground focus-visible:outline focus-visible:outline-ring focus-visible:outline-offset-2 font-sans font-bold",
        className
      )}
      {...props}>
      {label}
    </Link>
  );
});

NavItem.displayName = "NavItem";

export { NavItem };

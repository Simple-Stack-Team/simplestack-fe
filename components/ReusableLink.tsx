import Link from "next/link";
import React, { ReactNode } from "react";

interface Props {
  href: string;
  className: string;
  children: ReactNode;
}

const ReusableLink = ({ href, className, children }: Props) => {
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
};

export default ReusableLink;

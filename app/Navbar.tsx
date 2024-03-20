"use client";

import { signIn } from "next-auth/react";
import { TbMenu } from "react-icons/tb";
import Image from "next/image";
import Link from "next/link";

import logo from "@/public/logo.svg";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  return (
    <nav className="font-sm relative z-30 p-4 text-white">
      <div className="flex justify-between sm:hidden">
        <div className="flex items-center gap-4">
          <div>
            <Image priority src={logo} alt="Logo" width={28} />
          </div>
        </div>
        <Sheet>
          <SheetTrigger>
            <TbMenu />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription className="space-y-2">
                <div>Product</div>
                <div>Company</div>
                <div>Pricing</div>
                <div>Contact</div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
      <div className="hidden items-center justify-between sm:flex">
        <div className="flex items-center gap-4">
          <div>
            <Image priority src={logo} alt="Logo" width={32} />
          </div>
          <div>Simple Team</div>
        </div>
        <div className="flex cursor-pointer gap-4 text-[15px] text-gray-300">
          <div>Product</div>
          <div>Company</div>
          <div>Pricing</div>
          <div>Contact</div>
        </div>
        <div className="space-x-4">
          <button
            onClick={() => signIn()}
            className="text-[15px] font-[500] text-gray-300"
          >
            Log in
          </button>
          <Link href="/signup">
            <button className="btn-primary">Get started</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

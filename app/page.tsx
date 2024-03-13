import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";

import { authOption } from "./api/auth/[...nextauth]/constants/next-auth-config";
import Navbar from "./Navbar";
import Header from "@/components/Header";
import SponsorsSection from "@/components/SponsorSection";

export default async function HelloWorld() {
  const session = await getServerSession(authOption);

  //@ts-ignore
  const orgId = session?.user.user.orgId;
  if (session) redirect(`/${orgId}/dashboard`);

  return (
    <div className="bg-black">
      <div className="relative min-h-screen overflow-hidden rounded-b-[1.25rem]">
        <div className="absolute inset-0">
          <Header />
        </div>
        <Navbar />
        <div className="relative top-[75px] z-20 md:ml-16">
          <h1 className="mx-auto w-fit bg-gradient-to-r from-gray-400 via-white via-50% to-gray-400 to-80% bg-clip-text text-center font-['samsungsharpsans'] text-5xl leading-[60px] tracking-[-1px] text-transparent antialiased md:mx-0 md:text-start md:text-7xl md:leading-[80px]">
            Find your
            <br />
            Perfect Team
            <br />
            In Seconds.
          </h1>
          <div className="mt-4 ">
            <p className="mx-auto max-w-[600px] px-2 text-center text-white antialiased md:mx-0 md:text-start">
              Using our app you can manage your team and upgrade your team to
              the next level
            </p>
          </div>
          <div className="mt-4 space-x-4 text-center md:text-start">
            <Link href="/signup">
              <button className="btn-primary">Get started</button>
            </Link>
            <button className="font-[15px] text-white">Get in touch</button>
          </div>
        </div>
      </div>
      <div className="my-8">
        <SponsorsSection />
      </div>
      <div className="min-h-screen rounded-t-[1.25rem] bg-white"></div>
    </div>
  );
}

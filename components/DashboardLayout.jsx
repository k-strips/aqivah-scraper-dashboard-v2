import { MAX_MOBILE_VIEW_WIDTH } from "config";
import useWindowSize from "hooks/useWindowSize";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "react-feather";
import BackButton from "./BackButton";
import Heading from "./Header";
import HeadingWithButton from "./HeadingWithButton";

const Sidebar = ({ selected = {}, isInMobileView = true }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="w-full h-full border-r-4">
      <div
        onClick={() => setExpanded((prev) => !prev)}
        className="flex w-full items-center justify-end md:hidden"
      >
        {/* Click here to {expanded ? "hide" : "show"} the menu */}
        <div className="p-2 fixed top-0 right-0 z-100">
          {expanded ? <X /> : <Menu />}
        </div>
      </div>

      {expanded || !isInMobileView ? (
        <div
          className="flex flex-col p-7 absolute md:relative bg-gray-100 w-full"
          onClick={() => {
            setExpanded(false);
          }}
        >
          <Link href="/">Home</Link>
          <Link href="/scraping-sessions/new">New Scraping-sessions</Link>
          <Link href="/field-types">Field Types</Link>
          <Link href="/fields">Fields</Link>
          <Link href="/sources">Sources</Link>
        </div>
      ) : null}
    </div>
  );
};

const DashboardLayout = (props) => {
  const { children, heading, hideBackButton } = props;
  const { width } = useWindowSize();

  // if we're in the mobile view, place the nav bar at the top, else place it to the left
  const isInMobileView = width < MAX_MOBILE_VIEW_WIDTH;

  return (
    <div className="md:grid md:grid-cols-10 w-full min-h-screen">
      <div className="md:col-span-2">
        <Sidebar isInMobileView={isInMobileView} />
      </div>

      <div className="p-2 overflow-x-scroll md:col-span-8">
        <div className="text-right pt-7 pr-7 hidden md:block">Logout</div>

        <div className="flex items-center justify-start w-screen md:w-80vw">
          {hideBackButton ? null : <BackButton />}
          <Heading>{heading}</Heading>
        </div>
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;

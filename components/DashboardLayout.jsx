import useWindowSize from "hooks/useWindowSize"
import Link from "next/link"
import {useState} from "react"
import {Menu, X} from "react-feather"
import BackButton from "./BackButton"
import Heading from "./Header"

const Sidebar = ({selected = {}, isInMobileView = true}) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      style={{width: "100%", height: "100%", borderRight: "1px solid black"}}
    >
      {isInMobileView && (
        <div
          onClick={() => setExpanded(prev => !prev)}
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          {/* Click here to {expanded ? "hide" : "show"} the menu */}
          <div
            style={{
              padding: "10px",
              position: "fixed",
              top: 0,
              // left: 0,
              right: 0,
            }}
          >
            {expanded ? <X /> : <Menu />}
          </div>
        </div>
      )}
      {expanded || !isInMobileView ? (
        <div
          style={{display: "flex", flexDirection: "column", padding: "30px"}}
        >
          <Link href="/">Dashboard</Link>
          <Link href="/new-properties">New Properties</Link>
          <Link href="/field-types">Field Types</Link>
          <Link href='/fields'>Fields</Link>
        </div>
      ) : null}
    </div>
  )
}

const DashboardLayout = props => {
  const {children, heading, hideBackButton} = props
  const {width} = useWindowSize()

  // if we're in the mobile view, place the nav bar at the top, else place it to the left
  const isInMobileView = width < 501

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isInMobileView ? "column" : "row",
        minHeight: "100vh",
      }}
    >
      <div style={{width: isInMobileView ? "100vw" : "20vw"}}>
        <Sidebar isInMobileView={isInMobileView} />
      </div>
      <div style={{flexGrow: 1, padding: "10px", overflowX: "scroll"}}>
        {!isInMobileView ? (
          <div style={{textAlign: "right", padding: "30px 30px 0 0"}}>Logout</div>
        ) : null}

        <div
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          {hideBackButton ? null : <BackButton />}
          <Heading>{heading}</Heading>
        </div>
        {children}
      </div>
    </div>
  )
}

export default DashboardLayout

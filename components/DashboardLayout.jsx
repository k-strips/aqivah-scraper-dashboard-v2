import useWindowSize from "hooks/useWindowSize"
import Link from "next/link"
import {useState} from "react"

const Sidebar = ({selected = {}, isInMobileView = true}) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      style={{width: "100%", height: "100%", borderRight: "1px solid black"}}
    >
      {isInMobileView && (
        <div onClick={() => setExpanded(prev => !prev)}>
          Click here to {expanded ? "hide" : "show"} the menu
        </div>
      )}
      {expanded || !isInMobileView ? (
        <div
          style={{display: "flex", flexDirection: "column", padding: "30px"}}
        >
          <Link href="/">Dashboard</Link>
          <Link href="/new-properties">New Properties</Link>
        </div>
      ) : null}
    </div>
  )
}

const DashboardLayout = props => {
  const {children} = props
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
          <div style={{textAlign: "right", padding: "30px"}}>Logout</div>
        ) : null}
        {children}
      </div>
    </div>
  )
}

export default DashboardLayout

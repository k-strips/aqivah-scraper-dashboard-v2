import { Button } from "react-bootstrap";

const {default: Link} = require("next/link")

const HeadingWithButton = props => {
  const {heading, btnTitle, btnLink} = props

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <div style={{marginRight: "20px"}}>{heading}</div>
      <Link href={btnLink}>
        <Button variant="dark">{btnTitle}</Button>
      </Link>
    </div>
  )
}

export default HeadingWithButton;
import { MAX_MOBILE_VIEW_WIDTH } from "config";
import useWindowSize from "hooks/useWindowSize"
import {Button} from "react-bootstrap"

function FormSubmitButton(props) {
  const {onClick} = props
  const {width} = useWindowSize()

  return (
    <Button
      variant="dark"
      block={width < MAX_MOBILE_VIEW_WIDTH}
      style={{display: "block", marginLeft: "auto", marginTop: "50px"}}
      onClick={onClick}
    >
      Save
    </Button>
  )
}

export default FormSubmitButton

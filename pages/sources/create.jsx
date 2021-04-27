import FieldFilter from "@components/filters/FieldSelect"
import PaginationTypeSelect from "@components/filters/PaginationTypeSelect"
import FormSubmitButton from "@components/FormSubmitButton"
import {useState} from "react"
import {Button, Card, Col, Form, Row} from "react-bootstrap"

const {default: DashboardLayout} = require("@components/DashboardLayout")

async function create({showLoader, hideLoader, notify, source}) {
  try {
    showLoader()
  } catch (error) {
    notify.error("Failed to create source")
    console.error("failed to create source -> ", error)
  } finally {
    hideLoader()
  }
}

function SourcesCreate() {
  const [source, setSource] = useState({
    label: "",
    url: "",
    isActive: "",
    paginationType: "",
    singlePropertyQuerySelector: "",
    clickPaginationSelector: "",
  })

  const [fields, setFields] = useState({
    ids: [0],
    values: {0: {isRequired: false, isActive: true, selector: "", id: 0}},
  })

  function updateSource({field, value}) {
    setSource({...source, [field]: value})
  }

  return (
    <>
      <DashboardLayout heading={`Sources > Create`}>
        <Card>
          <Card.Body>
            <Card.Title>Create a new source</Card.Title>
            <br />
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={source.label}
                onChange={e =>
                  updateSource({field: "label", value: e.target.value})
                }
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>URL</Form.Label>
              <Form.Control
                value={source.url}
                onChange={e =>
                  updateSource({field: "url", value: e.target.value})
                }
              />
            </Form.Group>

            <Form.Group
              onClick={() =>
                updateSource({field: "isActive", value: !source.isActive})
              }
            >
              <Form.Check checked={source.isActive} label="Is Active" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Pagination Type</Form.Label>
              <PaginationTypeSelect
                selectedValue={source.paginationType}
                onChange={selected =>
                  updateSource({field: "paginationType", value: selected})
                }
              />
            </Form.Group>

            {source.paginationType.value === "CLICK" ? (
              <Form.Group>
                <Form.Label>Click Pagination Query Selector</Form.Label>
                <Form.Control
                  value={source.clickPaginationSelector}
                  onChange={e =>
                    updateSource({
                      field: "clickPaginationQuerySelector",
                      value: e.target.value,
                    })
                  }
                />
              </Form.Group>
            ) : null}

            <Form.Group>
              <Form.Label>Single Property Query Selector</Form.Label>
              <Form.Control
                value={source.singlePropertyQuerySelector}
                onChange={e =>
                  updateSource({
                    field: "singlePropertyQuerySelector",
                    value: e.target.value,
                  })
                }
              />
            </Form.Group>

            <hr />
            <br />

            <Card.Title>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>Fields Details </div>
                <Button>New</Button>
              </div>
            </Card.Title>
            <div id="field-headers">
              <Row>
                <Col md="3">Field</Col>
                <Col md="3">Query Selector</Col>
                <Col md="3">Is Active</Col>
                <Col md="3">Is Required</Col>
              </Row>
            </div>
            {fields.ids.map(each => (
              <Row>
                <Col md="3">
                  <div class="hidden-field-headers">Field</div>
                  <FieldFilter />
                </Col>
                <Col md="3">
                  <div class="hidden-field-headers">Query Selector</div>
                  <Form.Control />
                </Col>
                <Col md="3">
                  <div class="hidden-field-headers">Is Active</div>
                  <Form.Check />
                </Col>
                <Col md="3">
                  <div class="hidden-field-headers">Is Required</div>
                  <Form.Check />
                </Col>
              </Row>
            ))}

            <FormSubmitButton />
          </Card.Body>
        </Card>
      </DashboardLayout>
      <style jsx>{`
        .hidden-field-headers {
          display: none;
        }

        @media only screen and (max-width: 500px) {
          .hidden-field-headers {
            display: block;
            margin-top: 20px;
          }

          #field-headers {
            display: none;
          }
        }
      `}</style>
    </>
  )
}

export default SourcesCreate

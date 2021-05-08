import FieldFilter from "@components/filters/FieldSelect"
import FieldTypeSelect from "@components/filters/FieldTypeSelect"
import PaginationTypeSelect from "@components/filters/PaginationTypeSelect"
import FormSubmitButton from "@components/FormSubmitButton"
import useLoader from "hooks/useLoader"
import useNotifier from "hooks/useToast"
import {useState} from "react"
import {Button, Card, Col, Form, Row} from "react-bootstrap"
import SourcesApi from 'api/sources'

const {default: DashboardLayout} = require("@components/DashboardLayout")

async function create({showLoader, hideLoader, notify, source, fields}) {
  try {
    showLoader()
    const fieldValues = Object.values(fields.values);
    source.paginationType = source.paginationType.value;
    const response = await SourcesApi.create({source, fields: fieldValues})
    console.log("successfully created source -> ", response)
    notify.success()
  } catch (error) {
    notify.error("Failed to create source")
    console.error("failed to create source -> ", error)
  } finally {
    hideLoader()
  }
}

function SourcesCreate() {
  const {showLoader, hideLoader} = useLoader()
  const notify = useNotifier()

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
    values: {0: {type: null, isActive: true, selector: "", id: 0}},
  })

  function updateSource({field, value}) {
    setSource({...source, [field]: value})
  }

  function createNewField() {
    const newField = {
      type: null,
      isActive: true,
      selector: "",
      id: fields.ids.length,
    }
    setFields({
      ids: [...fields.ids, newField.id],
      values: {...fields.values, [newField.id]: newField},
    })
  }

  function updateField({id, field, value}) {
    const updatedField = {...fields.values[id], [field]: value}
    setFields({
      ids: fields.ids,
      values: {...fields.value, [id]: updatedField},
    })
  }

  function removeField(id) {
    delete fields.values[id]
    const fieldIndex = fields.ids.indexOf(id)
    fields.ids.splice(fieldIndex, 1)

    setFields(fields)
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
                      field: "clickPaginationSelector",
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
                  // justifyContent: "space-between",
                }}
              >
                <div style={{marginRight: "20px"}}>Fields Details </div>
                <Button variant="dark" onClick={createNewField}>
                  New
                </Button>
              </div>
            </Card.Title>
            <div id="field-headers">
              <Row>
                <Col md="3">Field</Col>
                <Col md="3">Field Type</Col>
                <Col md="3">Query Selector</Col>
                <Col md="3">Is Active</Col>
                {/* <Col md="3">Is Required</Col> */}
              </Row>
            </div>
            {fields.ids.map(each => {
              const id = each.id
              return (
                <Row style={{marginBottom: "10px"}}>
                  <Col md="3">
                    <div className="hidden-field-headers">Field</div>
                    <FieldFilter />
                  </Col>
                  <Col md="3">
                    <div className="hidden-field-headers">Field Type</div>
                    <FieldTypeSelect
                      value={each.type}
                      onChange={value => {
                        const field = "type"
                        updateField({id, field, value})
                      }}
                    />
                  </Col>
                  <Col md="3">
                    <div className="hidden-field-headers">Query Selector</div>
                    <Form.Control
                      value={each.selector}
                      onChange={e => {
                        const field = "selector"
                        const value = e.target.value
                        updateField({id, field, value})
                      }}
                    />
                  </Col>
                  <Col md="3">
                    <div className="hidden-field-headers">Is Active</div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Form.Check
                        checked={each.isActive}
                        onChange={() => {
                          const field = "isActive"
                          const value = !each.isActive

                          updateField({id, field, value})
                        }}
                      />
                      <Button
                        variant="danger"
                        onClick={() => removeField(each.id)}
                      >
                        x
                      </Button>
                    </div>
                  </Col>
                  {/* <Col md="3">
                  <div className="hidden-field-headers">Is Required</div>
                  <Form.Check />
                </Col> */}
                </Row>
              )
            })}

            <FormSubmitButton
              onClick={() =>
                create({source, fields, showLoader, hideLoader, notify})
              }
            />
          </Card.Body>
        </Card>
      </DashboardLayout>
      <style jsx>{`
        .hidden-field-headers {
          display: none;
          // color: white;
        }

        @media screen and (max-width: 500px) {
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

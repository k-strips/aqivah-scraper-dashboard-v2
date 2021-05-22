import DashboardLayout from "@components/DashboardLayout"
import {useRouter} from "next/router"
import SourcesApi from "api/sources"
import {useEffect, useState} from "react"
import useNotifier from "hooks/useToast"
import useLoader from "hooks/useLoader"
import {Button, Card, Col, Form, Row} from "react-bootstrap"
import PaginationTypeSelect from "@components/filters/PaginationTypeSelect"
import FormSubmitButton from "@components/FormSubmitButton"
import FieldFilter from "@components/filters/FieldSelect"
import FieldTypeSelect from "@components/filters/FieldTypeSelect"
import {v4 as uuidv4} from "uuid"

async function getSource({
  showLoader,
  hideLoader,
  id,
  notify,
  setSource,
  setFields,
}) {
  try {
    showLoader()
    console.log("value of id -> ", id)
    const response = await SourcesApi.get(id)
    console.log("fetched source -> ", response)
    const {SourceFields, ScraperSessions, ...rest} = response
    const formattedResponse = {
      ...rest,
      paginationType: {
        label: response?.paginationType,
        value: response?.paginationType,
      },
    }
    const formattedFields = {
      ids: SourceFields.map(each => each?.id),
      values: SourceFields.reduce((final, each) => {
        final[each?.id] = each
        return final
      }, {}),
    }
    setFields(formattedFields)
    setSource(formattedResponse)
  } catch (error) {
    notify.error("Failed to get source details")
    console.error("failed to get source details -> ", error)
  } finally {
    hideLoader()
  }
}

async function save({source, fields, showLoader, hideLoader, notify, id}) {
  try {
    showLoader()
    const {paginationType: initialPaginationType} = source
    const paginationType = initialPaginationType?.value
    const finalFields = fields.ids.map(each => {
      const value = fields.values[each]
      return {
        type: value?.type?.id,
        field: value?.field?.id,
        isActive: value?.isActive,
        selector: value?.selector,
        id: each.toString(),
      }
    })
    await SourcesApi.update({
      id,
      source: {...source, paginationType},
      fields: finalFields,
    })
    notify.success()
  } catch (error) {
    notify.error("Unable to update source")
    console.error("failed to update source -> ", error)
  } finally {
    hideLoader()
  }
}

function SourcesEdit() {
  const router = useRouter()
  const {id} = router.query
  const [source, setSource] = useState({})
  const [fields, setFields] = useState({ids: [], values: {}})
  const notify = useNotifier()
  const {showLoader, hideLoader} = useLoader()
  console.log("fields and source -> ", {fields, source})

  useEffect(() => {
    if (!id) return

    getSource({showLoader, hideLoader, notify, id, setSource, setFields})
  }, [id])

  useEffect(() => {
    console.log("new value of fields -> ", fields)
  }, [fields])

  function updateSource({field, value}) {
    setSource({...source, [field]: value})
  }

  function createNewField() {
    const newField = {
      type: null,
      isActive: true,
      selector: "",
      id: uuidv4(),
      isRequired: false,
    }
    setFields({
      ids: [...fields.ids, newField.id],
      values: {...fields.values, [newField.id]: newField},
    })
  }

  function updateField({id, field, value}) {
    const updatedField = {
      ...fields.values[id],
      [field]: value,
      isRequired:
        field === "field" ? value.isRequired : field.values[id].isRequired,
    }

    setFields({
      ids: fields.ids,
      values: {...fields.values, [id]: updatedField},
    })
  }

  function removeField(id) {
    delete fields.values[id]
    const fieldIndex = fields.ids.indexOf(id)
    fields.ids.splice(fieldIndex, 1)

    setFields({ids: [...fields.ids], values: {...fields.values}})
  }

  return (
    <DashboardLayout heading={`Sources > ${source?.label || id} > edit`}>
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
              selectedValue={source?.paginationType}
              onChange={selected =>
                updateSource({field: "paginationType", value: selected})
              }
            />
          </Form.Group>

          {source?.paginationType?.value === "CLICK" ? (
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
              value={source?.singlePropertyQuerySelector}
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
          {/* <div id="field-headers">
            <Row>
              <Col md="3">Field</Col>
              <Col md="3">Field Type</Col>
              <Col md="3">Query Selector</Col>
              <Col md="3">Is Active</Col>
              <Col md="3">Is Required</Col>
            </Row>
          </div> */}
          {fields?.ids.map(field => {
            const id = field
            const each = fields?.values[field]
            return (
              <>
                <Row style={{marginBottom: "10px"}}>
                  <Col md="3">
                    <div className="hidden-field-headers">Field</div>
                    <FieldFilter
                      value={each?.FieldId}
                      onChange={value => {
                        const field = "field"
                        updateField({id, field, value})
                      }}
                    />
                  </Col>
                  <Col md="3">
                    <div className="hidden-field-headers">Field Type</div>
                    <FieldTypeSelect
                      value={each?.typeId}
                      onChange={value => {
                        const field = "type"
                        updateField({id, field, value})
                      }}
                    />
                  </Col>
                  <Col md="3">
                    <div className="hidden-field-headers">Query Selector</div>
                    <Form.Control
                      value={each?.selector}
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
                        checked={each?.isActive}
                        onChange={() => {
                          const field = "isActive"
                          const value = !each.isActive

                          updateField({id, field, value})
                        }}
                      />
                      {!each?.isRequired ? (
                        <Button
                          variant="danger"
                          onClick={() => removeField(each.id)}
                        >
                          x
                        </Button>
                      ) : null}
                    </div>
                  </Col>
                </Row>
                <Row style={{marginBottom: "30px"}}>
                  <Col md="3">
                    <div>Default Value</div>
                    <Form.Control
                      value={each?.defaultValue}
                      onChange={e => {
                        const value = e.target.value
                        const field = "defaultValue"
                        updateField({id, field, value})
                      }}
                    />
                  </Col>
                </Row>
                <hr />
              </>
            )
          })}

          <FormSubmitButton
            onClick={() =>
              save({id, source, fields, showLoader, hideLoader, notify})
            }
          />
        </Card.Body>
      </Card>
      <style jsx>{`
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
    </DashboardLayout>
  )
}

export default SourcesEdit

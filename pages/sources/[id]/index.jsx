import DashboardLayout from "@components/DashboardLayout"
import {useRouter} from "next/router"
import SourcesApi from "api/sources"
import {useEffect, useState} from "react"
import useNotifier from "hooks/useToast"
import useLoader from "hooks/useLoader"
import {Card, Col, Form, Row} from "react-bootstrap"
import PaginationTypeSelect from "@components/filters/PaginationTypeSelect"
import FieldFilter from "@components/filters/FieldSelect"
import FieldTypeSelect from "@components/filters/FieldTypeSelect"
import BaseField from "api/fields"
import FieldTypeApi from "api/fieldTypes"

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

function SourcesView() {
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

  return (
    <DashboardLayout heading={`Sources > ${source?.label || id}`}>
      <Card>
        <Card.Body>
          <Card.Title>Source Details</Card.Title>
          <br />
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={source.label}
              disabled
              // onChange={e =>
              //   updateSource({field: "label", value: e.target.value})
              // }
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>URL</Form.Label>
            <Form.Control
              value={source.url}
              disabled
              // onChange={e =>
              //   updateSource({field: "url", value: e.target.value})
              // }
            />
          </Form.Group>

          <Form.Group
          // onClick={() =>
          //   updateSource({field: "isActive", value: !source.isActive})
          // }
          >
            <Form.Check checked={source.isActive} label="Is Active" />
          </Form.Group>

          <Form.Group>
            <Form.Label>Pagination Type</Form.Label>
            <PaginationTypeSelect
              selectedValue={source?.paginationType}
              isDisabled
              // onChange={selected =>
              //   updateSource({field: "paginationType", value: selected})
              // }
            />
          </Form.Group>

          {source?.paginationType?.value === "CLICK" ? (
            <Form.Group>
              <Form.Label>Click Pagination Query Selector</Form.Label>
              <Form.Control
                value={source.clickPaginationSelector}
                disabled
                // onChange={e =>
                //   updateSource({
                //     field: "clickPaginationSelector",
                //     value: e.target.value,
                //   })
                // }
              />
            </Form.Group>
          ) : null}

          <Form.Group>
            <Form.Label>Single Property Query Selector</Form.Label>
            <Form.Control
              value={source?.singlePropertyQuerySelector}
              disabled
              // onChange={e =>
              //   updateSource({
              //     field: "singlePropertyQuerySelector",
              //     value: e.target.value,
              //   })
              // }
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
              {/* <Button variant="dark" onClick={createNewField}>
                New
              </Button> */}
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
          {fields?.ids.map(field => {
            // const id = field
            const each = fields?.values[field]
            return (
              <Row style={{marginBottom: "10px"}}>
                <Col md="3">
                  <div className="hidden-field-headers">Field</div>
                  <FieldFilter
                    value={each?.FieldId}
                    isDisabled
                    // onChange={value => {
                    //   const field = "field"
                    //   updateField({id, field, value})
                    // }}
                  />
                </Col>
                <Col md="3">
                  <div className="hidden-field-headers">Field Type</div>
                  <FieldTypeSelect
                    value={each?.typeId}
                    isDisabled
                    // onChange={value => {
                    //   const field = "type"
                    //   updateField({id, field, value})
                    // }}
                  />
                </Col>
                <Col md="3">
                  <div className="hidden-field-headers">Query Selector</div>
                  <Form.Control
                    value={each?.selector}
                    disabled
                    // onChange={e => {
                    //   const field = "selector"
                    //   const value = e.target.value
                    //   updateField({id, field, value})
                    // }}
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
                      // onChange={() => {
                      //   const field = "isActive"
                      //   const value = !each.isActive

                      //   updateField({id, field, value})
                      // }}
                    />
                    {/* <Button
                      variant="danger"
                      onClick={() => removeField(each.id)}
                    >
                      x
                    </Button> */}
                  </div>
                </Col>
                {/* <Col md="3">
                  <div className="hidden-field-headers">Is Required</div>
                  <Form.Check />
                </Col> */}
              </Row>
            )
          })}

          {/* <FormSubmitButton
            onClick={() =>
              save({id, source, fields, showLoader, hideLoader, notify})
            }
          /> */}
        </Card.Body>
      </Card>
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
    </DashboardLayout>
  )
}

export default SourcesView

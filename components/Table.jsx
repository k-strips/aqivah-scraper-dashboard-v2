import {AQIVAH_PURPLE} from "config"
import React, {useReducer} from "react"
import Table from "react-bootstrap/Table"
import {Content} from "./DashboardLayout"
import {Eye, Edit3, Trash2} from "react-feather"

export const FieldActions = ({onClickEdit, onClickDelete, onClickView}) => {
  return (
    <div
      style={{display: "flex", gap: "10px", cursor: "pointer", height: "100%"}}
    >
      {onClickView && (
        <Eye onClick={onClickView} style={{color: AQIVAH_PURPLE}} />
      )}
      {onClickEdit && <Edit3 onClick={onClickEdit} />}
      {onClickDelete && (
        <Trash2 onClick={onClickDelete} style={{color: "red"}} />
      )}
      {/* {moreActions} */}
    </div>
  )
}

/**
 * for every row, if there's some more info to show beneath the row, give the record a 'showExtraInfo' boolean field that tells whether to show the extra info
 * also give the record an 'ExtraInfo: () => {}' field that returns what to show in this extra info pane.
 *
 */

function CustomTable({
  columns = {ids: [], values: {}},
  records = {ids: [], values: {}},
}) {
  // console.log(columns)
  return (
    <>
      <Table
        responsive
        hover
        striped
        bordered
        style={{background: "white", borderRadius: "10px", width: "100%"}}
      >
        <thead>
          <tr>
            {columns.ids.map(each => (
              <th>{columns?.values[each]?.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {records.ids.map(record => {
            return (
              <TableRow
                key={record}
                records={records}
                record={record}
                columns={columns}
              />
            )
          })}
        </tbody>
      </Table>
    </>
  )
}

function TableRow({records = {}, record = 2, columns = {}}) {
  const {showExtraInfo = false} = records.values[record] || {}
  const {ExtraInfo = () => null} = columns.values

  return (
    <>
      <tr>
        {columns?.ids?.map(each => {
          const {
            getValue = record => {
              if (record) return record[each]
              return null
            },
          } = columns?.values[each] || {}

          const displayValue = getValue(records?.values[record])

          if (typeof displayValue === "string") {
          }

          return (
            <>
              {typeof displayValue === "string" ? (
                <td
                  key={each}
                  // onClick={() => alert(displayValue)}
                  style={{maxWidth: "200px", wordWrap: "break-word"}}
                >
                  {displayValue}
                  {displayValue?.length > 100 && `...`}
                </td>
              ) : (
                <td
                  key={each}
                  style={{maxWidth: "200px", wordWrap: "break-word"}}
                >
                  {displayValue}
                  {displayValue?.length > 100 && `...`}
                </td>
              )}
              {/* {getValue(records?.values[record])} */}
            </>
          )
        })}
      </tr>
      {/* {showExtraInfo && (
        <Content
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            bottom: 0,
            width: "80%",
            padding: "20px",
            boxShadow: "-11px 1px 24px -5px rgba(0,0,0,0.49)",
          }}
        >
          <ExtraInfo record={record} />
        </Content>
      )} */}
    </>
  )
}

export default CustomTable

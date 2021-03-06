import {AQIVAH_PURPLE} from "config"
import React, {useReducer} from "react"
import Table from "react-bootstrap/Table"
import {Content} from "./DashboardLayout"
import {Eye, Edit3, Trash2} from "react-feather"
import {useRouter} from "next/router"

export const FieldActions = ({onClickEdit, onClickDelete, onClickView}) => {
  const router = useRouter()

  return (
    <div style={{display: "flex", cursor: "pointer", height: "100%"}}>
      {onClickView && (
        <Eye
          onClick={() => onClickView(router)}
          style={{color: AQIVAH_PURPLE, margin: "0 5px"}}
        />
      )}
      {onClickEdit && (
        <Edit3 onClick={() => onClickEdit(router)} style={{margin: "0 5px"}} />
      )}
      {onClickDelete && (
        <Trash2
          onClick={() => onClickDelete(router)}
          style={{color: "red", margin: "0 5px"}}
        />
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
  // console.log(records)
 
  const showRecords = records.ids.map(record => {
    return (
      <TableRow
        records={records}
        record={record}
        columns={columns}
      />
    )
  });
  
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
          {records.ids.length === 0 ? null : showRecords}
        </tbody>
      </Table>
      {records.ids.length === 0 ? <NoRecords/> : null}
    </>
  )
}

function TableRow({records = {}, record = 2, columns = {}}) {
  const {showExtraInfo = false} = records.values[record] || {}
  const {ExtraInfo = () => null} = columns.values

  return (
    <tr>
      {columns?.ids?.map(each => {
        const {
          getValue = record => {
            
            if (record) {
              const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
              
              record.createdAt = new Date(record.createdAt).toLocaleDateString('en-US', options);
              record.updatedAt = new Date(record.updatedAt).toLocaleDateString('en-US', options);
              record.lastScrapedTime = new Date(record.lastScrapedTime).toLocaleDateString('en-US', options);
              record.endedAt = new Date(record.endedAt).toLocaleDateString('en-US', options);
              return record[each];
            } 
            
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
  )
}

function NoRecords() {
  return (
   <div className="text-center text-xl pt-10 mb-10">No records to show ????</div>
  )
}

export default CustomTable

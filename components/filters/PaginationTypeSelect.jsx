import React from "react"
import {useState} from "react"
// import {useStateContext} from "state/StateContext"
import BaseFilter from "./BaseSelect"
// import PaginationTypeApi from "api/paginationTypes"
import {useEffect} from "react"
import useNotifier from "hooks/useToast"

export default function PaginationTypeSelect(props) {
  const paginationTypes = [
    {id: 1,label: "CLICK", value: "CLICK"},
    {id: 2,label: "INFINITE", value: "INFINITE"},
  ]
  const {selectedValue} = props

  return (
    <BaseFilter
      {...props}
      options={paginationTypes}
      // isLoading={isLoading}
      value={selectedValue}
    />
  )
}

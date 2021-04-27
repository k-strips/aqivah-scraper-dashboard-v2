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

  // const [isLoading, setIsLoading] = useState(false)
  // const [selectedValue, setSelectedValue] = useState(null)
  // const {notify} = useNotifier()

  // async function fetchPaginationTypes() {
  //   try {
  //     setIsLoading(true)
  //     const response = await PaginationTypeApi.list()
  //     console.log("fetched pagination types -> ", response)
  //     setPaginationTypes(response)
  //   } catch (e) {
  //     notify.error("Failed to fetch pagination types")
  //     console.log("failed to fetch pagination types -> ", e)
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }
  //  useEffect(()=>{
  //   fetchPaginationTypes()
  //  }, [])

  // useEffect(() => {
  //   console.log(paginationTypes)
  //   const {value = ""} = props
  //   if(!paginationTypes.length)return;
  //     setSelectedValue(paginationTypes.find(each => each.id === value))
  // }, [paginationTypes])

  return (
    <BaseFilter
      {...props}
      options={paginationTypes}
      // isLoading={isLoading}
      value={selectedValue}
    />
  )
}

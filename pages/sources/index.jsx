import {FieldActions} from "@components/Table"
import {augmentResponseForTable} from "api/helpers"

const {default: DashboardLayout} = require("@components/DashboardLayout")
const {default: HeadingWithButton} = require("@components/HeadingWithButton")
const {default: CustomTable} = require("@components/Table")
const {default: useLoader} = require("hooks/useLoader")
const {default: useNotifier} = require("hooks/useToast")
const {useState, useEffect} = require("react")
const {default: SourcesApi} = require("api/sources")

async function fetchSources({setSources, showLoader, hideLoader, notify}) {
  try {
    showLoader()
    const response = await SourcesApi.list()
    console.log("response -> ", response)
    setSources(augmentResponseForTable(response))
  } catch (error) {
    notify.error("Failed to fetch sources")
    console.log("failed to fetch sources -> ", error)
  } finally {
    hideLoader()
  }
}

async function deleteSource({showLoader, hideLoader, notify, id, setSources}) {
  try {
    showLoader()
    await SourcesApi.remove(id)
    notify.success()
    fetchSources({showLoader, hideLoader, setSources, notify})
  } catch (error) {
    notify.error("Unable to delete source")
    console.error("failed to delete source -> ", error)
  } finally {
    hideLoader()
  }
}

function Sources() {
  const [sources, setSources] = useState({ids: [], values: {}})
  const notify = useNotifier()
  const {showLoader, hideLoader} = useLoader()

  useEffect(() => {
    fetchSources({setSources, notify, showLoader, hideLoader})
  }, [])

  const columns = {
    ids: [
      "id",
      "label",
      "url",
      "lastScrapedPage",
      "lastScrapedTime",
      "paginationType",
      "singlePropertyQuerySelector",
      "isActive",
      "createdAt",
      "updatedAt",
      "actions",
    ],
    values: {
      id: {label: "ID"},
      label: {label: "Label"},
      url: {
        label: "URL",
        getValue: record => <a href={record.url}>{record.url}</a>,
      },
      lastScrapedPage: {label: "Last Scraped Page Number"},
      lastScrapedTime: {label: "Last Scraped Time"},
      paginationType: {label: "Pagination Type"},
      singlePropertyQuerySelector: {label: "Single Property Query Selector"},
      isActive: {
        label: "Is Active",
        getValue: record => {
          console.log("value of record -> ", record)
          return record?.isActive.toString()
        },
      },
      createdAt: {label: "Created At"},
      updatedAt: {label: "Updated At"},
      actions: {
        label: "Actions",
        getValue: record => (
          <FieldActions
            onClickEdit={router => router.push(`/sources/${record?.id}/edit`)}
            onClickView={router => router.push(`/sources/${record?.id}`)}
            onClickDelete={() => {
              deleteSource({
                showLoader,
                hideLoader,
                notify,
                setSources,
                id: record?.id,
              })
            }}
          />
        ),
      },
    },
  }

  return (
    <DashboardLayout
      hideBackButton
      heading={
        <HeadingWithButton
          btnTitle="Create"
          btnLink="/sources/create"
          heading="Sources"
        />
      }
    >
      <CustomTable columns={columns} records={sources} />
    </DashboardLayout>
  )
}

export default Sources

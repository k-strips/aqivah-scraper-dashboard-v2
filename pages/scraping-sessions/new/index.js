import DashboardLayout from "@components/DashboardLayout";
import Header from "@components/Header";
import CustomTable from "@components/Table";
import { FieldActions } from "@components/Table";
import { augmentResponseForTable } from "api/helpers";
import scrapingSessions from "api/scrapingSessions";
import useLoader from "hooks/useLoader";
import { useEffect, useState } from "react";
import { useToast } from "react-toastify";

async function fetchScrapingSessions({
  notify,
  showLoader,
  hideLoader,
  setScrapingSessions,
}) {
  try {
    showLoader();
    const response = await scrapingSessions.list({ scraper: "NEW" });
    setScrapingSessions(augmentResponseForTable(response));
  } catch (error) {
    notify.error("Failed to fetch scraping sessions");
    console.error("failed to fetch scraping sessions -> ", error);
  } finally {
    hideLoader();
  }
}

// TODO: the source link should take you to the details page of the source. not the url.

// TODO: format the date and time well. date-fns

const columns = {
  ids: ["id", "Source", "startedAt", "endedAt", "result", "actions"],
  values: {
    id: {
      id: "id",
      label: "ID",
    },
    Source: {
      id: "Source",
      label: "Source",
      getValue: (record) => (
        <a href={record?.Source?.url}>{record?.Source?.label}</a>
      ),
    },
    startedAt: {
      id: "startedAt",
      label: "Started At",
      getValue: (record) => record?.createdAt,
    },
    endedAt: {
      id: "endedAt",
      label: "Ended At",
      getValue: (record) => record?.endedAt,
    },
    result: {
      id: "result",
      label: "Results",
      getValue: (record) =>
        `${record?.result || ""} - ${record?.resultMessage || ""}`,
    },
    actions: {
      id: "actions",
      label: "Actions",
      getValue: (record) => (
        <FieldActions
          onClickView={(router) => {
            router.push(`/scraping-sessions/new/${record?.id}`);
          }}
          // onClickEdit={() => { }}
          // onClickDelete={() => { }}
        />
      ),
    },
  },
};

function NewProperties() {
  // show the list of scraping sessions. with pagination
  const { showLoader, hideLoader } = useLoader();
  const notify = { error: (msg) => alert(msg) };
  const [scrapingSessions, setScrapingSessions] = useState({
    ids: [],
    values: {},
  });

  useEffect(() => {
    fetchScrapingSessions({
      showLoader,
      hideLoader,
      notify,
      setScrapingSessions,
    });
  }, []);

  return (
    <DashboardLayout
      heading={`New Properties Scraping Sessions`}
      hideBackButton
    >
      <CustomTable columns={columns} records={scrapingSessions} />
    </DashboardLayout>
  );
}

export default NewProperties;

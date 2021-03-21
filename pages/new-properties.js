import DashboardLayout from "@components/DashboardLayout";
import Header from "@components/Header";
import CustomTable from "@components/Table";
import { FieldActions } from "@components/Table";
import { augmentResponseForTable } from "api/helpers";
import scrapingSessions from "api/scrapingSessions";
import useLoader from "hooks/useLoader";
import { useEffect, useState } from "react";
import { useToast } from "react-toastify";


async function fetchScrapingSessions({ notify, showLoader, hideLoader, setScrapingSessions }) {
  try {
    showLoader();
    const response = await scrapingSessions.list({ scraper: 'NEW' });
    setScrapingSessions(augmentResponseForTable(response));
  } catch (error) {
    notify.error('Failed to fetch scraping sessions');
    console.error('failed to fetch scraping sessions -> ', error);
  } finally {
    hideLoader();
  }
}

const columns = {
  ids: ['id', 'Source', 'startedAt', 'endedAt', 'result', 'actions',],
  values: {
    id: {
      id: 'id',
      label: 'ID',
    },
    Source: {
      id: 'Source',
      label: 'Source',
      getValue: record => record?.Source?.label
    },
    startedAt: {
      id: 'startedAt',
      label: 'Started At',
      getValue: record => record?.createdAt,
    },
    endedAt: {
      id: 'endedAt',
      label: 'Ended At',
      getValue: record => record?.endedAt,
    },
    result: {
      id: 'result',
      label: 'Results',
      getValue: record => `${record?.result || ''} - ${record?.resultMessage || ''}`
    },
    actions: {
      id: 'actions',
      label: 'Actions',
      getValue: (record) => <FieldActions
        onClickView={record?.result ? () => { } : null}
      // onClickEdit={() => { }}
      // onClickDelete={() => { }} 
      />
    }
  }
};

function NewProperties() {
  // show the list of scraping sessions. with pagination
  const { showLoader, hideLoader } = useLoader();
  const notify = { error: msg => alert(msg), };
  const [scrapingSessions, setScrapingSessions] = useState({ ids: [], values: {} });

  useEffect(() => { fetchScrapingSessions({ showLoader, hideLoader, notify, setScrapingSessions }); }, []);

  return (
    <DashboardLayout>
      <Header>{`New Properties > Scraping Sessions`}</Header>
      <CustomTable
        columns={columns}
        records={scrapingSessions} />
    </DashboardLayout>
  );
}

export default NewProperties;
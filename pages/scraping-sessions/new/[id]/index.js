import useLoader from "hooks/useLoader";
import useNotifier from "hooks/useToast";
import { useEffect, useState, } from "react";
import ScrapingSessionApi from 'api/scrapingSessions';
import { Card, Col, Row } from "react-bootstrap";
import { FieldActions } from "@components/Table";
import CustomTable from "@components/Table";

const { default: DashboardLayout } = require("@components/DashboardLayout");
const { useRouter } = require("next/router");


async function fetchScrapingSession({ showLoader, hideLoader, id, notify, setScrapingSession, setProperties, }) {
  try {
    showLoader();
    const response = await ScrapingSessionApi.get(id);
    const formattedProperties = response?.Properties?.reduce((final, each) => {
      return {
        ids: [...final.ids, each.id],
        values: {
          ...final.values,
          [each?.id]: each,
        }
      };
    }, { ids: [], values: {} });
    setProperties(formattedProperties);
    setScrapingSession(response);
  } catch (error) {
    notify.error('Unable to fetch scraping session details');
    console.error('failed to fetch scraping session details -> ', error);
  } finally {
    hideLoader();
  }
}

const columns = {
  ids: ['id', 'url', 'createdAt', 'actions',],
  values: {
    id: { key: 'id', label: 'ID' },
    url: { key: 'url', label: 'URL', getValue: record => <a href={record?.url}>{record?.url}</a> },
    createdAt: { key: 'createdAt', label: 'Created At' },
    actions: {
      key: 'actions', label: 'Actions',
      getValue: record => <FieldActions onClickView={router => router.push(`/scraping-sessions/new/${router.query.id}/properties/${record?.id}`)} />
    }
  },
};

function ScrapingSessionsView() {
  const router = useRouter();
  const { id } = router.query;
  const { showLoader, hideLoader } = useLoader();
  const notify = useNotifier();
  const [scrapingSession, setScrapingSession] = useState({});
  const [properties, setProperties] = useState({ ids: [], values: {} });

  useEffect(() => {
    if (!id) return;

    fetchScrapingSession({ showLoader, hideLoader, id, notify, setScrapingSession, setProperties });
  }, [id]);


  return <DashboardLayout heading={`Scraping Sessions > New > ${id}`}>
    <Card style={{ marginBottom: '30px', }}>
      <Card.Body>
        <Row>
          <Col sm={6} md={3}>
            <h3>Started at:</h3>
            <h5>{scrapingSession?.createdAt}</h5>
          </Col>
          <Col sm={6} md={3}>
            <h3>Ended at:</h3>
            <h5>{scrapingSession?.endedAt}</h5>
          </Col>
          <Col sm={6} md={3}>
            <h3>Source:</h3>
            <h5>{scrapingSession?.SourceId}</h5>
          </Col>
          <Col sm={6} md={3}>
            <h3>Result:</h3>
            <h5>{scrapingSession?.resultMessage}</h5>
          </Col>
        </Row>
      </Card.Body>
    </Card>

    <h4>Properties</h4>
    <CustomTable columns={columns} records={properties} />
  </DashboardLayout>;
}

export default ScrapingSessionsView;
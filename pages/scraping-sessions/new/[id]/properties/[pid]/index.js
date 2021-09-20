import { useRouter } from "next/router";

const { default: DashboardLayout } = require("@components/DashboardLayout");
import PropertyApi from "api/properties";
import { useEffect, useState } from "react";
import useNotifier from "hooks/useToast";
import useLoader from "hooks/useLoader";
import { Card, Col, Row } from "react-bootstrap";

async function fetchProperty({
  showLoader,
  hideLoader,
  id,
  notify,
  setProperty,
}) {
  try {
    showLoader();
    const response = await PropertyApi.get(id);
    console.log("fetched property details -> ", response);
    setProperty(response);
  } catch (error) {
    notify.error("Unable to fetch property details");
    console.log("failed to fetch property details -> ", error);
  } finally {
    hideLoader();
  }
}

function PropertyView() {
  const router = useRouter();
  const { pid, id } = router.query;
  const notify = useNotifier();
  const { showLoader, hideLoader } = useLoader();
  const [property, setProperty] = useState({});

  useEffect(() => {
    if (!pid) return;

    fetchProperty({ showLoader, hideLoader, notify, id: pid, setProperty });
  }, [pid]);

  return (
    <DashboardLayout
      heading={`Scraping Sessions > New > ${id} > \n Properties > ${pid}`}
    >
      <Card>
        <Card.Body>
          <Row style={{ marginBottom: "30px" }}>
            <Col>
              <h4>URL</h4>
              <a href={property?.url}>
                <h5>{property?.url}</h5>
              </a>
            </Col>
            <Col>
              <h4>Created At</h4>
              <h5>{property?.createdAt}</h5>
            </Col>
          </Row>

          <h3>Property Details</h3>
          <hr />
          <Row>
            {property.PropertyDetails?.map((each) => {
              const {
                SourceField: {
                  Field: { label: title = "" },
                },
                details: value,
              } = each || {};

              return (
                <Col key={each?.id}>
                  <h4 style={{ textTransform: "capitalize" }}>{title}</h4>
                  <h5>{value}</h5>
                </Col>
              );
            })}
          </Row>
        </Card.Body>
      </Card>
    </DashboardLayout>
  );
}

export default PropertyView;

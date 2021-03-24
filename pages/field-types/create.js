import useLoader from "hooks/useLoader";
import useToast from 'hooks/useToast'
import { useState } from "react";
import { toast } from "react-toastify";
import FieldTypesApi from 'api/fieldTypes'

const { default: DashboardLayout } = require("@components/DashboardLayout");
const { Form, Card, Button } = require("react-bootstrap");

async function submitFieldType({ showLoader, hideLoader, name }) {

  try {
    showLoader();
    const response = await FieldTypesApi.create({ label:name });
    console.log('successfully created field type -> ', response);
    toast.success('Success');
  } catch (error) {
    console.error('failed to create field type -> ', error);
    toast.error('Failed to create field type');

  } finally {
    hideLoader();
  }
}

function FieldTypesCreate() {
  const [name, setName] = useState('');
  const { showLoader, hideLoader } = useLoader();
  const notify = useToast();

  return <DashboardLayout heading={<div>{`Field Types > Create`}</div>}>
    <Card style={{ maxWidth: '500px', }}>
      <Card.Body>
        <Card.Title>Create a new field type</Card.Title>
        <br />
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control placeholder='name' value={name} onChange={e => setName(e.target.value)} />
        </Form.Group>
      </Card.Body>
      <Card.Footer>
        <Button variant='dark' style={{ marginLeft: 'auto', display: 'block', }} onClick={() => submitFieldType({ showLoader, hideLoader, name, notify})}>Save</Button>
      </Card.Footer>
    </Card>
  </DashboardLayout>;
}

export default FieldTypesCreate;
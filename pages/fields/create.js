import DashboardLayout from "@components/DashboardLayout";
import FormSubmitButton from "@components/FormSubmitButton";
import useLoader from "hooks/useLoader";
import useNotifier from "hooks/useToast";
import { useState } from "react";
import { Card, Form } from "react-bootstrap";
import FieldsApi from 'api/fields';


async function submit({ label, isRequired, isAqivahField, showLoader, hideLoader, notify }) {
  try {
    showLoader();
    const response = await FieldsApi.create({ label, isRequired, isAqivahField });
    console.log('created field -> ', response);
    notify.success();
  } catch (error) {
    console.error('failed to create field', error);
    notify.error('Failed to create field');
  } finally {
    hideLoader();
  }
}

function FieldsCreate() {
  const notify = useNotifier();
  const { showLoader, hideLoader } = useLoader();

  const [label, setLabel] = useState('');
  const [isRequired, setIsRequired] = useState(false);
  const [isAqivahField, setIsAqivahField] = useState(true);

  return <DashboardLayout heading='Fields > Create'>
    <Card>
      <Card.Body>
        <Card.Title>Create a new field</Card.Title>
        <br />
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control placeholder='name' value={label} onChange={(e) => { setLabel(e.target.value); }} />
        </Form.Group>

        <Form.Group onClick={() => { setIsRequired(prev => !prev); }}>
          <Form.Check label='Is Required' type='checkbox' checked={isRequired} />
        </Form.Group>

        <Form.Group onClick={() => { setIsAqivahField(prev => !prev); }}>
          <Form.Check label='Is Aqivah Field' type='checkbox' checked={isAqivahField} />
        </Form.Group>

        <FormSubmitButton onClick={() => submit({ notify, showLoader, hideLoader, label, isRequired, isAqivahField })} />

      </Card.Body>
    </Card>
  </DashboardLayout>;
}

export default FieldsCreate;
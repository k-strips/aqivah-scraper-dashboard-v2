import DashboardLayout from "@components/DashboardLayout";
import FormSubmitButton from "@components/FormSubmitButton";
import useLoader from "hooks/useLoader";
import useNotifier from "hooks/useToast";
import { useState } from "react";
import { Card, Form } from "react-bootstrap";
import FieldsApi from 'api/fields';


async function submit({ label, isRequired, isAqivahField, showLoader, hideLoader, notify, id }) {
  try {
    showLoader();
    const response = await FieldsApi.update({ label, isRequired, isAqivahField, id });
    console.log('updated field -> ', response);
    notify.success();
  } catch (error) {
    console.error('failed to update field', error);
    notify.error('Failed to update field');
  } finally {
    hideLoader();
  }
}

export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const response = await FieldsApi.get(id);
    return { props: response };
  } catch (e) {
    console.error('failed to fetch field -> '.error);
    return { notFound: true, };
  }
}

function FieldsEdit(props) {
  const notify = useNotifier();
  const { showLoader, hideLoader } = useLoader();

  const { label: initialLabel, isRequired: initialIsRequired, isAqivahField: initialIsAqivahField, id } = props;
  const [label, setLabel] = useState(initialLabel);
  const [isRequired, setIsRequired] = useState(initialIsRequired);
  const [isAqivahField, setIsAqivahField] = useState(initialIsAqivahField);


  return <DashboardLayout heading={`Fields > ${id} > edit`}>
    <Card>
      <Card.Body>
        <Card.Title>Edit field</Card.Title>
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

        <FormSubmitButton onClick={() => submit({ notify, showLoader, hideLoader, label, isRequired, isAqivahField, id })} />

      </Card.Body>
    </Card>
  </DashboardLayout>;
}

export default FieldsEdit;
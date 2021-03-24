import useLoader from "hooks/useLoader";
import { useState } from "react";
import FieldTypesApi from 'api/fieldTypes';
import FormSubmitButton from "@components/FormSubmitButton";
import useNotifier from "hooks/useToast";

const { default: DashboardLayout } = require("@components/DashboardLayout");
const { Form, Card, } = require("react-bootstrap");

async function submit({ showLoader, hideLoader, name, notify, id }) {

  try {
    showLoader();
    const response = await FieldTypesApi.update({ label: name, id });
    console.log('successfully edited field type -> ', response);
    notify.success();
  } catch (error) {
    console.error('failed to edited field type -> ', error);
    notify.error('Failed to create field type');

  } finally {
    hideLoader();
  }
}


export async function getServerSideProps(context) {
  const { id } = context.params;
  console.log('id -> ', id);

  try {
    const response = await FieldTypesApi.get(id);
    return {props: response};
  } catch (error) {
    console.log('failed to fetch field type -> ', error);
    return {
      notFound: true,
    };
  }
}



function FieldTypeEdit(props) {
  const { label, id } = props;
  const [name, setName] = useState(label);
  const { showLoader, hideLoader } = useLoader();
  const notify = useNotifier();


  return <DashboardLayout heading={`Field Types > Edit`}>
    <Card style={{maxWidth: '500px',}} >
      <Card.Body>
        <Card.Title>Create a new field type</Card.Title>
        <br />
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control placeholder='name' value={name} onChange={e => setName(e.target.value)} />
        </Form.Group>
        
        <FormSubmitButton onClick={() => submit({ showLoader, hideLoader, name, notify, id })} />
      </Card.Body>
    </Card>
  </DashboardLayout>;
}



export default FieldTypeEdit;
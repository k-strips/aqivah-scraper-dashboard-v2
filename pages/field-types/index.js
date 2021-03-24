import DashboardLayout from "@components/DashboardLayout";
import CustomTable from "@components/Table";
import { useEffect, useState } from "react";
import FieldTypesApi from 'api/fieldTypes';
import { augmentResponseForTable } from "api/helpers";
import useLoader from "hooks/useLoader";
import { FieldActions } from "@components/Table";
import { Button } from "react-bootstrap";
import Header from "@components/Header";
import Link from "next/link";

const columns = {
  ids: ['id', 'label', 'createdAt', 'actions'],
  values: {
    id: {
      key: 'id',
      label: 'ID',
    },
    label: {
      key: 'label',
      label: 'Name',
    },
    createdAt: {
      key: 'createdAt',
      label: 'Created'
    },
    actions: {
      key: 'actions',
      label: 'Actions',
      getValue: record => <FieldActions onClickView={() => { }} onClickEdit={() => { }} onClickDelete={() => { }} />
    }
  }
};


async function fetchFieldTypes({ showLoader, hideLoader, setFieldTypes, notify = { error: msg => alert(msg) } }) {
  try {
    showLoader();
    const response = await FieldTypesApi.list();
    console.log('field types -> ', response);
    setFieldTypes(augmentResponseForTable(response));
  } catch (error) {
    console.error('failed to fetch field types -> ', error);
    notify.error('Failed to fetch field types');
  } finally {
    hideLoader();
  }
}

const Heading = () => <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
  <div style={{ marginRight: '20px' }}>Field Types</div>
  <Link href='/field-types/create'>
    <Button variant='dark'>Create</Button>
  </Link>
</div>;

function FieldTypes() {
  const [fieldTypes, setFieldTypes] = useState({ ids: [], values: {} });
  const { showLoader, hideLoader, } = useLoader();

  useEffect(() => { fetchFieldTypes({ showLoader, hideLoader, setFieldTypes }); }, []);

  return <DashboardLayout heading={<Heading />} hideBackButton >
    <CustomTable columns={columns} records={fieldTypes} />
  </DashboardLayout>;
}
export default FieldTypes;
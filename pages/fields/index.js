const { default: DashboardLayout } = require("@components/DashboardLayout");
const { default: HeadingWithButton } = require("@components/HeadingWithButton");
const { default: CustomTable } = require("@components/Table");
import { FieldActions } from '@components/Table';
import FieldsApi from 'api/fields';
import { augmentResponseForTable } from 'api/helpers';
import useLoader from 'hooks/useLoader';
import useNotifier from 'hooks/useToast';
import { useEffect, useState } from 'react';


const columns = {
  ids: ['id', 'label', 'createdAt', 'isAqivahField', 'isRequired',
    'actions',],
  values: {
    id: {
      key: 'id',
      label: 'ID',
    },
    label: { key: 'label', label: 'Name' },
    createdAt: { key: 'createdAt', label: 'Created' },
    isAqivahField: {
      id: 'isAqivahField', label: 'Is Aqivah Field',
      getValue: record => record?.isAqivahField.toString()
    },
    isRequired: { id: 'isRequired', label: 'Is Required', getValue: record => record?.isRequired ? 'True' : 'False' },
    actions: { id: 'actions', label: 'Actions', getValue: record => <FieldActions onClickView={() => { }} /> }
  }
};

async function fetchFields({ showLoader, hideLoader, notify, setFields, }) {
  try {
    showLoader();
    const response = await FieldsApi.list();
    setFields(augmentResponseForTable(response));
  } catch (error) {
    notify.error('Failed to fetch fields');
    console.error('failed to fetch fields -> ', error);
  } finally {
    hideLoader();
  }
}

function Fields() {
  const [fields, setFields] = useState({ ids: [], values: {} });
  const notify = useNotifier();
  const { showLoader, hideLoader } = useLoader();

  useEffect(() => { fetchFields({ showLoader, hideLoader, notify, setFields }); }, []);

  return <DashboardLayout hideBackButton heading={<HeadingWithButton btnTitle='Create' btnLink='/fields/create' heading='Fields' />}>
    <CustomTable columns={columns} records={fields} />
  </DashboardLayout>;
}

export default Fields;
import DashboardLayout from "@components/DashboardLayout";
import CustomTable from "@components/Table";
import { useEffect, useState } from "react";
import FieldTypesApi from "api/fieldTypes";
import { augmentResponseForTable } from "api/helpers";
import useLoader from "hooks/useLoader";
import { FieldActions } from "@components/Table";
import HeadingWithButton from "@components/HeadingWithButton";

async function deleteFieldType(id, notify = { error: (msg) => alert(msg) }) {
  try {
    await FieldTypesApi.deleteOne(id);
  } catch (error) {
    notify.error("Failed to delete field type");
  }
}

async function fetchFieldTypes({
  showLoader,
  hideLoader,
  setFieldTypes,
  notify = { error: (msg) => alert(msg) },
}) {
  try {
    showLoader();
    const response = await FieldTypesApi.list();
    console.log("field types -> ", response);
    setFieldTypes(augmentResponseForTable(response));
  } catch (error) {
    console.error("failed to fetch field types -> ", error);
    notify.error("Failed to fetch field types");
  } finally {
    hideLoader();
  }
}

function FieldTypes() {
  const [fieldTypes, setFieldTypes] = useState({ ids: [], values: {} });
  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    fetchFieldTypes({ showLoader, hideLoader, setFieldTypes });
  }, []);

  const columns = {
    ids: ["id", "label", "createdAt", "actions"],
    values: {
      id: {
        key: "id",
        label: "ID",
      },
      label: {
        key: "label",
        label: "Name",
      },
      createdAt: {
        key: "createdAt",
        label: "Created",
      },
      actions: {
        key: "actions",
        label: "Actions",
        getValue: (record) => (
          <FieldActions
            onClickView={(router) => {
              router.push(`/field-types/${record?.id}`);
            }}
            onClickEdit={(router) => {
              router.push(`/field-types/${record.id}/edit`);
            }}
            onClickDelete={async () => {
              deleteFieldType(record.id);
              const response = await FieldTypesApi.list();
              setFieldTypes(augmentResponseForTable(response));
              fetchFieldTypes({ showLoader, hideLoader, setFieldTypes });
            }}
          />
        ),
      },
    },
  };

  return (
    <DashboardLayout
      heading={
        <HeadingWithButton
          btnTitle="Create"
          heading="Field Types"
          btnLink="/field-types/create"
        />
      }
      hideBackButton
    >
      <CustomTable columns={columns} records={fieldTypes} />
    </DashboardLayout>
  );
}
export default FieldTypes;

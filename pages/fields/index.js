const { default: DashboardLayout } = require("@components/DashboardLayout");
const { default: HeadingWithButton } = require("@components/HeadingWithButton");
const { default: CustomTable } = require("@components/Table");
import PrevNextButtons from "@components/PrevNextButtons";
import { FieldActions } from "@components/Table";
import FieldsApi from "api/fields";
import { augmentResponseForTable } from "api/helpers";
import useLoader from "hooks/useLoader";
import useNotifier from "hooks/useToast";
import { useEffect, useState } from "react";

let currentPage;
let maxPage;

async function deleteField(id, notify = { error: (msg) => alert(msg) }) {
  try {
    await FieldsApi.deleteOne(id);
  } catch (error) {
    notify.error("Failed to delete field type");
  }
}

async function fetchFields({ showLoader, hideLoader, notify, setFields }) {
  console.log("fetchFields");
  try {
    showLoader();
    const response = await FieldsApi.list();
    currentPage = response.page;
    maxPage = Math.ceil(response.totalResults / response.perPage);
    setFields(augmentResponseForTable(response));
  } catch (error) {
    notify.error("Failed to fetch fields");
    console.error("failed to fetch fields -> ", error);
  } finally {
    hideLoader();
  }
}

function Fields() {
  const [fields, setFields] = useState({ ids: [], values: {} });
  const notify = useNotifier();
  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    fetchFields({ showLoader, hideLoader, notify, setFields });
  }, []);

  const columns = {
    ids: ["id", "label", "createdAt", "isAqivahField", "isRequired", "actions"],
    values: {
      id: {
        key: "id",
        label: "ID",
      },
      label: { key: "label", label: "Name" },
      createdAt: { key: "createdAt", label: "Created" },
      isAqivahField: {
        id: "isAqivahField",
        label: "Is Aqivah Field",
        getValue: (record) => record?.isAqivahField.toString(),
      },
      isRequired: {
        id: "isRequired",
        label: "Is Required",
        getValue: (record) => (record?.isRequired ? "True" : "False"),
      },
      actions: {
        id: "actions",
        label: "Actions",
        getValue: (record) => (
          <FieldActions
            onClickView={(router) => {
              router.push(`/fields/${record?.id}`);
            }}
            onClickEdit={(router) => {
              router.push(`/fields/${record.id}/edit`);
            }}
            onClickDelete={async () => {
              deleteField(record.id);
              const response = await FieldsApi.list();
              setFields(augmentResponseForTable(response));
              fetchFields({ showLoader, hideLoader, notify, setFields });
            }}
          />
        ),
      },
    },
  };

  const nextPage = async () => {
    if (currentPage < maxPage) {
      const page = currentPage + 1;
      currentPage = page;
      const response = await FieldsApi.list(...Array(2), page);
      setFields(augmentResponseForTable(response));
    }
  };

  const prevPage = async () => {
    if (currentPage > 1) {
      const page = currentPage - 1;
      currentPage = page;
      const response = await FieldsApi.list(...Array(2), page);
      setFields(augmentResponseForTable(response));
    }
  };

  return (
    <DashboardLayout
      hideBackButton
      heading={
        <HeadingWithButton
          btnTitle="Create"
          btnLink="/fields/create"
          heading="Fields"
        />
      }
    >
      <CustomTable columns={columns} records={fields} />
      <PrevNextButtons
        prevPage={prevPage}
        nextPage={nextPage}
        currentPage={currentPage}
        maxPage={maxPage}
      />
    </DashboardLayout>
  );
}

export default Fields;

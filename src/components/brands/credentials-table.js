import { Modal } from "antd";
import ASINTable from "@/src/components/table";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const { confirm } = Modal;

export default function CredentialsTable({ list, deleteAction }) {
  const columns = [
    {
      title: "Action",
      width: 70,
      align: "left",
      render: (text) => {
        const showDeleteConfirm = () => {
          confirm({
            title: `Are you sure to delete ${text.name} Credentials?`,
            icon: <ExclamationCircleFilled />,
            content: "",
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk() {
              deleteAction(text.id);
            },
            onCancel() {},
          });
        };
        return (
          <div className="d-flex">
            <FontAwesomeIcon
              onClick={showDeleteConfirm}
              icon={faTrashCan}
              className="text-danger fs-3 cursor-pointer"
            />
          </div>
        );
      },
    },
    {
      title: "#",
      width: 40,
      align: "left",
      key: "id",
      render: (_, __, i) => {
        return <span>{1 + i}</span>;
      },
    },
    {
      title: "Seller Account Name",
      width: 160,
      key: "seller_id",
      align: "left",
      render: (text) => {
        return <b>{text?.seller_id || "N/A"}</b>;
      },
    },
    {
      title: "Profile ID",
      width: 120,
      key: "profile_id",
      align: "left",
      render: (text) => {
        return <b>{text?.profile_id || "N/A"}</b>;
      },
    },
    {
      title: "Client ID",
      width: 120,
      key: "client_id",
      align: "left",
      render: (text) => {
        return <b>{text?.client_id || "N/A"}</b>;
      },
    },
    {
      title: "Country Code",
      width: 120,
      key: "country_code",
      align: "left",
      render: (text) => {
        return <b>{text?.country_code || "N/A"}</b>;
      },
    },
    {
      title: "Currency Code",
      width: 120,
      key: "currency_code",
      align: "left",
      render: (text) => {
        return <b>{text?.currency_code || "N/A"}</b>;
      },
    },
    {
      title: "Time Zone",
      width: 120,
      key: "time_zone",
      align: "left",
      render: (text) => {
        return <b>{text?.time_zone || "N/A"}</b>;
      },
    },
    {
      title: "Refresh Token",
      width: 120,
      key: "refresh_token",
      align: "left",
      render: (text) => {
        return <b>{text?.refresh_token || "N/A"}</b>;
      },
    },
  ];

  return (
    <ASINTable
      columns={columns}
      dataSource={list}
      ellipsis
      rowKey="key"
      pagination={false}
      scroll={{
        x: columns?.map((d) => d.width).reduce((a, b) => a + b, 0) + 300,
      }}
    />
  );
}

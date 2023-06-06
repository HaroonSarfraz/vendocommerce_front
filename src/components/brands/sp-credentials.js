import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input, Select, message } from "antd";
import { selectFilter } from "@/src/helpers/selectFilter";
import { KeySvg } from "@/src/assets";
import { getAmazonSpApiCredentialsList } from "@/src/services/brands.services";
import { selectAmazonSpApiCredentialsList } from "@/src/store/slice/brands.slice";
import { deleteAmazonSpApiCredentialsRequest } from "@/src/api/brands.api";

import Loading from "@/src/components/loading";

import { Modal } from "antd";
import ASINTable from "@/src/components/table";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const { confirm } = Modal;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 16,
    },
    sm: {
      span: 16,
    },
  },
};

export default function SPCredentials({ brand }) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [uspRegion, setUspRegion] = useState(null);

  const amazonSpApiCredentialsList = useSelector(
    selectAmazonSpApiCredentialsList
  );

  useEffect(() => {
    dispatch(getAmazonSpApiCredentialsList(brand.id));
  }, []);

  useEffect(() => {
    if (amazonSpApiCredentialsList.status) {
      setList(
        amazonSpApiCredentialsList.data.map((d) => {
          const data = JSON.parse(d.credential_details);
          return {
            ...data,
            marketplace: d.marketplace,
            brand_amazon_seller_name: brand.u_amazon_seller_name,
          };
        })
      );
      setLoading(false);
    }
  }, [amazonSpApiCredentialsList]);

  const loginWithAmazon = (values) => {
    console.log(values);
    // const email = brand.email || JSON.parse(localStorage.getItem("user")).email;
    // const url = `https://sellercentral.amazon.com/apps/authorize/consent?application_id=${process.env.NEXT_PUBLIC_APPLICATION_ID}&version=beta&state=${email}!!${values.seller_account_name}!!${values.usp_region}!!${values.marketplace}`;
    // window.open(url, "_blank", "noreferrer");
  };

  const regionOptions = [
    { label: "us-east-1", value: "us-east-1" },
    { label: "us-west-2", value: "us-west-2" },
    { label: "eu-west-1", value: "eu-west-1" },
  ];

  const marketplaceOptions = [
    uspRegion === "us-east-1" && {
      label: "North America Region",
      options: [
        { label: "Brazil", value: "A2Q3Y263D00KWC" },
        { label: "Canada", value: "A2EUQ1WTGCTBG2" },
        { label: "Mexico", value: "A1AM78C64UM0Y8" },
        { label: "USA", value: "ATVPDKIKX0DER" },
      ],
    },
    uspRegion === "eu-west-1" && {
      label: "Europe Region",
      options: [
        { label: "Spain", value: "A1RKKUPIHCS9HS" },
        { label: "UK", value: "A1F83G8C2ARO7P" },
        { label: "France", value: "A13V1IB3VIYZZH" },
        { label: "Netherlands", value: "A1805IZSGTT6HS" },
        { label: "Germany", value: "A1PA6795UKMFR9" },
        { label: "Italy", value: "APJ6JRA9NG5V4" },
        { label: "Saudi Arabia", value: "A17E79C6D8DWNP" },
        { label: "Turkey", value: "A33AVAJ2PDY3EV" },
        { label: "United Arab Emirates (U.A.E.)", value: "A2VIGQ35RCS4UG" },
        { label: "India", value: "A21TJRUUN4KGV" },
        // { label: "Poland", value: "" },
        // { label: "Sweden", value: "" },
        //
      ],
    },
    uspRegion === "us-west-2" && {
      label: "Far East Region",
      options: [
        { label: "Singapore", value: "A19VAU5U5O7RUS" },
        { label: "Australia", value: "A39IBJ37TRP1C6" },
        { label: "Japan", value: "A1VC38T7YXB528" },
      ],
    },
    uspRegion === "us-west-2" && {
      label: "China Region",
      options: [{ label: "China", value: "AAHKV2X7AFYLW" }],
    },
  ].filter(Boolean);

  const deleteAmazonSpApiCredentials = (id) => {
    deleteAmazonSpApiCredentialsRequest(brand.id, id)
      .then((res) => {
        if (res.status === 200) {
          dispatch(getAmazonSpApiCredentialsList(brand.id));
          message.success("SP API Credentials has been deleted successfully");
        } else {
          message.error("Unable to delete SP API Credentials");
        }
      })
      .catch((err) => message.error(err?.response?.message));
  };

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
              deleteAmazonSpApiCredentials(text.id);
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
      align: "left",
      key: "id",
      render: (_, __, i) => {
        return <span>{1 + i}</span>;
      },
    },
    {
      title: "Seller Account Name",
      key: "seller_id",
      align: "left",
      render: (text) => {
        return <b>{text?.brand_amazon_seller_name || "N/A"}</b>;
      },
    },
    {
      title: "ARN",
      key: "arn",
      align: "left",
      render: (text) => {
        return <b>{text?.role_arn || "N/A"}</b>;
      },
    },
    {
      title: "Region",
      key: "region",
      align: "left",
      render: (text) => {
        return <b>{text?.region || "N/A"}</b>;
      },
    },
    {
      title: "Marketplace",
      key: "marketplace",
      align: "left",
      render: (text) => {
        return <b>{text?.marketplace || "N/A"}</b>;
      },
    },
    {
      title: "AWS Access Key",
      key: "access_key",
      align: "left",
      render: (text) => {
        return <b>{text?.access_key || "N/A"}</b>;
      },
    },
    {
      title: "AWS Secret Key",
      key: "secret_key",
      align: "left",
      render: (text) => {
        return <b>{text?.secret_key || "N/A"}</b>;
      },
    },
    {
      title: "LWA Client ID",
      key: "client_id",
      align: "left",
      render: (text) => {
        return <b>{text?.client_id || "N/A"}</b>;
      },
    },
    {
      title: "LWA Secret",
      key: "client_secret",
      align: "left",
      render: (text) => {
        return <b>{text?.client_secret || "N/A"}</b>;
      },
    },
    {
      title: "Refresh Token",
      key: "access_token",
      align: "left",
      render: (text) => {
        return <b>{text?.access_token || "N/A"}</b>;
      },
    },
  ];

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12">
          <div className="card mb-7">
            <div className="card-body">
              <Form
                {...formItemLayout}
                layout="vertical"
                form={form}
                name="register"
                onFinish={loginWithAmazon}
              >
                <div className="row">
                  <div className="col-12 d-flex flex-row mb-5">
                    <KeySvg />
                    <h4 className="mx-5 mt-1">Amazon SP API Credentials</h4>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12 col-sm-4 col-md-4 col-lg-6">
                    <Form.Item
                      name="seller_account_name"
                      label="Seller Account Name"
                      className="fw-bolder"
                      rules={[
                        {
                          required: true,
                          message: "Seller Account Name cannot be blank",
                        },
                      ]}
                      hasFeedback
                    >
                      <Input size="large" autoFocus autoComplete="off" />
                    </Form.Item>
                  </div>
                  <div className="col-12 col-sm-4 col-md-4 col-lg-4">
                    <Form.Item
                      name="usp_region"
                      label="Region"
                      className="fw-bolder"
                      rules={[
                        {
                          required: true,
                          message: "Region cannot be blank",
                        },
                      ]}
                      hasFeedback
                    >
                      <Select
                        style={{
                          width: "100%",
                        }}
                        name="usp_region"
                        value={uspRegion}
                        onChange={setUspRegion}
                        size="large"
                        placeholder="Select Region"
                        options={regionOptions}
                        filterOption={selectFilter}
                      />
                    </Form.Item>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12 col-sm-4 col-md-4 col-lg-4">
                    <Form.Item
                      name="marketplace"
                      label="Marketplace"
                      className="fw-bolder"
                      rules={[
                        {
                          required: true,
                          message: "Marketplace cannot be blank",
                        },
                      ]}
                      hasFeedback
                      help={
                        !uspRegion && (
                          <div style={{ marginBottom: 12 }}>
                            Select your <b>Region</b> first
                          </div>
                        )
                      }
                    >
                      <Select
                        disabled={!uspRegion}
                        style={{
                          width: "100%",
                        }}
                        size="large"
                        placeholder="Select Marketplace"
                        options={marketplaceOptions}
                        filterOption={selectFilter}
                      />
                    </Form.Item>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12 col-sm-4 col-md-4 col-lg-4">
                    <Form.Item className="d-flex">
                      <Button
                        htmlType="submit"
                        className="btn btn-sm btn-primary"
                      >
                        <span className="indicator-label">
                          Login With Amazon
                        </span>
                      </Button>
                    </Form.Item>
                  </div>
                </div>
              </Form>
              <div className="row pt-4 border-top">
                <h4 className="mx-5 mt-6">Amazon SP API Credentials List</h4>
              </div>
              <div className="mt-2">
                {loading ? (
                  <Loading />
                ) : (
                  <ASINTable
                    columns={columns}
                    dataSource={list}
                    rowKey="key"
                    pagination={false}
                    scroll={{
                      x:
                        columns
                          ?.map((d) => d.width)
                          .reduce((a, b) => a + b, 0) + 300,
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

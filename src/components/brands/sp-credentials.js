import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input, Select } from "antd";
import { selectFilter } from "@/src/helpers/selectFilter";
import { KeySvg } from "@/src/assets";
import { getAmazonSpApiCredentialsList } from "@/src/services/brands.services";
import { selectAmazonSpApiCredentialsList } from "@/src/store/slice/brands.slice";
import { deleteAmazonSpApiCredentialsRequest } from "@/src/api/brands.api";

import CredentialsTable from "./credentials-table";
import Loading from "@/src/components/loading";

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

  const amazonSpApiCredentialsList = useSelector(
    selectAmazonSpApiCredentialsList
  );

  useEffect(() => {
    // dispatch(getAmazonSpApiCredentialsList(brand.id));
  }, []);

  useEffect(() => {
    if (amazonSpApiCredentialsList) {
      setList(amazonSpApiCredentialsList.data);
      setLoading(false);
    }
  }, [amazonSpApiCredentialsList]);

  const loginWithAmazon = (values) => {
    const email = brand.email || JSON.parse(localStorage.getItem("user")).email;
    const url = `https://sellercentral.amazon.com/apps/authorize/consent?application_id=${process.env.NEXT_PUBLIC_APPLICATION_ID}&version=beta&state=${email}!!${values.seller_account_name}!!${values.usp_region}!!${values.marketplace}`;
    window.open(url, "_blank", "noreferrer");
  };

  const regionOptions = [{ label: "us-east-1", value: "us-east-1" }];

  const marketplaceOptions = [
    {
      label: "North America Region",
      options: [
        { label: "Brazil", value: "A2Q3Y263D00KWC" },
        { label: "Canada", value: "A2EUQ1WTGCTBG2" },
        { label: "Mexico", value: "A1AM78C64UM0Y8" },
        { label: "USA", value: "ATVPDKIKX0DER" },
      ],
    },
    {
      label: "Europe Region",
      options: [
        { label: "United Arab Emirates (U.A.E.)", value: "A2VIGQ35RCS4UG" },
        { label: "Germany", value: "A1PA6795UKMFR9" },
        { label: "Spain", value: "A1RKKUPIHCS9HS" },
        { label: "France", value: "A13V1IB3VIYZZH" },
        { label: "UK", value: "A1F83G8C2ARO7P" },
        { label: "India", value: "A21TJRUUN4KGV" },
        { label: "Italy", value: "APJ6JRA9NG5V4" },
        { label: "Netherlands", value: "A1805IZSGTT6HS" },
        { label: "Saudi Arabia", value: "A17E79C6D8DWNP" },
        { label: "Turkey", value: "A33AVAJ2PDY3EV" },
      ],
    },
    {
      label: "Far East Region",
      options: [{ label: "Singapore", value: "A19VAU5U5O7RUS" }],
      options: [{ label: "Australia", value: "A39IBJ37TRP1C6" }],
      options: [{ label: "Japan", value: "A1VC38T7YXB528" }],
    },
    {
      label: "China Region",
      options: [{ label: "China", value: "AAHKV2X7AFYLW" }],
    },
  ];

  const deleteAmazonSpApiCredentials = (id) => {
    deleteAmazonSpApiCredentialsRequest(brand.id, id)
      .then((res) => {
        if (res.status === 200) {
          dispatch(getAmazonSpApiCredentialsList(brand.id));
          message.success("User has been Removed from Brand Successfully");
        } else {
          message.error("Unable to remove user");
        }
      })
      .catch((err) => message.error(err?.response?.message));
  };

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
                    >
                      <Select
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
                  <CredentialsTable
                    list={list}
                    deleteAction={deleteAmazonSpApiCredentials}
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

import { useState } from "react";
import { Button, Form, Input} from "antd";
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

export default function CreateNewCategory() {
  const [form] = Form.useForm();
  const [submit, setSubmit] = useState(false);
  const [nameValue,setNameValue]=useState('');
  const resetValue=()=>{
    setNameValue('');
  }

  const onFinish = (values) => {
    setSubmit(true);
  };

  return (
      <div className="content d-flex flex-column flex-column-fluid">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="card mb-7">
                <div className="card-body">
                  <div className="col-12 d-flex flex-row mb-5">
                  </div>
                  <Form
                    {...formItemLayout}
                    layout="vertical"
                    form={form}
                    name="import"
                    onFinish={onFinish}
                  >
                    <div className="row">
                      <div className="col-12 col-sm-4 col-md-4 col-lg-3">
                        <Form.Item
                          name="name"
                          label="Name"
                          className="fw-bolder"
                          hasFeedback
                        >
                          <Input placeholder="Enter Category" value={nameValue} />
                        </Form.Item>
                      </div>
                    </div>
                    <div className="mt-4 pt-8 d-flex border-top mx-5">
                      <Form.Item className="d-flex">
                        <Button
                          htmlType="submit"
                          disabled={submit}
                          className="btn btn-sm m-4 btn-primary"
                        >
                            <span className="indicator-label">Submit</span>
                        </Button>
                      </Form.Item>
                      <Form.Item className="d-flex">
                        <Button
                          htmlType="reset"
                          disabled={submit}
                          className="btn btn-sm m-4 btn-primary"
                          onClick={resetValue}
                        >
                            <span className="indicator-label">Reset</span>
                        </Button>
                      </Form.Item>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

import React from "react";
import { Button, Form, Input, Alert } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Head from "next/head";

const { TextArea } = Input;

const emptyPayload = {
  firstName: "",
  lastName: "",
  email: "",
  message: "",
};

export default function Home() {
  const [form] = Form.useForm();

  const [_loading, setLoading] = React.useState(false);
  const [_showDetails, setShowDetails] = React.useState(false);
  const [_showAlert, setShowAlert] = React.useState(false);

  const [payload, setPayload] = React.useState();
  const [message, setMessage] = React.useState("");

  const onNavigate = React.useCallback(async () => {
    setShowAlert(false);

    const validated = await form.isFieldsValidating()
    if(validated) {
      setShowDetails(true)
    } else {
      setPayload(emptyPayload)
      setShowDetails(false)
    }
  }, [form]);

  const onFinish = React.useCallback(() => {
    setLoading(true);
    setPayload(form.getFieldsValue());

    setTimeout(() => {
      localStorage.setItem("inhova-test-payload", JSON.stringify(payload));
      setMessage("Your details have been successfuly saved.");
      setShowAlert(true);
      setLoading(false);
    }, 3000);
  }, [form, payload]);

  React.useEffect(() => {
    let val = localStorage.getItem('inhova-test-payload') ? JSON.parse(localStorage.getItem('inhova-test-payload')) : emptyPayload
    setPayload(val)
  }, []);

  return (
    <>
      <Head>
        <title>Entretien technique INHOVATE / DEV1.0 – 6 janvier 2023</title>
        <meta
          name="description"
          content="Entretien technique INHOVATE / DEV1.0 – 6 janvier 2023"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-white p-6 flex justify-center items-center h-screen w-screen is-app-container">
        <div className="">
          <h3 className="text-4xl text-purple-800 mb-8">
            Entretien technique INHOVATE /{" "}
            <small className="italic text-lg font-bold">
              DEV1.0 – 6 janvier 2023
            </small>
          </h3>
          {_showDetails ? (
            <p>{ payload.firstName }</p>
          ) : (
            <Form
              form={form}
              name="control-hooks"
              layout="vertical"
              onFinish={onFinish}
              className=""
            >
              {_showAlert ? (
                <Alert message={message} type="success" />
              ) : (
                <>
                  <Form.Item
                    name="firstName"
                    label="First Name"
                    rules={[{ required: true, pattern: /^[A-Za-z]+$/ }]}
                  >
                    <Input
                      placeholder="Enter your first name"
                      prefix={<UserOutlined />}
                    />
                  </Form.Item>
                  <Form.Item
                    name="lastName"
                    label="Last Name"
                    rules={[{ required: true, pattern: /^[A-Za-z]+$/ }]}
                  >
                    <Input
                      placeholder="Enter your last name"
                      prefix={<UserOutlined />}
                    />
                  </Form.Item>
                  <Form.Item
                    name="email"
                    label="Email address"
                    rules={[{ required: true, type: "email" }]}
                  >
                    <Input
                      placeholder="Enter your email address"
                      prefix={<UserOutlined />}
                    />
                  </Form.Item>
                  <Form.Item
                    name="message"
                    label="Message"
                    rules={[{ required: true, min: 10 }]}
                  >
                    <TextArea
                      placeholder="Enter your email address"
                      prefix={<UserOutlined />}
                    />
                  </Form.Item>
                </>
              )}
              <Form.Item className="mt-4">
                <Button htmlType="button" onClick={onNavigate}>
                  Previous
                </Button>
                {!_showAlert && (
                  <Button htmlType="submit" loading={_loading}>
                    Submit
                  </Button>
                )}
                <Button htmlType="button" onClick={onNavigate}>
                  Next
                </Button>
              </Form.Item>
            </Form>
          )}
        </div>
      </main>
    </>
  );
}

import { Button, Form, Input, message } from "antd";

const RSVPForm = ({ event, onRSVP }) => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    onRSVP(event.id, values.tickets);
    message.success(`You have successfully registered for ${event.title}`);
    form.resetFields();
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold">RSVP for {event.title}</h3>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please enter your name" }]}>
          <Input placeholder="Enter your name" />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true, type: "email", message: "Please enter a valid email" }]}>
          <Input placeholder="Enter your email" />
        </Form.Item>
        <Form.Item name="tickets" label="Number of Tickets" rules={[{ required: true, message: "Please enter the number of tickets" }]}>
          <Input type="number" min={1} placeholder="Enter number of tickets" />
        </Form.Item>
        <Button type="primary" htmlType="submit">Confirm RSVP</Button>
      </Form>
    </div>
  );
};

export default RSVPForm;

import { useState } from "react";
import { Card, Avatar, Button, Modal, Form, Input, List } from "antd";
import { UserOutlined, EditOutlined } from "@ant-design/icons";

const UserProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState({
    name: "Aribisala Ibrahim",
    email: "admin@example.com",
    phone: "+2349068558094",
    profilePic: "./src/assets/Profile.jpg",
    preferences: ["Party", "Festival", "Tech Events"],
    bookings: [
      { event: "Tech Conference 2025", date: "March 15, 2025", price: "$50" },
      { event: "Live Music Night", date: "April 20, 2025", price: "$30" },
    ],
    paymentHistory: [
      { event: "Tech Conference 2025", amount: "$50", date: "March 10, 2025" },
      { event: "Live Music Night", amount: "$30", date: "April 15, 2025" },
    ],
  });

  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
    form.setFieldsValue(user);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      setUser({ ...user, ...values });
      setIsModalOpen(false);
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-2xl shadow-lg">
        <div className="flex items-center space-x-4">
          <Avatar size={80} icon={<UserOutlined />} src={user.profilePic} />
          <div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-gray-500">{user.email}</p>
            <p className="text-gray-500">{user.phone}</p>
          </div>
        </div>

        <Button
          type="primary"
          icon={<EditOutlined />}
          className="mt-4 bg-blue-500 hover:bg-blue-600"
          onClick={showModal}
        >
          Edit Profile
        </Button>

        <h3 className="mt-6 text-lg font-semibold">Your Bookings</h3>
        <List
          itemLayout="horizontal"
          dataSource={user.bookings}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta title={item.event} description={`Date: ${item.date} | Price: ${item.price}`} />
            </List.Item>
          )}
        />

        <h3 className="mt-6 text-lg font-semibold">Payment History</h3>
        <List
          itemLayout="horizontal"
          dataSource={user.paymentHistory}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta title={item.event} description={`Amount: ${item.amount} | Date: ${item.date}`} />
            </List.Item>
          )}
        />

        <h3 className="mt-6 text-lg font-semibold">Event Preferences</h3>
        <div className="flex flex-wrap gap-2">
          {user.preferences.map((pref, index) => (
            <span key={index} className="px-3 py-1 bg-gray-200 rounded-full text-sm">
              {pref}
            </span>
          ))}
        </div>
      </Card>

      {/* Edit Profile Modal */}
      <Modal title="Edit Profile" open={isModalOpen} onOk={handleOk} onCancel={() => setIsModalOpen(false)}>
        <Form form={form} layout="vertical">
          <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please enter your name" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please enter your email" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Phone" name="phone">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserProfile;

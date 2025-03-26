import { useEffect, useState } from "react";
import { Card, Avatar, Button, List, Input, Select, Badge } from "antd";
import { UserOutlined, CalendarOutlined, FireOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const { Option } = Select;

const Dashboard = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    // Simulated API call for events and user info
    const eventList = [
      { id: 1, title: "Owambe Mega Party", category: "Party", date: "2025-03-10", location: "Lagos, Nigeria", trending: true },
      { id: 2, title: "Tech Conference 2025", category: "Tech Events", date: "2025-04-15", location: "Abuja, Nigeria", trending: false },
      { id: 3, title: "Cultural Festival", category: "Festival", date: "2025-05-05", location: "Ibadan, Nigeria", trending: true },
      { id: 4, title: "Startup Pitch Competition", category: "Tech Events", date: "2025-06-05", location: "Lagos, Nigeria", trending: false },
    ];

    setEvents(eventList);
    setFilteredEvents(eventList);

    setUser({ name: "Aribisala Ibrahim", email: "admin@example.com", profilePic: "./src/assets/Profile.jpg" });
  }, []);

  // Filter events based on search and category
  useEffect(() => {
    let filtered = events;

    if (searchQuery) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (category) {
      filtered = filtered.filter(event => event.category === category);
    }

    setFilteredEvents(filtered);
  }, [searchQuery, category, events]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const getCountdown = (eventDate) => {
    const now = dayjs();
    const eventDay = dayjs(eventDate);
    const daysLeft = eventDay.diff(now, "day");
    return daysLeft > 0 ? `${daysLeft} days left` : "Event is today!";
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-4 shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-orange-500">OWAMBE-EVENTS DASHBOARD</h1>
        <Button type="primary" onClick={handleLogout} className="bg-red-500 hover:bg-red-700">
          Logout
        </Button>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-6">
        {/* User Profile Card */}
        <Card className="shadow-lg col-span-1">
          <div className="flex flex-col items-center">
            <Avatar size={100} icon={<UserOutlined />} src={user.profilePic} />
            <h2 className="mt-3 text-xl font-bold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            <a href="/user" className="text-blue-500">View Profile</a>
          </div>
        </Card>

        {/* Event Listings with Search and Category Filter */}
        <Card className="shadow-lg col-span-2">
          <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>

          {/* Search Bar & Category Filter */}
          <div className="flex gap-4 mb-4">
            <Input
              placeholder="Search events..."
              className="w-full"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Select
              placeholder="Select Category"
              className="w-48"
              onChange={(value) => setCategory(value)}
              allowClear
            >
              <Option value="Party">Party</Option>
              <Option value="Tech Events">Tech Events</Option>
              <Option value="Festival">Festival</Option>
            </Select>
          </div>

          <List
            itemLayout="horizontal"
            dataSource={filteredEvents}
            renderItem={(event) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Badge dot={event.trending} color="red">
                      <CalendarOutlined className="text-orange-500 text-2xl" />
                    </Badge>
                  }
                  title={
                    <span className="font-bold">
                      {event.title} {event.trending && <FireOutlined className="text-red-500 ml-2" />}
                    </span>
                  }
                  description={`${event.date} | ${event.location} | ${getCountdown(event.date)}`}
                />
              </List.Item>
            )}
          />

          <a href="/events" className="text-blue-500">View Events</a>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

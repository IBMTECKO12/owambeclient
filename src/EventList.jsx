import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Select, DatePicker, Input, message } from "antd";
import { CalendarOutlined, EnvironmentOutlined, DollarOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

// Importing Images
import OwambeImage from "./assets/Owambe Mega Party.jpg";
import TechConfImage from "./assets/Tech Conference.jpg";
import CulturalFestImage from "./assets/Cultural Festival.jpg";
import StartupPitchImage from "./assets/Startup Pitch Competition.jpg";

const { Option } = Select;

const eventsData = [
  {
    id: 1,
    title: "Owambe Mega Party",
    category: "Party",
    date: "2025-03-10",
    location: "Lagos, Nigeria",
    price: "$50",
    image: OwambeImage,
    rsvps: 0,
  },
  {
    id: 2,
    title: "Tech Conference 2025",
    category: "Tech Events",
    date: "2025-04-15",
    location: "Abuja, Nigeria",
    price: "$100",
    image: TechConfImage,
    rsvps: 0,
  },
  {
    id: 3,
    title: "Cultural Festival",
    category: "Festival",
    date: "2025-05-05",
    location: "Ibadan, Nigeria",
    price: "$30",
    image: CulturalFestImage,
    rsvps: 0,
  },
  {
    id: 4,
    title: "Startup Pitch Competition",
    category: "Tech Events",
    date: "2025-06-05",
    location: "Lagos, Nigeria",
    price: "$75",
    image: StartupPitchImage,
    rsvps: 0,
  },
];

const EventList = () => {
  const [filteredEvents, setFilteredEvents] = useState(eventsData);
  const [filters, setFilters] = useState({
    category: "",
    date: null,
    location: "",
  });

  const handleFilterChange = (field, value) => {
    const updatedFilters = { ...filters, [field]: value };
    setFilters(updatedFilters);
    filterEvents(updatedFilters);
  };

  const filterEvents = (updatedFilters) => {
    let filtered = eventsData;

    if (updatedFilters.category) {
      filtered = filtered.filter((event) => event.category === updatedFilters.category);
    }
    if (updatedFilters.date) {
      filtered = filtered.filter((event) => event.date === dayjs(updatedFilters.date).format("YYYY-MM-DD"));
    }
    if (updatedFilters.location) {
      filtered = filtered.filter((event) =>
        event.location.toLowerCase().includes(updatedFilters.location.toLowerCase())
      );
    }

    setFilteredEvents(filtered);
  };

  const handleBooking = (event) => {
    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    bookings.push(event);
    localStorage.setItem("bookings", JSON.stringify(bookings));
    message.success(`You have successfully booked ${event.title}`);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Upcoming Events</h1>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <Select
          placeholder="Select Category"
          className="w-48"
          onChange={(value) => handleFilterChange("category", value)}
          allowClear
        >
          <Option value="Party">Party</Option>
          <Option value="Tech Events">Tech Events</Option>
          <Option value="Festival">Festival</Option>
        </Select>

        <DatePicker
          placeholder="Select Date"
          className="w-48"
          onChange={(date) => handleFilterChange("date", date)}
        />

        <Input
          placeholder="Enter Location"
          className="w-48"
          onChange={(e) => handleFilterChange("location", e.target.value)}
        />
      </div>

      {/* Event Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <Card
              key={event.id}
              hoverable
              cover={<img src={event.image} alt={event.title} className="h-52 object-cover" />}
              className="shadow-lg"
            >
              <h2 className="text-lg font-semibold">{event.title}</h2>
              <p className="text-gray-600 flex items-center">
                <CalendarOutlined className="mr-2" /> {event.date}
              </p>
              <p className="text-gray-600 flex items-center">
                <EnvironmentOutlined className="mr-2" /> {event.location}
              </p>
              <p className="text-gray-600 flex items-center">
                <DollarOutlined className="mr-2" /> {event.price}
              </p>

              <div className="flex flex-col gap-2 mt-3">
                {/* View Details Button */}
                <Link to={`/event/${event.id}`}>
                  <Button type="default" className="w-full">View Details</Button>
                </Link>

                {/* Book Now Button */}
                <Button type="primary" className="w-full" onClick={() => handleBooking(event)}>
                  Book Now
                </Button>

                {/* Buy Tickets Button */}
                <Button type="dashed" className="w-full">
                  Buy Tickets
                </Button>
              </div>
            </Card>
          ))
        ) : (
          <p className="text-center col-span-3 text-gray-500">No events found.</p>
        )}
      </div>
    </div>
  );
};

export default EventList;

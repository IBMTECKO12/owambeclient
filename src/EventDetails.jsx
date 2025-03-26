import { useParams } from "react-router-dom";
import { Card, Button, message } from "antd";
import { CalendarOutlined, EnvironmentOutlined, DollarOutlined } from "@ant-design/icons";


// Import images correctly (Option 1)
import OwambeImage from "./assets/Owambe Mega Party.jpg";
import TechConfImage from "./assets/Tech Conference.jpg";
import CulturalFestImage from "./assets/Cultural Festival.jpg";
import StartupPitchImage from "./assets/Startup Pitch Competition.jpg";

const eventData = [
  {
    id: 1,
    title: "Owambe Mega Party",
    category: "Party",
    date: "2025-03-10",
    location: "Lagos, Nigeria",
    price: "$50",
    image: OwambeImage, // Updated
    description: "An unforgettable Owambe experience with top artists!",
    rsvps: 0,
  },
  {
    id: 2,
    title: "Tech Conference 2025",
    category: "Tech Events",
    date: "2025-04-15",
    location: "Abuja, Nigeria",
    price: "$100",
    image: TechConfImage, // Updated
    description: "Network with industry leaders and learn about tech innovations.",
    rsvps: 0,
  },
  {
    id: 3,
    title: "Cultural Festival",
    category: "Festival",
    date: "2025-05-05",
    location: "Ibadan, Nigeria",
    price: "$30",
    image: CulturalFestImage, // Updated
    description: "A vibrant showcase of Nigeria's rich culture and traditions.",
    rsvps: 0,
  },
  {
    id: 4,
    title: "Startup Pitch Competition",
    category: "Tech Events",
    date: "2025-06-05",
    location: "Lagos, Nigeria",
    price: "$75",
    image: StartupPitchImage, // Updated
    description: "Pitch your startup and secure investment funding!",
    rsvps: 0,
  },
];


const EventDetails = () => {
  const { id } = useParams();
  const event = eventData.find((e) => e.id === parseInt(id));

  if (!event) {
    return <h2 className="text-center text-red-500 text-xl font-semibold">Event not found!</h2>;
  }

  const handleBooking = () => {
    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    bookings.push(event);
    localStorage.setItem("bookings", JSON.stringify(bookings));
    message.success(`You have successfully booked "${event.title}"`);
  };

  return (
    <div className="container mx-auto p-6">
      <Card
        hoverable
        cover={<img src={event.image} alt={event.title} className="h-80 object-cover" />}
        className="shadow-lg"
      >
        <h1 className="text-2xl font-bold mb-2">{event.title}</h1>
        <p className="text-gray-600 flex items-center"><CalendarOutlined className="mr-2" /> {event.date}</p>
        <p className="text-gray-600 flex items-center"><EnvironmentOutlined className="mr-2" /> {event.location}</p>
        <p className="text-gray-600 flex items-center"><DollarOutlined className="mr-2" /> {event.price}</p>
        <p className="mt-4 text-gray-700">{event.description}</p>
        <Button type="primary" className="w-full mt-4" onClick={handleBooking}>
          Book Now
        </Button>
      </Card>
    </div>
  );
};

export default EventDetails;
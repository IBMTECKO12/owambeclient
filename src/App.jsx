import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EventList from "./EventList";
import EventDetails from "./EventDetails";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import UserProfile from "./UserProfile";
import RSVPForm from "./RSVPForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/events" element={<EventList />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/user" element={<UserProfile />} />
        <Route path="/rsvp" element={<RSVPForm />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./assets/Pages/Login";
import Resume from "./assets/Pages/Resume";
const PrivateRoute = ({ children }) => {
  const loggedIn = localStorage.getItem("loggedIn");
  return loggedIn === "true" ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<Login />} />

      <Route
        path="/resume"
        element={
          <PrivateRoute>
            <Resume />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;

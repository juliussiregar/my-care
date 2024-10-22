// src/app/home/page.tsx
"use client";

import React from "react";
import { useSession } from "next-auth/react";

const HomePage = () => {
  const { data: session } = useSession();

  if (!session) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Welcome to MyCare, {session.user.email}!</h1>
      <p>Your Role: {session.user.role}</p>
      <p>Your Specialization: {session.user.specialization}</p>
      <p>Fresh Session: {session.fresh ? "Yes" : "No"}</p>
      <h2>Your Availability Schedule:</h2>
      <ul>
        {Object.entries(session.user.availability_schedule).map(([day, time]) => (
          <li key={day}>
            {day}: {time}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;

import React from "react";
import { TStudentProfile } from "./student-profile.types";

export const fetchStudentProfile = async (): Promise<TStudentProfile> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    name: "Jane Smith",
    major: "Computer Science",
    year: 3,
    location: "Stanford, CA, USA",
    avatar: "/api/placeholder/100/100",
    domains: ["Technology", "AI", "Data Science"],
    interests: ["Machine Learning", "Robotics", "Hackathons"],
    bio: "Passionate CS student exploring the frontiers of AI and machine learning. Always up for a coding challenge or a good hackathon!",
    gpa: 3.8,
  };
};

export const useStudentProfile = () => {
  const [profile, setProfile] = React.useState<TStudentProfile | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    fetchStudentProfile()
      .then((data) => {
        setProfile(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile");
        setLoading(false);
      });
  }, []);

  return { profile, loading, error };
};

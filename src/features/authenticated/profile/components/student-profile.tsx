import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardHeader } from "@/components/ui/card";
import { TStudentProfile } from "@/features/authenticated/profile/api/student-profile.types";
import React from "react";

const ProfileHeader: React.FC<{ profile: TStudentProfile }> = ({ profile }) => (
  <CardHeader className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
    <Avatar className="w-24 h-24 sm:w-32 sm:h-32">
      <AvatarImage src={profile.avatar} alt={profile.name} />
      <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
    </Avatar>
    <div className="text-center sm:text-left">
      <h2 className="text-2xl font-bold">{profile.name}</h2>
      <p className="text-gray-400">
        {profile.major} - Year {profile.year}
      </p>
      <Badge variant="secondary" className="mt-2">
        {profile.location}
      </Badge>
    </div>
  </CardHeader>
);

const TagList: React.FC<{ title: string; tags: string[] }> = ({
  title,
  tags,
}) => (
  <div>
    <h3 className="mb-2 text-lg font-semibold">{title}</h3>
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <Badge key={index} variant="outline">
          {tag}
        </Badge>
      ))}
    </div>
  </div>
);

const BioSection: React.FC<{ bio: string }> = ({ bio }) => (
  <div>
    <h3 className="mb-2 text-lg font-semibold">Bio</h3>
    <p className="text-gray-300">{bio}</p>
  </div>
);

const GpaDisplay: React.FC<{ gpa: number }> = ({ gpa }) => (
  <div>
    <h3 className="mb-2 text-lg font-semibold">GPA</h3>
    <p className="text-2xl font-bold">{gpa.toFixed(2)}</p>
  </div>
);

const ProfileActions: React.FC = () => (
  <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
    <Button className="w-full sm:w-auto">Edit Profile</Button>
    <Button variant="outline" className="w-full sm:w-auto">
      Logout
    </Button>
  </div>
);

export { BioSection, GpaDisplay, ProfileActions, ProfileHeader, TagList };

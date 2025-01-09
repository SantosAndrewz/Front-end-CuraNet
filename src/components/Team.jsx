import React from "react";

const teams = [
  { id: 1, name: "Lawrence Eniola", role: "Frontend engineer", img: "https://static.thenounproject.com/png/363640-200.png" },
  { id: 2, name: "Name here", role: "Frontend engineer", img: "https://static.thenounproject.com/png/363640-200.png" },
  { id: 3, name: "Name here", role: "Backend engineer", img: "https://static.thenounproject.com/png/363640-200.png" },
  { id: 4, name: "Name here", role: "Backend engineer", img: "https://static.thenounproject.com/png/363640-200.png" },
];

const TeamsSection = () => {
  return (
    <section id="team" className="teams-section my-20">
      <h2 className="text-center text-2xl font-bold mb-8 text-green-800">Meet the Team</h2>
      <div className="team-container flex flex-wrap justify-center gap-4">
        {teams.map((member) => (
          <div
            key={member.id}
            className="team-card flex flex-col items-center bg-white shadow-md rounded-lg p-4 w-64"
          >
            <img
              src={member.img}
              alt={`${member.name}`}
              className="w-24 h-24 rounded-full mb-4"
            />
            <h3 className="text-lg font-semibold">{member.name}</h3>
            <p className="text-gray-600">{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamsSection;

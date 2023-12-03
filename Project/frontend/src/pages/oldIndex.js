import Dropdown from "@/components/Dropdown";
import { useState, useEffect } from "react";
import { nbaTeams } from "@/data/nba-teams";
import React from "react";
import Button from "@/components/Button";

export default function Home() {
  const [selectedTeam1, setSelectedTeam1] = useState([]);
  const [selectedTeam2, setSelectedTeam2] = useState([]);
  const [availableOptions, setAvailableOptions] = useState(nbaTeams);
  const [teams, setTeams] = useState([]);
  const [showBtn, setShowBtn] = useState(false);

  const handleSelectTeam1 = (team) => {
    if (selectedTeam1.length < 1) {
      setSelectedTeam1([...selectedTeam1, team]);
      setAvailableOptions(availableOptions.filter((t) => t !== team));
    }
  };

  const handleSelectTeam2 = (team) => {
    if (selectedTeam2.length < 1) {
      setSelectedTeam2([...selectedTeam2, team]);
      setAvailableOptions(availableOptions.filter((t) => t !== team));
    }
    setShowBtn(true);
  };

  const handleSubmit = async () => {
    const payload = {
      team1: selectedTeam1,
      team2: selectedTeam2,
    };
    console.log(payload);
    const response = await fetch("http://localhost:5000/submit_teams", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const responseData = await response.json();
    fetchData();
    console.log(responseData);

    // reset everything
    setSelectedTeam1([]);
    setSelectedTeam2([]);
    setShowBtn(false);
  };

  const fetchData = async () => {
    const response = await fetch("http://localhost:5000/get_teams");
    const data = await response.json();
    setTeams(data);
  };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-[150px]">
        <div className="flex justify-center mt-8">
          <p className="text-lg font-bold">Group 24 Project</p>
        </div>
        <div className="flex gap-[150px]">
          <Dropdown
            title="Team 1"
            options={availableOptions.filter(
              (team) => !selectedTeam2.includes(team)
            )}
            onSelect={handleSelectTeam1}
            disabled={selectedTeam1.length >= 1}
          />
          <div>
            <h2 className="uppercase font-bold text-2xl text-blue-400">
              Selected Team
            </h2>
            {
              // show all selected teams from both dropdowns
              [...selectedTeam1, ...selectedTeam2].map((team, index) => (
                <div key={index} className="flex justify-center">
                  <h3 className="text-lg text-white font-bold">{team}</h3>
                  {index < selectedTeam1.length - 1 && <br />}
                </div>
              ))
            }
            {showBtn && (
              <div className="flex justify-center my-4">
                <Button onClick={handleSubmit} btnText="Submit" />
              </div>
            )}
          </div>
          <Dropdown
            title="Team 2"
            options={availableOptions.filter(
              (team) => !selectedTeam1.includes(team)
            )}
            onSelect={handleSelectTeam2}
            disabled={selectedTeam2.length >= 1}
          />{" "}
        </div>
      </div>
      <div className="flex justify-center mt-10 flex-col items-center gap-2">
        <div>
          <h1 className="text-white text-xl uppercase">
            Selected Teams from Server
          </h1>
        </div>
        <mai className="flex gap-4">
          {teams.map((team, index) => (
            <div
              key={index}
              className="border-[2px] border-blue-800 p-4 rounded-lg"
            >
              <h2 className="text-lg">
                <span className="font-bold text-blue-500">Team 1: </span>
                {team.team1.join(", ")}
              </h2>

              <h2 className="text-lg">
                <span className="font-bold text-blue-500">Team 2: </span>{" "}
                {team.team2.join(", ")}
              </h2>
            </div>
          ))}
        </mai>
      </div>
    </>
  );
}

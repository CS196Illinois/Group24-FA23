import React from 'react';
import Dropdown from "./components/Dropdown";
import { useState } from "react";
import { nbaTeams } from "./data/nba-teams";
import Button from "./components/Button";
import { createRoot } from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root')
const root = createRoot(container)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


export default function Home() {
  const [selectedTeam1, setSelectedTeam1] = useState([]);
  const [selectedTeam2, setSelectedTeam2] = useState([]);
  const [availableOptions, setAvailableOptions] = useState(nbaTeams);

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
    console.log(responseData);
  };

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
                <div key={index}>
                  {team}
                  {index < selectedTeam1.length - 1 && <br />}
                </div>
              ))
            }
            <Button onClick={handleSubmit} btnText="Submit" />
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
    </>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

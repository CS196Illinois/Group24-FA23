import React from "react";
import { useState } from "react";
import Button from "@/components/Button";

export default function index() {
  const [prediction, setPrediction] = useState("");
  const [odds, setOdds] = useState(Array(8).fill(""));
  const [predictionShow, setPredictionShow] = useState(false);
  const oddFill = ["Pinnacle Away", "Pinnacle Home", "Heritage Away", "Heritage Home", "Bovada Away", "Bovada Home", "Betonline Away", "Betonline Home"];

  const fetchData = async () => {
    try {
      // Ensure all values in 'odds' are numbers
      const formattedOdds = odds.map((odd) => Number(odd));
      const response = await fetch("http://localhost:8000/members", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: formattedOdds,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setPrediction(`${data.prediction}`);
      setPredictionShow(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //   make a state to store all the input values in an array
  const handleInputChange = (index, value) => {
    // Create a new array with the current state
    const newOdds = [...odds];
    // Update the value at the specific index
    newOdds[index] = value;
    setOdds(newOdds);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("ODDS input by user are: ", odds);
    fetchData();
  };

  return (
    <>
      <div>
        <p className="text-lg font-bold text-center my-6">
          Please fill the inputs below.
        </p>
        <div>
          <p> ML = moneyline odd</p>
          <p> Away = Away team moneyline american odds</p>
          <p> Home = Home team moneyline american odds</p>
          <p>                                             </p>
        </div>
        
      </div>
      <div className="flex">
        <form className="flex gap-2 flex-col" onSubmit={handleSubmit}>
          <div className="flex gap-2 px-4">
            {odds.map((odds, index) => (
              <input
                key={index}
                type="text"
                placeholder={oddFill[index]}
                className="input input-bordered w-full max-w-xs"
                value={odds}
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
            ))}
          </div>
          <div className="flex justify-center my-2">
            <Button type="submit" btnText="SUBMIT" />
          </div>
        </form>
      </div>

      {predictionShow && (
        <div className="flex flex-col justify-center items-center">
          Confidence that the home team will win:{" "} 
          <span className="text-2xl font-bold text-blue-400">{prediction} %</span>
        </div>
      )}
    </>
  );
}

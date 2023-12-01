import React, { useState, useEffect} from 'react'

function App() {
  const [data, setData] = useState([{}]);
  const [prediction, setPrediction] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/members", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Replace this with the actual input data
        body: JSON.stringify({ input: [211, -236, 165, -190, 175, -210, 180, -210] }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setPrediction(`Prediction: ${data.prediction}`);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };



  useEffect(() => {
    fetchData("http://localhost:8000/members").then(
      res => res.json()
    ).then(
      responseData => {
        setData(responseData)
        console.log(responseData)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
      })
  }, []);


  return (
    <div>
      {prediction ? <p>{prediction}</p> : <p>Loading...</p>}
    </div>
  );
}

export default App

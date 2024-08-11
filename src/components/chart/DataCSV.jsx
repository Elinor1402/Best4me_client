import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

//fetch CSV data from google forms excel file(not relevant in the future get the data from users answers in database)
export default function FetchCSVData({ setCsvData }) {
  const navigate = useNavigate();

  function parseCSV(csvString) {
    const data = csvString.split("\n").map((row) => row.split(","));
    return data;
  }

  const fetchCSVData = () => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:3000/csvData", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        const parsedCsvData = parseCSV(response.data);
        setCsvData(parsedCsvData);
        console.log("The data is:", parsedCsvData);
      })
      .catch((error) => {
        console.error("Error fetching CSV data:", error);
        navigate("/log-in");
      });
  };

  useEffect(() => {
    fetchCSVData();
  }, []);

  return <></>;
}

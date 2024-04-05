import { useEffect,useRef ,useState} from "react";
import axios from 'axios';

export default function FetchCSVData({setCsvData}) {


function parseCSV(csvString) {
   
    const data = csvString.split('\n').map(row => row.split(','));
    return data;

}

const fetchCSVData =  () => {
    const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRi5yiyL7OjyVehkofqLeKfN2XhY8KbTxaSsQ7_HVSLHeM6uUh7oHMPjmaMD62QrdsC8bGCip3tV9YD/pub?output=csv'; // Replace with your Google Sheets CSV file URL
    axios.get(csvUrl)
        .then((response) => {
            const parsedCsvData = parseCSV(response.data);
           setCsvData(parsedCsvData);
           console.log('The data is:',parsedCsvData);
        })
        .catch((error) => {
            console.error('Error fetching CSV data:', error);
        });
}

useEffect(() => {
    fetchCSVData();
}, []);

 
  return (
    <div></div>
     
  );
}

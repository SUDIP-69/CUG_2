import React, { useState } from "react";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import { db } from "../api/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import "./cugBill.css"; // Updated CSS file

const CUGbill = () => {
  const [data, setData] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [rowCount, setRowCount] = useState(0);
  const [error, setError] = useState("");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const fileType = file.name.split(".").pop().toLowerCase();
    setError("");

    if (fileType === "csv") {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          setData(results.data);
          setRowCount(results.data.length);
        },
        error: (error) => {
          setError("Error parsing CSV file.");
          console.error("Error parsing CSV file: ", error);
        },
      });
    } else if (fileType === "xlsx") {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);
          setData(jsonData);
          setRowCount(jsonData.length);
        } catch (error) {
          setError("Error parsing XLSX file.");
          console.error("Error parsing XLSX file: ", error);
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      setError("Unsupported file type. Please upload a CSV or XLSX file.");
    }
  };

  const handleSaveToFirebase = async () => {
    if (data.length === 0) {
      setError("No data to upload. Please upload a file first.");
      return;
    }
    setUploading(true);
    try {
      const batchSize = data.length;
      for (let i = 0; i < batchSize; i++) {
        await addDoc(collection(db, "csvdata"), data[i]);
        setProgress(((i + 1) / batchSize) * 100);
      }
      alert("Data successfully saved to Firebase!");
    } catch (error) {
      console.error("Error adding document: ", error);
      setError("Error uploading data to Firebase.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="cugBillContainer">
      <h1>Upload CUG Bill Data</h1>
      {/* <input type="file" accept=".csv, .xlsx" onChange={handleFileUpload} /> */}

      <div class="input-file-container">
        <input class="input-file" type="file" accept=".csv, .xlsx" onChange={handleFileUpload} />
        <label tabindex="0" for="my-file" class="input-file-trigger" style={{fontSize:"15px"}}>
          Click to upload file...
        </label>
      </div>
      <p class="file-return"></p>

      {error && <p className="cugBillError">{error}</p>}
      <button
        onClick={handleSaveToFirebase}
        disabled={uploading || data.length === 0}
        className="cugBillButton"
      >
        {uploading ? "Uploading..." : "Save to Firebase"}
      </button>
      {rowCount > 0 && <p>{rowCount} rows ready for upload.</p>}

      {uploading && (
        <div>
          <progress value={progress} max="100" />
          <p>{progress.toFixed(2)}% uploaded</p>
        </div>
      )}
      {data.length > 0 && (
        <div className="cugBillTableContainer">
          <table className="cugBillTable">
            <thead>
              <tr>
                {Object.keys(data[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((val, i) => (
                    <td key={i}>{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CUGbill;

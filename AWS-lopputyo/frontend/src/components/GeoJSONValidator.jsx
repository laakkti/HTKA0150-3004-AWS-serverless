import React, { useState } from "react";
import axios from "axios";
import { Form, Alert } from "react-bootstrap";
import rewind from "@turf/rewind"; // Ensure this runs safely in your frontend

function fixGeoJSON(text) {
  text = text.replace(/(\s*)([a-zA-Z_][a-zA-Z0-9_]*)\s*:/g, '$1"$2":');
  text = text.replace(/,(\s*[}\]])/g, "$1");
  return text;
}

const GeoJSONValidator = ({ setGeoJson }) => {
  const [input, setInput] = useState("");
  const [jsonError, setJsonError] = useState(null);
  const [geojsonErrors, setGeojsonErrors] = useState([]);

  const validateGeoJSON = async (geojson) => {
    try {
      const url =
        "https://vr6mgijfvf.execute-api.eu-north-1.amazonaws.com/validategeojson";
      const response = await axios.post(url, { geojson });
      return response.data;
    } catch (err) {
      console.error("Validation request failed:", err);
      return { valid: false, errors: ["Server error during validation"] };
    }
  };

  const handleChange = async (e) => {
    const rawText = e.target.value;
    setInput(rawText);

    const fixedText = fixGeoJSON(rawText);

    try {
      const parsed = JSON.parse(fixedText);
      const corrected = rewind(parsed, { reverse: false });

      setJsonError(null);

      const result = await validateGeoJSON(corrected);
      setGeojsonErrors(result.errors || []);

      if (result.valid) {
        setGeoJson?.(corrected);
      } else {
        setGeoJson?.(null);
      }
    } catch (err) {
      setJsonError("Invalid JSON: " + err.message);
      setGeojsonErrors([]);
      setGeoJson?.(null);
    }
  };
  //    <div className="my-1 mx-auto" style={{ width: "100%", maxWidth: "1400px" }}>
  return (
    <div
      className="my-1"
      style={{
        width: "100%",
        maxWidth: "1400px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // center children horizontally
        margin: "0 auto", // center this container itself if needed
      }}
    >
      <Form>
        <Form.Group className="mb-1" controlId="geojsonInput">
          <Form.Label style={{ color: "white" }}>
            Paste your GeoJSON or object here
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={24}
            value={input}
            onChange={handleChange}
            placeholder='Example: {"type":"Polygon","coordinates":[[[22.3936,61.96005],...]]}'
            style={{
              fontFamily: "monospace",
              fontSize: "1rem",
              height: "500px",
              width: "500px",
              backgroundColor: "#f8f9fa",
              textAlign: "left",
            }}
          />
        </Form.Group>
      </Form>

      {jsonError && (
        <Alert variant="danger" style={{ width: "500px" }}>
          {jsonError}
        </Alert>
      )}

      {geojsonErrors.length === 0 && input.trim() && !jsonError && (
        <Alert variant="success" style={{ width: "500px" }}>Valid GeoJSON</Alert>
      )}

      {geojsonErrors.length > 0 && (
        <Alert variant="warning" style={{ width: "500px" }}>
          GeoJSON issues:
          <ul className="mb-0">
            {geojsonErrors.map((err, idx) => (
              <li key={idx}>{err}</li>
            ))}
          </ul>
        </Alert>
      )}
    </div>
  );
};

export default GeoJSONValidator;

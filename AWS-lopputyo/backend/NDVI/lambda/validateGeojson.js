const { hint } = require("@mapbox/geojsonhint");

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const geojson = body.geojson;

    const errors = hint(geojson);

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        valid: errors.length === 0,
        errors: errors.map(e => e.message),
      }),
    };
  } catch (err) {
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ valid: false, errors: ["Invalid input: " + err.message] }),
    };
  }
};

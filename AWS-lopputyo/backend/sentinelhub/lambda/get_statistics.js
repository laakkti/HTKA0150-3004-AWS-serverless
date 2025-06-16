const { request_statistics } = require("../request_statistics");

module.exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  console.log("Request body:", body);

  if (!body.geometry || !body.start_date || !body.end_date) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "Missing geometry, start_date, or end_date",
      }),
    };
  } else {
    const geometry = body.geometry;
    const dateFrom = new Date(body.start_date);
    const dateTo = new Date(body.end_date);

    const result = await request_statistics(geometry, dateFrom, dateTo);
    
    console.log("**********************************************");
    console.log(result.data);

    return {
        status: result.status,
        data: result.data,        
      }
  }
};

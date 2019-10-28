require("dotenv").config();
const pg = require("pg-promise")();

const db = pg(process.env.DB_URL);

exports.handler = async (event, context) => {
  const { lat, lon, type } = event.queryStringParameters;
  const where = type ? " WHERE shelter_type.type = ${type}" : "";

  const shelters = await db.any(
    "SELECT * FROM shelter INNER JOIN shelter_type ON shelter.id = shelter_type.shelter" +
      where +
      " ORDER BY coordinates <-> ST_MakePoint(${lat}, ${lon})::geography",
    { lat, lon, type }
  );

  return {
    statusCode: 200,
    body: JSON.stringify({ shelters })
  };
};

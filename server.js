require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const PORT = 8000;
const helmet = require("helmet");
const cors = require("cors");
const app = express();
const POKEDEX = require("./pokedex");
const { query } = require("express");
const validTypes = [
  `Bug`,
  `Dark`,
  `Dragon`,
  `Electric`,
  `Fairy`,
  `Fighting`,
  `Fire`,
  `Flying`,
  `Ghost`,
  `Grass`,
  `Ground`,
  `Ice`,
  `Normal`,
  `Poison`,
  `Psychic`,
  `Rock`,
  `Steel`,
  `Water`,
];

app.use(helmet());
app.use(cors());

app.use(morgan("custom"));
app.use(function validateBearerToken(req, res, next) {
  const apiToken = process.env.API_TOKEN;
  const authToken = req.get("Authorization");

  if (!authToken || authToken.split(" ")[1] !== apiToken) {
    return res.status(401).json({ error: "Unauthorized request" });
  }

  next();
});

app.get("/types", handleGetTypes);

function handleGetTypes(req, res) {
  res.json(validTypes);
}

app.get("/pokemon", function handleGetPokemon(req, res) {
  let response = POKEDEX.pokemon;
  names = req.query.name;
  types = req.query.type;

  if (names) {
    response = response.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(names.toLowerCase())
    );
  }

  if (types) {
    response = response.filter((pokemon) => pokemon.type.includes(types));
  }

  res.json(response);
});

console.log(process.env.API_TOKEN);

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});

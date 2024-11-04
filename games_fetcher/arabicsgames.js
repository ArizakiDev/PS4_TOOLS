const axios = require("axios");
const fs = require("fs");
const cheerio = require("cheerio");

async function fetchData() {
  try {
    const { data } = await axios.get("https://arabicps4games.com/indexallps4.html");
    const $ = cheerio.load(data);
    const games = [];
    $("tr").each((i, element) => {
      const row = $(element);
      const name = row.find("td").first().text().trim();
      const link = row.find("a").attr("href");

      if (name && link) {
        games.push({ name, link });
      }
    });
    const formattedData = games.map(game => `Nom: ${game.name}, Lien: ${game.link}`).join("\n");
    fs.writeFileSync("arabicsgames.txt", formattedData, "utf-8");

    console.log("Fichier games_list.txt créé avec succès !");
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
  }
}

fetchData();

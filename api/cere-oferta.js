// api/cere-oferta.js - variantă simplă, doar de test

module.exports = (req, res) => {
  // Acceptăm doar POST de la formular
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "Method not allowed" }));
    return;
  }

  // NU mai parsem nimic, nu facem nimic complicat
  // doar confirmăm că am primit cererea cu succes
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ success: true }));
};

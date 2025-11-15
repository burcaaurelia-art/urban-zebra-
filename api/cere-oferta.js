// api/cere-oferta.js - handler super simplu

module.exports = (req, res) => {
  // Acceptăm doar POST de la formular
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "Method not allowed" }));
    return;
  }

  // NU citim body, NU trimitem email acum.
  // Doar răspundem cu succes ca să testăm legătura.
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ success: true }));
};

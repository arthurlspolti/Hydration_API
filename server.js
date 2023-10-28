const express = require("express");
const path = require("path");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(express.static("public"));

// Rota home
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/api/add", async (req, res) => {
  const user = req.body.user;
  const quantity = parseFloat(req.body.quantity);

  try {
    const add = await prisma.water.create({
      data: {
        user: user,
        quantidade: quantity,
      },
    });

    const total = await prisma.water.aggregate({
      where: {
        user: user,
      },
      _sum: {
        quantidade: true,
      },
    });

    res.json({ add, total });
  } catch (error) {
    res.status(500).json({
      error: "Um erro aconteceu enquanto tentavamos salvar a informação.",
    });
  }
});

app.post("/api/reset", async (req, res) => {
  const user = req.body.user;
  try {
    const reset = await prisma.water.deleteMany({
      where: {
        user: user,
      },
    });
    res
      .status(200)
      .json({ text: "Resetado com sucesso os dados do usuario " + user + "." });
  } catch {
    res.status(500).json({
      error: "Um erro aconteceu enquanto tentavamos resetar suas informações.",
    });
  }
});

// Iniciar o servidor na porta 3000
const port = 3000;
const hostLocal = "localhost";
const hostLan = "191.240.72.222";
app.listen(port, "0.0.0.0", () => {
  console.log(`Servidor rodando em http://${hostLan}:${port}`);
});

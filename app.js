const express = require("express");
const { PrismaClient } = require("@prisma/client");
const fs = require("fs");

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Rota para retornar a home
app.get("/", (req, res) => {
  fs.readFile("./index.html", "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Erro de rede");
    } else {
      res.send(data);
    }
  });
});

// Rota para adicionar dados de consumo de água (método POST)
app.post("/addAgua", async (req, res) => {
  try {
    const { quantidade, hora } = req.body;
    const result = await prisma.water.create({
      data: {
        quantidade,
      },
    });
    res.status(201).json({
      message: "Registro de consumo de água adicionado com sucesso",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      error: "Erro ao adicionar registro de consumo de água",
      message: error.message,
    });
  }
});

// Rota para recuperar o valor total de água consumida (método GET)
app.get("/aguaTotal", async (req, res) => {
  try {
    const aguaTotal = await prisma.water.aggregate({
      _sum: {
        quantidade: true,
      },
    });
    res.status(200).json(aguaTotal._sum.quantidade);
  } catch (error) {
    res.status(500).json({
      error: "Erro ao buscar o valor total de água consumida",
      message: error.message,
    });
  }
});

// Iniciar o servidor na porta 3000
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

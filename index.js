import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.OPENAI_KEY;

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: userMessage }],
      }),
    });

    const data = await response.json();

    const reply =
      data.choices?.[0]?.message?.content ||
      data.error?.message ||
      "Erreur IA";

    res.json({ reply });
  } catch (error) {
    res.json({ reply: "Erreur serveur" });
  }
});

app.listen(3000, () => {
  console.log("API IA en ligne sur le port 3000");
});

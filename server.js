import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.post("/api/signup", async (req, res) => {
  try {
    const { phone_number } = req.body;

    if (!phone_number) {
      return res.status(400).json({ error: "No phone number" });
    }

    const response = await fetch("https://api.postscript.io/api/v2/subscribers", {
      method: "POST",
      headers: {
        "Authorization": "Bearer pstk_..."
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        phone_number,
        origin: "website",
        keyword: "GALLOS"
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(400).json({ error: data });
    }

    res.json({ success: true });

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(3000, () => console.log("Server running"));

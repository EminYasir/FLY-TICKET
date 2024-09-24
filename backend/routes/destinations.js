const express = require("express");
const router = express.Router();
const Flight = require("../models/Flight");
const dotenv = require("dotenv");
dotenv.config();

router.get("/", async (req, res) => {

    const apiUrl = `https://api.schiphol.nl/public-flights/destinations?page=5&sort=%2Biata`;
    
    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          app_id: process.env.YOUR_APP_ID,
          app_key: process.env.YOUR_APP_KEY,
          ResourceVersion: "v4", // API versiyonu
          Accept: "application/json",
        },
      });
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const data = await response.json(); // Yanıt JSON formatında döner
    
    
        res.status(200).json(data); // Filtrelenmiş uçuş verilerini JSON olarak gönder
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Server error" });
    }
    });

router.post("/", async (req, res) => {
    try {
      const { name, img } = req.body;
      const newCategory = new Category({ name, img });
      await newCategory.save();
      res.status(201).json(newCategory);
    } catch (error) {
      console.log(error);
    }
  });
  
  module.exports = router;
  
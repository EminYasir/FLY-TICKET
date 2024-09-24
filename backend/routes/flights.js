const express = require("express");
const router = express.Router();
const Flight = require("../models/Flight");
const dotenv = require("dotenv");
dotenv.config();

router.get("/", async (req, res) => {
  try {
    const products = await Flight.find();
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/flights", async (req, res) => {
  const { flightDirection, scheduleDate, destination } = req.query;

  const apiUrl = `https://api.schiphol.nl/public-flights/flights?scheduleDate=${scheduleDate}&flightDirection=${flightDirection}&route=IST&includedelays=false&page=0&sort=%2BscheduleTime`;
  //const apiUrl = `https://api.schiphol.nl/public-flights/flights?scheduleDate=2024-09-24&flightDirection=D&route=IST&includedelays=false&page=0&sort=%2BscheduleTime`;
  //           https://api.schiphol.nl/public-flights/flights?scheduleDate=2024-09-24&flightDirection=A&route=AAG&includedelays=false&sort=%2BscheduleTime
  console.log(apiUrl);
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        app_id: process.env.YOUR_APP_ID,
        app_key: process.env.YOUR_APP_KEY,
        ResourceVersion: "v4",
        Accept: "application/json",
      },
    });

    // Eğer cevap boşsa, hata vermeden önce kontrol et
    if (response.status === 204) {
      // 204 No Content -> API veri döndürmüyor
      return res.status(204).json({ message: "API, veri döndürmedi." });
    }

    // Yanıtın JSON olup olmadığını kontrol et
    const text = await response.text();
    if (text.length === 0) {
      return res.status(500).json({ error: "API yanıtı boş." });
    }

    // JSON pars edilebilir mi diye kontrol et
    let data;
    try {
      data = JSON.parse(text); // JSON olarak pars edilmeye çalış
    } catch (err) {
      return res.status(500).json({ error: "Yanıt JSON formatında değil." });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Sunucu hatası, uçuşlar getirilemedi." });
  }
});

router.get("/airlines", async (req, res) => {
  //const { fromScheduleDate, flightDirection } = req.query;

  const apiUrl = `https://api.schiphol.nl/public-flights/airlines`;

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

router.get("/airlines/:icao", async (req, res) => {
  const { icao } = req.params;
  const apiUrl = `https://api.schiphol.nl/public-flights/airlines/${icao}`;

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        app_id: process.env.YOUR_APP_ID,
        app_key: process.env.YOUR_APP_KEY,
        ResourceVersion: "v4",
        Accept: "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      flightNumber,
      departureTime,
      arrivalTime,
      departureAirport,
      arrivalAirport,
      airlineCode,
      price,
      airline,
    } = req.body;
    const newFlight = new Flight({
      flightNumber,
      departureTime,
      arrivalTime,
      departureAirport,
      arrivalAirport,
      airlineCode,
      price,
      airline,
    });
    await newFlight.save();
    res.status(201).json(newFlight);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

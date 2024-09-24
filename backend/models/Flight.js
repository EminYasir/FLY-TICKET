const mongoose=require("mongoose");

const FlightSchema=mongoose.Schema(
    {
        flightNumber: { type: String, required: true },     // Uçuş numarası
        departureTime: { type: String, required: true },      // Kalkış zamanı (ISO formatında tarih)
        arrivalTime: { type: String, required: true },        // Varış zamanı (ISO formatında tarih)
        departureAirport: { type: String, required: true }, // Kalkış havaalanı kodu veya adı
        arrivalAirport: { type: String, required: true },   // Varış havaalanı kodu veya adı
        airline: { type: String, required: true },   // Varış havaalanı kodu veya adı
        price: { type: String, required: true }       // Terminal numarası
      },
      { timestamps: true }
)


const Flight=mongoose.model("Flight",FlightSchema);

module.exports=Flight;
const express=require("express");
const router=express.Router();


//Diğer rota dosyalarını içe aktarıyoruz.
const flightRouter=require("./flights.js");
const destinationRouter=require("./destinations.js");





//Her rotayı ilgili yol altında kullanıyoruz
router.use("/flights", flightRouter);
router.use("/destinations", destinationRouter);







module.exports=router;
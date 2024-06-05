import express from "express";
import routes from "./routes/index.js";
import __dirname from "./dirname.js";
import handlebars, { engine } from "express-handlebars";
import { Server } from "socket.io";
import viewsRoutes from "./routes/views.routes.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine("handlebars", handlebars.engine()); // motor de platilla
app.set("views", __dirname + "/views"); // ruta de las vista
app.set("view engine", "handlebars"); // motor a usar en las vistas
app.use(express.static("public"));

 //-----------Ruta de la api-------------
app.use("/api", routes);

//-----------Ruta de las vistas----------
app.use("/", viewsRoutes)
const httpServer=app.listen(8080, ()=> {
  console.log("Servidor escuchando en el puerto 8080");
})

//------Configuramos socket--------------
export const io = new Server(httpServer); 
io.on("connection",(socket)=>{
  console.log("Nuevo usuario conectado");
})

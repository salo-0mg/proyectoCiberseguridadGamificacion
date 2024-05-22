import app from "./app";
import "./database"

const port = 4000;
app.listen(port);
console.log("Server listening on port " + port)
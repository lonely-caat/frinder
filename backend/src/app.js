import express from "express";
import ProfileRoutes from "./routes/profileRoutes.js";

const app = express();

app.use(express.json());

app.use("/api/Profiles", ProfileRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App listening at port ${port}`));

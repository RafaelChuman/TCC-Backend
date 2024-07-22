import app from "./src/app";

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`));
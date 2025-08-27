import express from "express";
import cors from "cors";
import buildPDFService from "./pdf/pdfservice.js";

const app = express();
app.use(cors());
app.use(express.json());

// API to generate PDF
app.post("/generate-pdf", (req, res) => {
  const formData = req.body;

  res.writeHead(200, {
    "Content-Type": "application/pdf",
    "Content-Disposition": "attachment; filename=stamp.pdf",
  });

  buildPDFService(
    formData,
    (chunk) => res.write(chunk),
    () => res.end()
  );
});

app.listen(5000, () =>
  console.log("✅ Server running on http://localhost:5000")
);

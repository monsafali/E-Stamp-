import express from "express";
import buildPDFService from "./pdf/pdfservice.js";

const router = express.Router();

router.get("/invoice", (req, res) => {
  res.writeHead(200, {
    "Content-Type": "application/pdf",
    "Content-Disposition": "attachment; filename=invoice.pdf",
  });

  buildPDFService(
    (chunk) => res.write(chunk),
    () => res.end()
  );
});

export default router;

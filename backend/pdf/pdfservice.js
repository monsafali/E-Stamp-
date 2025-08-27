import PDFDocument from "pdfkit";
import QRCode from "qrcode";
import bwipjs from "bwip-js"; // npm install bwip-js

function buildPDFService(data, dataCallback, endCallback) {
  const doc = new PDFDocument({ margin: 40 });
  doc.on("data", dataCallback);
  doc.on("end", endCallback);

  // ----- HEADER -----
  doc
    .font("Helvetica-Bold")
    .fontSize(16)
    .text("E-Stamp Certificate", 0, 20, { align: "center" });

  doc
    .strokeColor("#aaaaaa")
    .lineWidth(0.5)
    .moveTo(40, 50)
    .lineTo(doc.page.width - 40, 50)
    .stroke();

  // Barcode
  bwipjs.toBuffer(
    {
      bcid: "code128",
      text: data.id || "PB-BWN-XXXXXX",
      scale: 2,
      height: 8,
    },
    (err, png) => {
      if (!err) {
        doc.image(png, 40, 60, { width: 200, height: 30 });
      }

      // QR
      QRCode.toBuffer(
        data.qrData || "https://verify-stamp.com/" + (data.id || "12345"),
        (err, qrBuffer) => {
          if (!err) {
            doc.image(qrBuffer, doc.page.width - 155, 60, {
              width: 100,
              height: 100,
            });
          }

          // ---- ID / Type / Amount block (just under barcode & QR) ----
          let topY = 120; // Position under barcode line

          doc.fillColor("black").font("Helvetica").fontSize(11);

          doc.text("ID:", 40, topY);
          doc
            .font("Helvetica-Bold")
            .text(data.id || "PB-BWN-XXXXXX", 150, topY);
          topY += 20;

          doc.font("Helvetica").text("Type:", 40, topY);
          doc
            .font("Helvetica-Bold")
            .text(data.type || "Low Denomination", 150, topY);
          topY += 20;

          doc.font("Helvetica").text("Amount:", 40, topY);
          doc
            .font("Helvetica-Bold")
            .text("Rs " + (data.amount || "0") + "/-", 150, topY);
          topY += 30;

          // Online verification text (aligned right, same height as ID block)
          doc
            .fontSize(10)
            .font("Helvetica-Bold")
            .text("Scan for online verification", doc.page.width - 200, 160, {
              align: "right",
              width: 160,
            });

          // ---- Rest of the details start here ----
          let currentY = topY;

          // ----- BODY -----
          // Manually position each field for precise alignment
          // Labels on the left, values aligned to the right of labels

          // Description
          doc.font("Helvetica").fontSize(11).text("Description:", 40, currentY);
          doc
            .font("Helvetica-Bold")
            .text(data.description || "AFFIDAVIT-4", 150, currentY);
          currentY += 20;

          // Applicant
          doc.font("Helvetica").fontSize(11).text("Applicant:", 40, currentY);
          doc
            .font("Helvetica-Bold")
            .text(
              data.applicant || "MUHAMMAD ZEESHAN LATIF [31103-3454332-5]",
              150,
              currentY
            );
          currentY += 20;

          // S/O
          doc.font("Helvetica").fontSize(11).text("S/O:", 40, currentY);
          doc
            .font("Helvetica-Bold")
            .text(data.sonOf || "MUHAMMAD LATIF", 150, currentY);
          currentY += 20;

          // Agent
          doc.font("Helvetica").fontSize(11).text("Agent:", 40, currentY);
          doc.font("Helvetica-Bold").text(data.agent || "Self", 150, currentY);
          currentY += 20;

          // Address
          doc.font("Helvetica").fontSize(11).text("Address:", 40, currentY);
          doc
            .font("Helvetica-Bold")
            .text(
              data.address || "CHAK NO.312/HR TEHSIL FORTABBAS",
              150,
              currentY
            );
          currentY += 20;

          // Issue Date
          doc.font("Helvetica").fontSize(11).text("Issue Date:", 40, currentY);
          doc
            .font("Helvetica-Bold")
            .text(data.issueDate || new Date().toLocaleString(), 150, currentY);
          currentY += 20;

          // Delisted On/Validity
          doc
            .font("Helvetica")
            .fontSize(11)
            .text("Delisted On/Validity:", 40, currentY);
          doc
            .font("Helvetica-Bold")
            .text(data.validity || "27-Aug-2025", 150, currentY);
          currentY += 20;

          // Amount in Words
          doc
            .font("Helvetica")
            .fontSize(11)
            .text("Amount in Words:", 40, currentY);
          doc
            .font("Helvetica-Bold")
            .text(
              data.amountWords || "Three Hundred Rupees Only",
              150,
              currentY
            );
          currentY += 20;

          // Reason
          doc.font("Helvetica").fontSize(11).text("Reason:", 40, currentY);
          doc
            .font("Helvetica-Bold")
            .text(data.reason || "AFFIDAVIT", 150, currentY);
          currentY += 20;

          // Vendor Information
          doc
            .font("Helvetica")
            .fontSize(11)
            .text("Vendor Information:", 40, currentY);
          doc
            .font("Helvetica-Bold")
            .text(
              data.vendorInfo ||
                "Muhammad Ilyas | PB-BWN-375 | Nawab Colony, Fortabbas",
              150,
              currentY
            );
          currentY += 40; // Space before footer

          doc.end();
        }
      );
    }
  );
}

export default buildPDFService;

import React, { useRef, useEffect } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import QRCode from "qrcode.react";
import JsBarcode from "jsbarcode";

export default function StampGenerator() {
  const stampRef = useRef(null);
  const barcodeRef = useRef(null);

  // Generate barcode once component renders
  useEffect(() => {
    JsBarcode(barcodeRef.current, "ESTAMP123456789", {
      format: "CODE128",
      lineColor: "#000",
      width: 2,
      height: 50,
      displayValue: true,
    });
  }, []);

  const generatePDF = async () => {
    const input = stampRef.current;
    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    pdf.addImage(imgData, "PNG", 10, 10, 190, 270);
    pdf.save("e-stamp.pdf");
  };

  return (
    <div className="flex flex-col items-center p-6">
      <div
        ref={stampRef}
        className="w-[800px] h-[1100px] border-4 border-gray-800 bg-white p-8 shadow-2xl relative"
      >
        {/* Header */}
        <h1 className="text-3xl font-bold text-center mb-2">
          Government of XYZ
        </h1>
        <h2 className="text-xl font-semibold text-center mb-6">
          E-Stamp Certificate
        </h2>

        {/* QR + Barcode */}
        <div className="flex justify-between items-center mb-4">
          <QRCode value="ESTAMP123456789" size={100} />
          <svg ref={barcodeRef}></svg>
        </div>

        {/* Certificate Body */}
        <div className="space-y-4">
          <p>
            <span className="font-semibold">ID:</span> ESTAMP123456789
          </p>
          <p>
            <span className="font-semibold">Type:</span> Non-Judicial
          </p>
          <p>
            <span className="font-semibold">Amount:</span> Rs. 500
          </p>
          <p>
            <span className="font-semibold">Description:</span> Stamp duty
            payment for legal agreement.
          </p>
          <p>
            <span className="font-semibold">Issued To:</span> Monsaf Ali
          </p>
          <p>
            <span className="font-semibold">Date:</span>{" "}
            {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Footer */}
        <div className="absolute bottom-6 left-0 right-0 text-center">
          <p className="text-xs text-gray-500">
            This is a system generated certificate and does not require any
            signature.
          </p>
        </div>
      </div>

      {/* Download Button */}
      <button
        onClick={generatePDF}
        className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
      >
        Download PDF
      </button>
    </div>
  );
}

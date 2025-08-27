import { useState } from "react";
import axios from "axios";

export default function App() {
  const [formData, setFormData] = useState({
    id: "PB-BWN-825AC388BB54962C",
    applicant: "",
    sonOf: "",
    type: "Low Denomination",
    amount: "300",
    address: "",
    reason: "AFFIDAVIT",
    description: "AFFIDAVIT - 4",
    vendorInfo: "Muhammad Ilyas | PB-BWN-375 | Nawab Colony, Fortabbas",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleDownload = async () => {
    const response = await axios.post(
      "http://localhost:5000/generate-pdf",
      formData,
      {
        responseType: "blob",
      }
    );

    const file = new Blob([response.data], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(file);
    link.download = "stamp.pdf";
    link.click();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">E-Stamp Form</h2>
        <div className="space-y-4">
          <input
            className="w-full border p-2 rounded"
            placeholder="Applicant"
            name="applicant"
            onChange={handleChange}
          />
          <input
            className="w-full border p-2 rounded"
            placeholder="S/O"
            name="sonOf"
            onChange={handleChange}
          />
          <input
            className="w-full border p-2 rounded"
            placeholder="Type"
            name="type"
            value={formData.type}
            onChange={handleChange}
          />
          <input
            className="w-full border p-2 rounded"
            placeholder="Amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
          />
          <input
            className="w-full border p-2 rounded"
            placeholder="Address"
            name="address"
            onChange={handleChange}
          />
          <input
            className="w-full border p-2 rounded"
            placeholder="Reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
          />
          <button
            onClick={handleDownload}
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
          >
            Generate PDF
          </button>
        </div>
      </div>
    </div>
  );
}

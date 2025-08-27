import React, { useState, useEffect } from "react";

export default function RegistrationForm() {
  const [data, setData] = useState({});
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [tehsil, setTehsil] = useState("");

  useEffect(() => {
    fetch("/pakistan.json")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Error loading JSON:", err));
  }, []);

  const provinces = Object.keys(data);
  const districts = province ? Object.keys(data[province]) : [];
  const tehsils = province && district ? data[province][district] : [];

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`
      Name: ${e.target.name.value}
      Email: ${e.target.email.value}
      Province: ${province}
      District: ${district}
      Tehsil: ${tehsil}
    `);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4">Registration Form</h2>

        {/* Name */}
        <label className="block mb-3">
          <span className="text-gray-700">Name</span>
          <input
            type="text"
            name="name"
            className="mt-1 block w-full border rounded-md p-2"
            required
          />
        </label>

        {/* Email */}
        <label className="block mb-3">
          <span className="text-gray-700">Email</span>
          <input
            type="email"
            name="email"
            className="mt-1 block w-full border rounded-md p-2"
            required
          />
        </label>

        {/* Province */}
        <label className="block mb-3">
          <span className="text-gray-700">Province</span>
          <select
            value={province}
            onChange={(e) => {
              setProvince(e.target.value);
              setDistrict("");
              setTehsil("");
            }}
            className="mt-1 block w-full border rounded-md p-2"
            required
          >
            <option value="">Select Province</option>
            {provinces.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>

        {/* District */}
        <label className="block mb-3">
          <span className="text-gray-700">District</span>
          <select
            value={district}
            onChange={(e) => {
              setDistrict(e.target.value);
              setTehsil("");
            }}
            disabled={!province}
            className="mt-1 block w-full border rounded-md p-2"
            required
          >
            <option value="">Select District</option>
            {districts.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </label>

        {/* Tehsil */}
        <label className="block mb-3">
          <span className="text-gray-700">Tehsil</span>
          <select
            value={tehsil}
            onChange={(e) => setTehsil(e.target.value)}
            disabled={!district}
            className="mt-1 block w-full border rounded-md p-2"
            required
          >
            <option value="">Select Tehsil</option>
            {tehsils.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

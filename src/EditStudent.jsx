import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditStudent() {
  const { studentid } = useParams();

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [validation, setValidation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8500/students/" + studentid)
      .then((res) => res.json())
      .then((data) => {
        setId(data.id);
        setName(data.name);
        setAddress(data.address);
        setPhone(data.phone);
      })
      .catch((err) => console.log(err.message));
  }, [studentid]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const studentData = { id, name, address, phone };

    fetch("http://localhost:8500/students/" + studentid, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(studentData),
    })
      .then(() => {
        alert("Student Data Updated Successfully");
        navigate("/");
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
          Edit Student Details
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* ID */}
          <div>
            <label htmlFor="id" className="block text-gray-600 mb-1">
              ID
            </label>
            <input
              type="text"
              id="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              onMouseDown={() => setValidation(true)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
            {id.length === 0 && validation && (
              <span className="text-red-500 text-sm">Please enter your ID</span>
            )}
          </div>

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-gray-600 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onMouseDown={() => setValidation(true)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
            {name.length === 0 && validation && (
              <span className="text-red-500 text-sm">Please enter your name</span>
            )}
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-gray-600 mb-1">
              Address
            </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              onMouseDown={() => setValidation(true)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
            {address.length === 0 && validation && (
              <span className="text-red-500 text-sm">Please enter your address</span>
            )}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-gray-600 mb-1">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onMouseDown={() => setValidation(true)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
            {phone.length === 0 && validation && (
              <span className="text-red-500 text-sm">Please enter your phone number</span>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition"
            >
              Update
            </button>
            <Link
              to="/"
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition"
            >
              Back
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

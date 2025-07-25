import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewDetails() {
  const { studentid } = useParams();
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8500/students/" + studentid)
      .then((res) => res.json())
      .then((data) => setStudentData(data))
      .catch((err) => console.log(err.message));
  }, [studentid]);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
          Student Details
        </h1>

        {studentData ? (
          <div className="space-y-4 text-gray-700">
            <p>
              <strong className="font-medium">ID:</strong>{" "}
              <span className="ml-2">{studentData.id}</span>
            </p>
            <p>
              <strong className="font-medium">Name:</strong>{" "}
              <span className="ml-2">{studentData.name}</span>
            </p>
            <p>
              <strong className="font-medium">Address:</strong>{" "}
              <span className="ml-2">{studentData.address}</span>
            </p>
            <p>
              <strong className="font-medium">Phone:</strong>{" "}
              <span className="ml-2">{studentData.phone}</span>
            </p>
          </div>
        ) : (
          <p className="text-center text-gray-500 italic">Loading student details...</p>
        )}

        <div className="mt-6 text-center">
          <Link
            to="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
          >
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}

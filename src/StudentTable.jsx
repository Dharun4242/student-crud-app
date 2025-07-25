import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function StudentTable() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  const DisplayDetails = (id) => {
    navigate("/student/view/" + id);
  };

  const EditDetails = (id) => {
    navigate("/student/edit/" + id);
  };

  const RemoveDetails = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      fetch("http://localhost:8500/students/" + id, {
        method: "DELETE",
      })
        .then(() => {
          alert("Student Data Deleted Successfully");
          // Refresh data after deletion
          setStudents((prev) => prev.filter((s) => s.id !== id));
        })
        .catch((err) => console.log(err.message));
    }
  };

  useEffect(() => {
    fetch("http://localhost:8500/students")
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-700">Student Data</h2>
          <Link
            to="/student/create"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-300"
          >
            + Add New Student
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-200 text-gray-700 text-left">
              <tr>
                <th className="px-4 py-2 border-b">#</th>
                <th className="px-4 py-2 border-b">Name</th>
                <th className="px-4 py-2 border-b">Address</th>
                <th className="px-4 py-2 border-b">Mobile</th>
                <th className="px-4 py-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.length > 0 ? (
                students.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-2 border-b">{index + 1}</td>
                    <td className="px-4 py-2 border-b">{item.name}</td>
                    <td className="px-4 py-2 border-b">{item.address}</td>
                    <td className="px-4 py-2 border-b">{item.phone}</td>
                    <td className="px-4 py-2 border-b space-x-2">
                      <button
                        onClick={() => DisplayDetails(item.id)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm"
                      >
                        View
                      </button>
                      <button
                        onClick={() => EditDetails(item.id)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => RemoveDetails(item.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-4 text-gray-500 italic"
                  >
                    No students found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

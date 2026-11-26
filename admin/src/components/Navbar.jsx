import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext);
  const navigate = useNavigate();

  const logout = () => {
    // ✅ First clear tokens from state & storage
    if (aToken) {
      setAToken(null);
      localStorage.removeItem("aToken");
    }
    if (dToken) {
      setDToken(null);
      localStorage.removeItem("dToken");
    }

    // ✅ After clearing, navigate
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-[#a3ecff] shadow-sm">
      <div className="flex items-center gap-2 text-xs sm:text-sm">
        <span
          className="text-2xl font-bold text-primary cursor-pointer"
          onClick={() => navigate("/")}
        >
          Bpollo
        </span>
        <p className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600">
          {aToken ? "Admin" : dToken ? "Doctor" : "Guest"}
        </p>
      </div>

      {(aToken || dToken) && (
        <button
          onClick={logout}
          className="bg-primary text-white text-sm px-6 sm:px-10 py-2 rounded-full hover:opacity-90 transition"
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default Navbar;

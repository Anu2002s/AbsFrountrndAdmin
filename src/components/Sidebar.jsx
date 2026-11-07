import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";
import { DoctorContext } from "../context/DoctorContext";
import { AdminContext } from "../context/AdminContext";

const Sidebar = () => {
  const { dToken } = useContext(DoctorContext);
  const { aToken } = useContext(AdminContext);

  const renderNavLink = (to, icon, label) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 py-3.5 px-4 md:px-8 md:min-w-64 rounded-xl transition-colors duration-200 ${
          isActive
            ? "bg-gradient-to-r from-gray-700 to-gray-800 text-white font-semibold shadow-lg"
            : "text-gray-300 hover:bg-gray-700/60"
        }`
      } 
    >
      <img className="w-5" src={icon} alt="" />
      <p className="hidden md:block">{label}</p>
    </NavLink>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 border-r border-gray-800 shadow-xl px-2 py-6">
      {aToken && (
        <ul className="flex flex-col gap-2">
          {renderNavLink("/admin-dashboard", assets.home_icon, "Dashboard")}
          {renderNavLink(
            "/all-appointments",
            assets.appointment_icon,
            "Appointments"
          )}
          {renderNavLink("/add-doctor", assets.add_icon, "Add Doctor")}
          {renderNavLink("/doctor-list", assets.people_icon, "Doctors List")}
        </ul>
      )}

      {dToken && (
        <ul className="flex flex-col gap-2">
          {renderNavLink("/doctor-dashboard", assets.home_icon, "Dashboard")}
          {renderNavLink(
            "/doctor-appointments",
            assets.appointment_icon,
            "Appointments"
          )}
          {renderNavLink("/doctor-profile", assets.people_icon, "Profile")}
        </ul>
      )}
    </div>
  );
};

export default Sidebar;

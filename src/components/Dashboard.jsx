import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";
import { auth, logout } from "../../firebase-auth";
import { getUserData, addNewUser } from "../controllers/userController";
// import axios from "axios";

function Dashboard() {
  

  return (
    <div className="profile">
      
    </div>
  );
}
export default Dashboard;
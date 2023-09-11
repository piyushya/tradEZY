import { useEffect, useState} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Dashboard.css";
import { auth, logout } from "../../firebase-auth";
import { getUserData, addNewUser } from "../controllers/userController";
// import axios from "axios";

function Profile() {
  const location = useLocation();

  console.log(location.ud);

  const [user, loading] = useAuthState(auth);
  const [userData, setUserData] = useState({
    name: "",
    phNumber: "",
    address: ""
  });
  const [editProfile, setEditProfile] = useState(false);

  const navigate = useNavigate();

  // get userdata from database
  const fetchUserData = () => {
    let ud = {};
    try {
      console.log("started loading user data"); // replace with spinner
      getUserData(user.uid).then((data) => {
        setUserData({...data})
      })
      .finally(() => {
        console.log("done loading user data"); // replace with spinner
      })
      return ud;
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
    // fetchUserData();
  }, [user, loading]);

  function updateUser(e){
    e.preventDefault();
    // update user data
    console.log(userData)
    console.log("started updating user") // add spinner
    addNewUser(userData)
    console.log("done updating user") // add spinner
    // reset form to normal
    disableEdit();
  }

  // allow user data to be edited and display a save changes button
  function enableEdit(){
    setEditProfile(true);
  }

  // disable edit
  function disableEdit(){
    setEditProfile(false);
  }

  function handleChange(e){
    setUserData((prev) => ({...prev, [e.target.name] : e.target.value}));
  }

  function UserField(props){
    return <>
    <label htmlFor={props.name}>{props.name} : </label>
    <input name={props.name} type="text" disabled={!editProfile} value={userData[props.name]}
      onChange={handleChange}></input>
    <hr></hr>
    </>
  }

  return (
    <div className="profile">
      <form onSubmit={updateUser}>
        <img src = {userData.ppUrl} alt="user profile image" width="100px" height="100px"/>
        <br></br>

        {UserField({name : "name"})}
        {UserField({name : "address"})}
        {UserField({name : "phNumber"})}

        {editProfile ? <button type="submit">Save Changes</button> : ""}
        {!editProfile ? <button type="button" onClick={enableEdit}>Edit Profile</button> : ""}
        <button type="button" onClick={logout}>Logout</button>
      </form>
    </div>
  );
}
export default Profile;
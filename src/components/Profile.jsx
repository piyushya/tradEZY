import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";
import { auth, logout } from "../../firebase-auth";
import { getUserData } from "../controllers/userController";

function Profile(props) {
  const [user, loading] = useAuthState(auth);
  const [userData, setUserData] = useState(props.userData ? props.userData : {})
  // const [disabled, setDisabled] = useState({
  //   name : true,
  //   pp : true,
  // })
  // const [changes, setChanges] = useState(false)

  const navigate = useNavigate();

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
    fetchUserData();
  }, [user, loading]);

  // function updateUser(){
  //   console.log("update user")
  // }

  // function enableEdit(){
  //   setDisabled((prev) => (
  //     {...prev, name: false}
  //   ))
  //   setChanges(true)
  // }

  return (
    <div className="profile">
      {/* <form onSubmit={updateUser}>
        <input type="textbox" disabled={disabled.name} value={userData.name}/>
        <button onClick={enableEdit}>edit name</button>
        {changes ? <button type="submit">Save changes</button> : ""}
      </form> */}
       <div className="profile__container">
         <img src={userData.ppUrl} width="100px" height="100px"/>
          Logged in as
         <div>{userData.name}</div>
         <div>{userData.email}</div>
         <button className="logout__btn" onClick={logout}>
          Logout
         </button>
       </div>
    </div>
  );
}
export default Profile;
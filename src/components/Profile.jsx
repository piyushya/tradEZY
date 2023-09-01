import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";
import { auth, logout } from "../../firebase-auth";
import { getUserData, addNewUser } from "../controllers/userController";
import axios from "axios";

function Profile(props) {
  const [user, loading] = useAuthState(auth);
  const [userData, setUserData] = useState(props.userData ? props.userData : {})
  const [disabled, setDisabled] = useState({
    name : true,
    pp : true,
  })
  const [changes, setChanges] = useState(false)

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

  function updateUser(e){
    e.preventDefault();
    // remove save shanges button
    setChanges(false)
    // check if image update selected, and upload image to imgBB and change url in usrData state
    if(disabled.pp === false){
      handleUpload().then(() => {
        // update user data
        console.log("started updating user") // add spinner
        addNewUser(userData)
        console.log("done updating user") // add spinner
      })
    }
    else{
      // update user data
      console.log("started updating user") // add spinner
      addNewUser(userData)
      console.log("done updating user") // add spinner
    }
    // reset form to normal
    setDisabled({name: true, pp: true});
  }

  // change profile image by importing it from local file
  // function changeProfileImage(){

  // }
  
  /////////////////////////////////////////////////
  // problem with url not updating in the database //
  ///////////////////////////////////////////////////

  async function handleUpload() {
    const imageInput = document.getElementById("imageInput");
    const file = imageInput.files[0];
    if (!file) {
      alert("Please select an image.");
    }
    try {
      // Upload the image to imgBB
      console.log("started uploading image") // add spinner
      const res = await uploadToImgBB(file)
      console.log("finished uploading image") // remove spinner

      console.log(res.data.data)
      setUserData((prev) => ({...prev, ppUrl : res.data.data.url}));
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  async function uploadToImgBB(img) {
    const apiKey = "64ef48d03a36dd907acfc2572de3a51b"; // imgBB API key
    let body = new FormData()
    body.set('key', apiKey)
    body.append('image', img)
    return axios({
      method: 'post',
      url: 'https://api.imgbb.com/1/upload',
      data: body
    })
  }
  
  // async function uploadToCDN(formData) {
  //   const response = await fetch("YOUR_CDN_UPLOAD_URL", {
  //     method: "POST",
  //     body: formData,
  //   });
  
  //   const data = await response.json();
  //   return data.cdnUrl; // Adjust the property name as needed
  // }
  
  // async function saveToDatabase(cdnUrl) {
  //   const response = await fetch("YOUR_DATABASE_API_ENDPOINT", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ imageUrl: cdnUrl }),
  //   });
  
  //   const data = await response.json();
  //   return data.message;
  // }

  // allow user data to be edited and display a save changes button
  function enableEdit(element){
    if (element === 2){
      setDisabled({name: false, pp: true})
    }
    else if(element === 1) {
      setDisabled({pp: false, name: true})
    }
    setChanges(true)
  }

  return (
    <div className="profile">
      <form onSubmit={updateUser}>
        <img src = {userData.ppUrl} alt="user profile image" width="100px" height="100px"/>
        <button type="button" onClick={() => {enableEdit(1)}}>edit image</button>

        <br></br>

        {/* If profile pic is selected for edit then show image input */}
        {!disabled.pp ? <input type="file" id="imageInput" accept="image/*"></input> : ""}

        <hr></hr>

        <input onChange={(e) => setUserData((prev) => ({...prev, name: e.target.value}))} 
          type="textbox" disabled={disabled.name} value={userData.name}/>
        
        <button type="button" onClick={() => {enableEdit(2)}}>edit name</button>

        <hr></hr>

        {changes ? <button type="submit">Save changes</button> : ""}

        <button className="logout__btn" onClick={logout}>
          Logout
         </button>

      </form>
       {/* <div className="profile__container">
         <img src={userData.ppUrl} width="100px" height="100px"/>
          Logged in as
         <div>{userData.name}</div>
         <div>{userData.email}</div>
       </div> */}
    </div>
  );
}
export default Profile;
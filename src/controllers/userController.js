import { onValue, ref, set, get } from "firebase/database";
import { db, app } from '../../firebase-config'
import { uid } from 'uid'

async function getUserData(uid){
    const dbRef = ref(db, 'data/users/' + uid);
    let userData = {};
    const snapshot = await get(dbRef);
    snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
        userData[childKey] = childData;
    });
    return userData;
}

function addNewUser(userData){
    const reference = ref(db, 'data/users/' + userData.userId);
    set(reference,{
        email: userData.email,
        name: userData.name,
        phNumber: userData.phNumber,
        ppUrl: userData.ppUrl,
        userId: userData.userId,
        address: userData.address,
        listings: []
    })
}

async function userExists(uid){
    const userRef = ref(db, 'data/users/' + uid);
    const userSnapshot = await get(userRef)
    if (userSnapshot.exists()) {
        return true
    }
    return false
}

// async function updateUserData(){
//     //
// }

export {
    addNewUser,
    getUserData,
    userExists
}

import { firestore, getAuth, doc, setDoc, getDoc } from "../firebase/Config"


  const getUserInfo = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      const userRef = doc(firestore, "users", user.uid)
      const userSnap = await getDoc(userRef);
      console.log("USER INFO", userSnap.data())
      if (userSnap.exists()) {
        const data = userSnap.data();

        console.log("User Data:", data);
        return(userSnap.data())
      } else {
        console.log("No user data found!");
        return null;
      }

    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }

  }

  const updateUserInfo = async (updatedUser) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      console.error("No authenticated user found");
      return;
    }

    const userRef = doc(firestore, "users", user.uid);

    try {
      await setDoc(userRef, updatedUser, { merge: true }); // Use merge to avoid overwriting
      console.log("User info updated successfully");
      getUserInfo();
    } catch (error) {
      console.error("Error updating user info:", error);
    }
  };

  export {updateUserInfo, getUserInfo}
import { firestore, collection, setDoc, doc, serverTimestamp } from "../firebase/Config";

export async function addFriend({ userEmail, userId, friendId, friendEmail }) {
  try {
    await setDoc(doc(collection(firestore, "users", userId, "friends"), friendId), {
      addedAt: serverTimestamp(),
      email: friendEmail,
    });

    await setDoc(doc(collection(firestore, "users", friendId, "friends"), userId), {
      addedAt: serverTimestamp(),
      email: userEmail,
    });

    console.log("Friend added!");
    console.log(userEmail, "lisäsi kaveriksi", friendEmail);
  } catch (error) {
    console.error("Error adding friend: ", error);
  }
}

import React, { useContext } from "react";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase"; // Ensure this import is correct
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import SummaryApi from "../Common";
import Context from "../context";
import { setUserDetails } from "../store/userSlice"; // Ensure the correct path

const OAuth = () => {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Use dispatch from Redux
  const { fetchUserDetails } = useContext(Context);

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      const resultFromGoogle = await signInWithPopup(auth, provider);
      const { displayName, email, photoURL } = resultFromGoogle.user;

      const res = await fetch(SummaryApi.google.url, {
        method: SummaryApi.google.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: displayName,
          email,
          googlePhotoUrl: photoURL,
        }),
      });

      console.log("response", res);

      if (!res.ok) {
        const errorText = await res.text(); // Read the response as text
        console.error("Server error:", errorText);
        return;
      }

      const data = await res.json();
      console.log("data", data);

      // Dispatch action to store user details in Redux
      if (data.success) {
        dispatch(setUserDetails(data.data.userData));
      }

      // fetchUserDetails();
      navigate("/");
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  return (
    <div>
      <button
        aria-label="Sign up with Google"
        className="p-3 bg-transparent rounded-md"
        onClick={handleGoogleClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="w-5 h-5 fill-current text-white"
        >
          <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
        </svg>
      </button>
    </div>
  );
};

export default OAuth;

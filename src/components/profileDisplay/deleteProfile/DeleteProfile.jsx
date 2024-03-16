import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import "./DeleteProfile.css";

function DeleteProfile({ token, profiles, setProfiles, userId }) {
  const [response, setResponse] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Confirmation Dialog
    const isConfirmed = window.confirm(
      "Are you sure you want to delete your profile?"
    );
    if (!isConfirmed) {
      return; // If not confirmed, do nothing
    }

    try {
      let response = await fetch(`http://127.0.0.1:4000/profile/${userId}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          Authorization: token,
        },
      });

      if (response.ok) {
        // Update profiles after deletion
        const data = await response.json();
        const updatedProfiles = profiles.filter(
          (profile) => profile._id !== data.deletedProfile._id
        );
        setProfiles(updatedProfiles);

        console.log("Profile Deleted:", data.deletedProfile);

        setResponse(
          `Profile deleted successfully. Deleted Profile: ${JSON.stringify(
            data.deletedProfile
          )}`
        );

        navigate("/");
      } else {
        const data = await response.json();
        console.error("Error deleting profile:", data.message);
        setResponse("Error deleting profile. Please try again.");
      }
    } catch (err) {
      console.error("Error handling response:", err);

      //console.log("Response status:", response.status);
      //console.log("Response text:", await response.text());
      setResponse("Error deleting profile. Please try again.");
    }
  };

  return (
    <div className="delete-profile">
      <Button className="delete-button" onClick={handleSubmit}>
        Delete Profile
      </Button>

      {response && <p>{response}</p>}
    </div>
  );
}

export default DeleteProfile;
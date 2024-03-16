import React, { useEffect, useState } from "react";
//import { useNavigate } from "react-router-dom";
import { getAllProfiles } from "../../lib/utils";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./ProfileDisplay.css";

import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  //Button,
} from "reactstrap";

import DeleteProfile from "./deleteProfile/DeleteProfile";
import UpdateProfile from "./updateProfile/UpdateProfile";

function ProfileDisplay({ token, profiles, setProfiles }) {
  //const navigate = useNavigate();
  const { userId } = useParams();
  console.log(userId);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  // Fetch the profile based on userId
  useEffect(() => {
    //console.log("Fetching profile for userId:", userId);
   const fetchProfile = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/profile/${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: token
          },
        }
      )
      if(response.ok) {
      const data = await response.json();
          console.log(data);
          setProfile(data);
      } else {
            const data = await response.json();
            setError(data.error || "Unknown error");}
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
   };
   fetchProfile();
    /* const fetchProfile = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/profile/${userId}`,
          //"http://localhost:4000/profile/:userId",
          {
            method: "GET",
            headers: {
              Authorization: token,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setProfile(data);
        } else {
          const data = await response.json();
          setError(data.error || "Unknown error");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Error fetching profile. Please try again.");
      }
    };
    fetchProfile(); */
  }, [token]);
  
  console.log("PROFILE:", profile);
  return (
    <div>
      {/* <h1>{profile?.found.username}</h1> */}
      <Card id="picture">
        <CardBody>
          <CardTitle tag="h5">{profile?.found.username}</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6"></CardSubtitle>
          <CardText>{profile?.found.bio}</CardText>
        </CardBody>
      </Card>

      <img
        alt="Sample"
        src="https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fEFzaWFuJTIwJTIwZm9vZHxlbnwwfHwwfHx8MA%3D%3D"
      />
      <img
        alt="Sample"
        src="https://plus.unsplash.com/premium_photo-1700677185839-6c43037e46be?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fGhvbWVtYWRlJTIwZm9vZHxlbnwwfHwwfHx8MA%3D%3D"
      />

      <img
        alt="Sample"
        src="https://images.unsplash.com/photo-1555072956-7758afb20e8f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTJ8fGhvbWVtYWRlJTIwZm9vZHxlbnwwfHwwfHx8MA%3D%3D"
      />

       {/* Render the DeleteProfile and UpdateProfile components only when the profile is available  */}
      {error ? (
        <p>Error: {error}</p>
      ) : (
        profile && (
          <>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <UpdateProfile
              userId={userId}
              token={token}
              getAllProfiles={getAllProfiles}
            />
            <br></br>
            <br></br>
            <DeleteProfile
              userId={userId}
              profile={profile}
              token={token}
              profiles={profiles}
              setProfiles={setProfiles}
            />
            <br></br>
            <br></br>
            
            {/* <Link to={`/post/${userId}`}>
              <button>View & Edit My Recipe Posts</button>
            </Link> */}
          </>
        )
      )} 
    </div>
  );
}

export default ProfileDisplay;
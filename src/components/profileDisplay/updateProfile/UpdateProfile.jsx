import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

function UpdateProfile({ token, userId }) {
  const [response, setResponse] = useState("");
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  const [fields, setFields] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    username: "",
    bio: "",
    image: "",
  });

  useEffect(() => {
    // Fetch the current profile data when the component mounts
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:4000/profile/${userId}`,
          {
            method: "GET",
            headers: {
              Authorization: token,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          const { found } = data;

          setFields(found);
        } else {
          console.error("Error fetching profile:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [token, userId]);

  const toggleModal = () => setModal(!modal);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const requestBody = {};

      Object.keys(fields).forEach((key) => {
        if (typeof fields[key] === "string" && fields[key].trim() !== "") {
          requestBody[key] = fields[key];
        }
      });

      const response = await fetch(`http://127.0.0.1:4000/profile/${userId}`, {
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `${token}`,
        }),
        method: "PATCH",
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const data = await response.json();
        setResponse(data.message);
        console.log("Profile Updated!:", data);
        toggleModal();
      } else {
        const data = await response.json();
        console.error("Error:", data.message);
        setResponse("Error updating profile. Please try again.");
      }
    } catch (err) {
      console.error("Error:", err);
      setResponse("Error updating profile. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFields((prevFields) => ({ ...prevFields, [name]: value }));
  };

  return (
    <div className="update-profile">
      <Button color="secondary" onClick={toggleModal}>
        Edit Profile
      </Button>
      <Modal isOpen={modal} toggle={toggleModal} fullscreen>
        <ModalHeader toggle={toggleModal}>Update Profile</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit}>
            {Object.keys(fields).map(
              (key) =>
                // Exclude unwanted fields (_id, __v) from the form
                key !== "_id" &&
                key !== "__v" && (
                  <input
                    key={key}
                    type="text"
                    name={key}
                    placeholder={key}
                    value={fields[key]}
                    onChange={handleInputChange}
                  />
                )
            )}
            <br></br>
            <Button type="button" color="secondary" onClick={handleSubmit}>
              Update Profile
            </Button>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      {response && <p>{response}</p>}
    </div>
  );
}

export default UpdateProfile;
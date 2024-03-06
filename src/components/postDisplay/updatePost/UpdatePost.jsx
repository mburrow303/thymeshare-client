import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  FormText,
  Label,
  Input,
} from "reactstrap";
import { getAllPosts } from "../../../lib/utils";

function UpdatePost({ token, post, setPosts, id }) {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  //const [post, setPost] = useState("");
  const [response, setResponse] = useState("");

  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedIngredients, setUpdatedIngredients] = useState("");
  const [updatedInstructions, setUpdatedInstructions] = useState("");
  const [updatedNotes, setUpdatedNotes] = useState("");
  const [updatedCoverPhoto, setUpdatedCoverPhoto] = useState("");
  //const [updatedUsername, setUpdatedUsername] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://127.0.0.1:4000/post/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          title: updatedTitle,
          description: updatedDescription,
          ingredients: updatedIngredients,
          instructions: updatedInstructions,
          notes: updatedNotes,
          coverPhoto: updatedCoverPhoto,
          //username: updatedUsername,
        }),
      });

      const data = await response.json();
      setResponse(data.post);
      // Reload posts after update
      setPosts((prevPosts) =>
        prevPosts.map((p) => (p._id === post._id ? data.post : p))
      );
    } catch (err) {
      console.error("Error:", err);
    }
  };

  /* const handleInputChange = (e) => {
    setPost(e.target.value);
  }; */

  return (
    <div
      className="update-post"
      style={{ width: "48%", display: "inline-block" }}
    >
      <Button color="secondary" className="edit-button btn-block" onClick={toggle}>
        Edit Post  
      </Button>
      <Modal isOpen={modal} toggle={toggle} fullscreen>
        <ModalHeader toggle={toggle}>Edit Recipe Post</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Input
                placeholder="Recipe Title"
                onChange={(e) => setUpdatedTitle(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Input
                placeholder="Description"
                onChange={(e) => setUpdatedDescription(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Input
                placeholder="Ingredients"
                onChange={(e) => setUpdatedIngredients(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Input
                placeholder="Instructions"
                onChange={(e) => setUpdatedInstructions(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Input
                placeholder="Notes"
                onChange={(e) => setUpdatedNotes(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="cover">Recipe Cover Photo</Label>
              <Input
                id="cover"
                type="file"
                placeholder="Cover Photo"
                onChange={(e) => setUpdatedCoverPhoto(e.target.value)}
              />
              <FormText>Upload a Recipe Cover Photo</FormText>
            </FormGroup>
            {/* <FormGroup>
              <Input
                placeholder="Username"
                onChange={(e) => setUpdatedUsername(e.target.value)}
              />
            </FormGroup> */}
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary"  onClick={UpdatePost}>
            Update Recipe Post
          </Button>{" "}
          <Button color="secondary"  onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default UpdatePost;

{
  /* <div className="update-post" style={{ width: "48%", display: "inline-block" }}>
  <form onSubmit={handleSubmit}>
  <input type="text" value={post} onChange={handleInputChange} />
  
  </form>
{response && <p>{response}</p>} */
}
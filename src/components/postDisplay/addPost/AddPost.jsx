import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
} from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getAllPosts } from "../../../lib/utils";

function AddPost({ token, setPosts }) {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [notes, setNotes] = useState("");
  const [coverPhoto, setCoverPhoto] = useState("");
  //const [username, setUsername] = useState("");

  let { userId } = useParams();

  async function addNewPost(e) {
    e.preventDefault();
    //console.log("userId in AddPost:", userId);
    console.log("testing this add a post function!");

    const addPostRoute = `http://127.0.0.1:4000/post`;

    //* Add a New Post
    let response = await fetch(addPostRoute, {
      headers: new Headers({
        "content-type": "application/json",
        Authorization: token,
      }),
      method: "POST",
      body: JSON.stringify({
        title: title,
        description: description,
        ingredients: ingredients,
        instructions: instructions,
        notes: notes,
        coverPhoto: coverPhoto,
        //username: username,
      }),
    });

    if (response.ok) {
      
      toggle();

      // Get posts from database
      const posts = await getAllPosts(token);

      // Update post in parent state
      setPosts(posts);
      // Navigate to the user's profile page after post is created
      navigate(`/profile/${userId}`);
    }
  }

  return (
    <div style={{ width: "48%", display: "inline-block" }}>
      <Button color="secondary" id="add" className="add-button" onClick={toggle}>
        Add New Recipe Post
      </Button>
      <Modal isOpen={modal} toggle={toggle} fullscreen>
        <ModalHeader toggle={toggle}>Add New Recipe Post</ModalHeader>
        <ModalBody>
          <Form onSubmit={addNewPost}>
            <FormGroup>
              <Input
                placeholder="Recipe Title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Input
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Input
                placeholder="Ingredients"
                onChange={(e) => setIngredients(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Input
                placeholder="Instructions"
                onChange={(e) => setInstructions(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Input
                placeholder="Notes"
                onChange={(e) => setNotes(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="cover">Recipe Cover Photo</Label>
              <Input
                id="cover"
                type="file"
                placeholder="Cover Photo"
                onChange={(e) => setCoverPhoto(e.target.value)}
              />
              <FormText>Upload a Recipe Cover Photo</FormText>
            </FormGroup>
            {/* <FormGroup>
              <Input
                placeholder="Cover Photo"
                onChange={(e) => setCoverPhoto(e.target.value)}
              />
            </FormGroup> */}
            <Button color="secondary">
              Create New Recipe Post
            </Button>
            <br></br>
            <br></br>
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </Form>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>
    </div>
  );
}
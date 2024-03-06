import React from "react";
import { Link } from "react-router-dom";
import "../Styles/Home.css";
import { Form } from "reactstrap";
import { Card, Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";
// import { Card, CardBody, CardTitle, CardSubtitle, CardText, CardLink} from "react-router-dom";

const Home = () => {
  return (
    Form,
    Card,
    Button,

    (
      <>
      {/* Form is made to hold background image in CSS file */}
        <Form className="container"></Form>


        <Card className="button" style={{ backgroundColor: '#d2b48c'}}>
          
          <p>Home Chefs Click Below</p>
       <a>

            <Button style={{ backgroundColor: '#808080'}}>
              
              <Link to="/auth">Login / Sign Up</Link>
            </Button>

         </a> 
        </Card>

        {/* <Card className="bottom button" style={{ backgroundColor: '#d2b48c'}}>
          <p>Don't Have an account?</p>

          
            <Button style={{ backgroundColor: '#808080'}}>
            
              <Link to="/auth"> Login / Sign Up </Link>
            </Button>
          
        </Card> */}
      </>
    )
  );
};

export { Home };
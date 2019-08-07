import React from "react";
import axios from "axios";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";

const UserForm = props => {

//inputs needed: name, email, password, terms of service (checkbox), submit button 
  return (
    <div className="user-form">
      <h1>New User Form</h1>

      <Form>
        <Field placeholder="Name" type="text" name="name" />

        <button type="submit"> Submit!</button>

      </Form>
    </div>
  );
}

  const FormikUserForm = withFormik({
    mapPropsToValues(values) {
      return {
        name: values.name || " "
    };
    },
  
    handleSubmit(values) {
        console.log("form submitted", values);
        axios
          .post("https://reqres.in/api/users", values)
          // with post, pass in data you're trying to post to database
          .then(response => console.log(response))
          .catch(error => console.log(error.response));
      }
    })(UserForm); // currying functions in Javascript

    export default FormikUserForm;
    




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
        <h3>Name</h3>
        <Field type="text" name="name" placeholder= "Name" />

        {props.touched.name && props.errors.name && (
        <p className="error">{props.errors.name}</p>)}

        <h3>Email</h3>
        <Field type="text" name="email" placeholder="Email" />

        {props.touched.email && props.errors.email && (
        <p className="error">{props.errors.email}</p>)}

        <h3>Password</h3>
        <Field type="text" name="password" placeholder="Password" />

        {props.touched.password && props.errors.password && (
        <p className="error">{props.errors.password}</p>)}

        <button type="submit"> Submit!</button>
      </Form>
    </div>
  );
};

// Higher Order Component - HOC
// Returns a new component (copy of UserForm but with extended logic) 


const FormikUserForm = withFormik({
  mapPropsToValues(values) {
    return {
      name: values.name || " ",
      email: values.email || " ",
      password: values.password || " "
    }
  },

   // form validation with Yup
   validationSchema: Yup.object().shape({
    // take every value you want to validate, and give each value rules
    name: Yup.string().required(),
    email: Yup.string().required(),
    password: Yup.string().required(),
    // these give you the error props you need to apply under the each <Field> component in userForm 
  }),


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

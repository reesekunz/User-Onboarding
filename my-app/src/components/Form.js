import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";

const UserForm = props => {
  // get status from props (need for step 4- displaying user data)
  const [users, setUsers] = useState([]);
  //   console.log(users);

  useEffect(() => {
    if (props.status) {
      setUsers([...users, props.status]);
    }
  }, [props.status]);

  //inputs needed: name, email, password, terms of service (checkbox), submit button
  return (
    <div className="user-form">
      <h1>New User Form</h1>
      <Form>

        {/* // Name Input  */}
        <div className="input">
        <h3 className="header">Name: </h3>
        <Field type="text" name="name" placeholder="Name" />*
        {props.touched.name && props.errors.name && <p>{props.errors.name}</p>}
        </div>

        {/* // Email Input  */}
        <div className="input">
        <h3 className="header">Email: </h3>
        <Field type="text" name="email" placeholder="Email" />*
        {props.touched.email && props.errors.email && (
          <p>{props.errors.email}</p>
        )}
        </div>

        {/* // Address Input  */}
        <div className="input">
        <h3 className="header">Address: </h3>
        <Field type="text" name="address" placeholder="Address" />
        </div>

        {/* // Password Input  */}
        <div className="input">
        <h3 className="header">Password: </h3>
        <Field type="password" name="password" placeholder="Password" />*
        {props.touched.password && props.errors.password && (
          <p>{props.errors.password}</p>
        )}
        </div>

         {/* // Role Dropdown  */}
         <div className="input">
         <Field component="select" className="role-dropdown" name="role">
          <option>Please Select a Role</option>
          <option value="admin">Administrator</option>
          <option value="contributor">Contributor</option>
          <option value="viewer">Viewer</option>
        </Field>
        </div>

        {/* // Terms of Service Checkbox  */}
        <div className="input">
        <label className="termsofservice">
          I Agree to the Terms of Service
          <Field
            type="checkbox"
            name="serviceterms"
            checked={props.values.serviceterms}
          />
          {props.touched.serviceterms && props.errors.serviceterms && (
            <p>{props.errors.serviceterms}</p>
          )}
          <span className="checkmark" />
        </label>
        </div>

        {/* // Submit Button  */}
        <button className="button" type="submit"> Submit!</button>
      </Form>

      {/* Mapping each user and displaying their submitted info  */}
      {users.map(user => (
        <div className="displayuser" key={user.id}>
          <div className="info"> Name: {user.name} </div>
          <div className="info">Email: {user.email}</div>
          <div className="info">Address: {user.address}</div>
          <div className="info">Role: {user.role}</div>
        </div>
      ))}
    </div>
  );
};

// Higher Order Component - HOC
// Returns a new component (copy of UserForm but with extended logic)

const FormikUserForm = withFormik({
  mapPropsToValues(values) {
    return {
      name: values.name || "",
      email: values.email || "",
      address: values.address|| "",
      password: values.password || "",

      serviceterms: values.serviceterms || false
    };
  },

  // form validation with Yup
  validationSchema: Yup.object().shape({
    // take every value you want to validate, and give each value rules
    name: Yup.string().required(),
    email: Yup.string()
      .email("Email not valid")
      .required(),
    password: Yup.string()
      .min(6)
      .required(),
    serviceterms: Yup.bool().oneOf([true], "Field must be checked")
    // these give you the error props you need to apply under the each <Field> component in userForm to render
  }),

  // get setStatus

  handleSubmit(values, { setStatus, resetForm }) {
    axios
      .post("https://reqres.in/api/users/", values)
      .then(response => {
        console.log(response);
        // call setStatus and pass in object you want to add to state
        setStatus(response.data);
      })
      .catch(error => console.log(error.response));
      resetForm();
  }
})(UserForm); // currying functions in Javascript

export default FormikUserForm;

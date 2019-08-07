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
        {/* // Name Input  */}
        <h3>Name</h3>
        <Field type="text" name="name" placeholder="Name" />
        {props.touched.name && props.errors.name && <p>{props.errors.name}</p>}

        {/* // Email Input  */}
        <h3>Email</h3>
        <Field type="text" name="email" placeholder="Email" />
        {props.touched.email && props.errors.email && (
          <p>{props.errors.email}</p>
        )}

        {/* // Password Input  */}
        <h3>Password</h3>
        <Field type="password" name="password" placeholder="Password" />
        {props.touched.password && props.errors.password && (
          <p>{props.errors.password}</p>
        )}

        {/* // Terms of Service Checkbox  */}
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

        {/* // Role Dropdown  */}
        <Field component="select" className="role-dropdown" name="role">
          <option>Please Select a Role</option>
          <option value="admin">Administrator</option>
          <option value="contributor">Contributor</option>
          <option value="viewer">Viewer</option>
        </Field>

        {/* // Submit Button  */}
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
      name: values.name || "",
      email: values.email || "",
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
    serviceterms: Yup.bool().oneOf([true],"Field must be checked")
    // these give you the error props you need to apply under the each <Field> component in userForm to render
  }),

  handleSubmit(values, { setStatus }) {
    axios
      .post("https://reqres.in/api/users/", values)
      .then(response => {
        console.log(response);
        setStatus(response.data);
      })
      .catch(error => console.log(error.response));
  }
})(UserForm); // currying functions in Javascript

export default FormikUserForm;

import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { registerUser } from '../utils/auth';

function RegisterForm({ user, updateUser }) {
  // set the state of the form input with blank or pre-set values
  const [formData, setFormData] = useState({
    uid: user.uid,
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    profileImageUrl: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(formData).then(() => updateUser(user.uid));
  };

  return (
    <Form onSubmit={handleSubmit}>

      <Form.Group className="mb-3" controlId="formBasicEmail">

        <Form.Label>First Name</Form.Label>
        <Form.Control type="text" placeholder="First Name" name="firstName" value={formData.firstName} onChange={handleChange} required />

        <Form.Label>Last Name</Form.Label>
        <Form.Control type="text" placeholder="Last name" name="lastName" value={formData.lastName} onChange={handleChange} required />

        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} required />

        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Username" name="username" value={formData.username} onChange={handleChange} required />

        <Form.Label>Profile Image URL</Form.Label>
        <Form.Control type="url" placeholder="Profile Image URL" name="profileImageUrl" value={formData.profileImageUrl} onChange={handleChange} required />

      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

RegisterForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    profileImageUrl: PropTypes.string.isRequired,
  }).isRequired,
  updateUser: PropTypes.func.isRequired,
};

export default RegisterForm;

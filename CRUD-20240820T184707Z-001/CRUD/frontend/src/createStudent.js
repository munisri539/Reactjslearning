import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateStudent() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [branch, setBranch] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validate = () => {
        const errors = {};

        // Name Validation
        if (!name.trim()) {
            errors.name = "Name is required";
        } else if (!/^[A-Za-z\s]+$/.test(name)) {
            errors.name = "Name can only contain letters and spaces";
        } else if (name.length < 3) {
            errors.name = "Name must be at least 3 characters long";
        }

        // Email Validation
        if (!email.trim()) {
            errors.email = "Email is required";
        } else if (!/^[A-Za-z][A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
            errors.email = "Please give correct email";
        }

        // Branch Validation
        if (!branch) {
            errors.branch = "Branch is required";
        }

        // Gender Validation
        if (!gender) {
            errors.gender = "Gender is required";
        }

        // Address Validation
        if (!address.trim()) {
            errors.address = "Address is required";
        } else if (address.length < 5) {
            errors.address = "Address must be at least 5 characters long";
        } else if (address.length > 100) {
            errors.address = "Address cannot exceed 100 characters";
        }


        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            axios.post('http://localhost:8081/create', { name, email, branch, gender, address })
                .then(() => navigate('/'))
                .catch(err => console.log(err));
        }
    };

    const handleNavigateToList = () => {
        navigate('/');
    };

    return (
        <div className='d-flex justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <button type='button' className='btn btn-secondary ms-2' onClick={handleNavigateToList}>Student List</button>
                <h1 className='text-center'>Create Student</h1>
                <form onSubmit={handleSubmit} noValidate>
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name"
                        />
                        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                    </div>

                    <div className="mb-3 col-md-6">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                    <div className="mb-3 col-md-6">
                        <label className="form-label">Branch</label>
                        <select
                            className={`form-control ${errors.branch ? 'is-invalid' : ''}`}
                            value={branch}
                            onChange={(e) => setBranch(e.target.value)}
                        >
                            <option value="">Select Branch</option>
                            <option value="CSE">CSE</option>
                            <option value="ECE">ECE</option>
                            <option value="EEE">EEE</option>
                            <option value="MECH">MECH</option>
                            <option value="CIVIL">CIVIL</option>
                        </select>
                        {errors.branch && <div className="invalid-feedback">{errors.branch}</div>}
                    </div>
                    <div className="mb-3 col-md-6">
                        <label className="form-label">Gender</label>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="gender"
                                value="Male"
                                checked={gender === "Male"}
                                onChange={(e) => setGender(e.target.value)}
                            />
                            <label className="form-check-label">Male</label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="gender"
                                value="Female"
                                checked={gender === "Female"}
                                onChange={(e) => setGender(e.target.value)}
                            />
                            <label className="form-check-label">Female</label>
                        </div>
                        {errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
                    </div>
                    <div className="mb-3 col-md-6">
                        <label className="form-label">Address</label>
                        <textarea
                            className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Address"
                        ></textarea>
                        {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                    </div>

                    <button type="submit" className="btn btn-success">Create</button>
                </form>
            </div>
        </div>
    );
}

export default CreateStudent;

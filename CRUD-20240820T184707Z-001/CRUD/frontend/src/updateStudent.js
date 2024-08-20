import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateStudent() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [branch, setBranch] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [errors, setErrors] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8081/student/${id}`)
            .then(res => {
                if (res.data) {
                    setName(res.data.Name);
                    setEmail(res.data.Email);
                    setBranch(res.data.Branch);
                    setGender(res.data.Gender);
                    setAddress(res.data.Address);
                } else {
                    console.log("No student found with this ID");
                }
            })
            .catch(err => console.log("Error fetching data: ", err));
    }, [id]);

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
            errors.email = "Email is invalid";
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

    const handleSubmit = (ma) => {
        ma.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            axios.put(`http://localhost:8081/update/${id}`, { name, email, branch, gender, address })
                .then(() => navigate('/'))
                .catch(err => console.log(err));
        }
    };

    const handleCancel = () => {
        navigate('/');
    };

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <h1 className='text-center'>Update Student</h1>
                <form onSubmit={handleSubmit} noValidate>

                    <div className="mb-3">
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

                    <div className="mb-3">
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

                    <div className="mb-3">
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

                    {/* Gender */}
                    <div className="mb-3">
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

                    {/* Address */}
                    <div className="mb-3">
                        <label className="form-label">Address</label>
                        <textarea
                            className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Address"
                        ></textarea>
                        {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                    </div>

                    <button type="submit" className="btn btn-primary">Update</button>
                    <button type="button" onClick={handleCancel} className="btn btn-secondary ms-2">Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateStudent;

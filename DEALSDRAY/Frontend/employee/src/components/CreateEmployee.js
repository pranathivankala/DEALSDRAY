// CreateEmployee.js
import React, { useState } from 'react';
import axios from 'axios';
import './CreateEmployee.css';

const CreateEmployee = () => {
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        mobile: '',
        designation: '',
        gender: '',
        courses: {
            MCA: false,
            BCA: false,
            BSC: false,
        },
        image: null,
    });
    const [errors, setErrors] = useState({});
    const [submitStatus, setSubmitStatus] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            setEmployee((prevState) => ({
                ...prevState,
                courses: { ...prevState.courses, [name]: checked },
            }));
        } else if (type === 'file') {
            setEmployee((prevState) => ({
                ...prevState,
                image: e.target.files[0],
            }));
        } else {
            setEmployee({ ...employee, [name]: value });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const mobileRegex = /^[0-9]{10}$/;

        // Validate each field
        if (!employee.name) newErrors.name = 'Name is required.';
        if (!employee.email) {
            newErrors.email = 'Email is required.';
        } else if (!emailRegex.test(employee.email)) {
            newErrors.email = 'Invalid email format.';
        }
        if (!employee.mobile) {
            newErrors.mobile = 'Mobile No is required.';
        } else if (!mobileRegex.test(employee.mobile)) {
            newErrors.mobile = 'Mobile No must be 10 digits.';
        }
        if (!employee.designation) newErrors.designation = 'Designation is required.';
        if (!employee.gender) newErrors.gender = 'Gender is required.';
        if (!Object.values(employee.courses).includes(true)) {
            newErrors.courses = 'At least one course must be selected.';
        }
        if (!employee.image) newErrors.image = 'Image upload is required.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const formData = new FormData();
        formData.append('name', employee.name);
        formData.append('email', employee.email);
        formData.append('mobile', employee.mobile);
        formData.append('designation', employee.designation);
        formData.append('gender', employee.gender);
        
        // Send courses as individual entries if the backend expects it
        Object.keys(employee.courses).forEach(course => {
            if (employee.courses[course]) {
                formData.append('courses[]', course);
            }
        });

        formData.append('image', employee.image);

        try {
            await axios.post('http://localhost:5000/api/employees', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setSubmitStatus('Employee created successfully!');
            setEmployee({
                name: '',
                email: '',
                mobile: '',
                designation: '',
                gender: '',
                courses: {
                    MCA: false,
                    BCA: false,
                    BSC: false,
                },
                image: null,
            });
            setErrors({});
        } catch (error) {
            if (error.response) {
                console.error('Error creating employee:', error.response.data);
                setSubmitStatus(`Error: ${JSON.stringify(error.response.data)}`); // Show detailed error message
            } else {
                console.error('Error creating employee:', error.message);
                setSubmitStatus('Error creating employee. Please try again.');
            }
        }
    };

    return (
        <div className="create-employee-container">
            <form className="create-employee-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input id="name" name="name" value={employee.name} onChange={handleChange} required />
                {errors.name && <div className="error">{errors.name}</div>}

                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" value={employee.email} onChange={handleChange} required />
                {errors.email && <div className="error">{errors.email}</div>}

                <label htmlFor="mobile">Mobile No</label>
                <input id="mobile" name="mobile" type="tel" value={employee.mobile} onChange={handleChange} required />
                {errors.mobile && <div className="error">{errors.mobile}</div>}

                <label htmlFor="designation">Designation</label>
                <select id="designation" name="designation" value={employee.designation} onChange={handleChange} required>
                    <option value="">Select Designation</option>
                    <option value="Manager">Manager</option>
                    <option value="HR">HR</option>
                    <option value="Sales">Sales</option>
                </select>
                {errors.designation && <div className="error">{errors.designation}</div>}

                <label>Gender</label>
                <label>
                    <input type="radio" name="gender" value="Male" checked={employee.gender === 'Male'} onChange={handleChange} required />
                    Male
                </label>
                <label>
                    <input type="radio" name="gender" value="Female" checked={employee.gender === 'Female'} onChange={handleChange} required />
                    Female
                </label>
                {errors.gender && <div className="error">{errors.gender}</div>}

                <label>Courses</label>
                <label>
                    <input type="checkbox" name="MCA" checked={employee.courses.MCA} onChange={handleChange} />
                    MCA
                </label>
                <label>
                    <input type="checkbox" name="BCA" checked={employee.courses.BCA} onChange={handleChange} />
                    BCA
                </label>
                <label>
                    <input type="checkbox" name="BSC" checked={employee.courses.BSC} onChange={handleChange} />
                    BSC
                </label>
                {errors.courses && <div className="error">{errors.courses}</div>}

                <label htmlFor="image">Upload Image</label>
                <input id="image" name="image" type="file" accept="image/*" onChange={handleChange} required />
                {errors.image && <div className="error">{errors.image}</div>}

                <button type="submit">SUBMIT</button>
                {submitStatus && <div className="submit-status">{submitStatus}</div>}
            </form>
        </div>
    );
};

export default CreateEmployee;

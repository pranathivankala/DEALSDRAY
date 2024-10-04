import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EditEmployee.css';

const EditEmployee = () => {
    const { name } = useParams(); // Get name from URL parameters
    const navigate = useNavigate(); // To navigate after edit
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        mobile: '',
        designation: '',
        gender: '',
        course: '',
    });

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/employees/${name}`);
                setEmployee(response.data);
            } catch (error) {
                console.error('Error fetching employee data:', error);
            }
        };
        fetchEmployee();
    }, [name]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/employees/${name}`, employee);
            navigate('/employee-list'); // Redirect to employee list after update
        } catch (error) {
            console.error('Error updating employee:', error);
        }
    };

    return (
        <div className="edit-employee-container">
            <h2>Edit Employee</h2>
            <form onSubmit={handleUpdate}>
                <input
                    type="text"
                    name="name"
                    value={employee.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={employee.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                />
                <input
                    type="text"
                    name="mobile"
                    value={employee.mobile}
                    onChange={handleChange}
                    placeholder="Mobile No"
                    required
                />
                <input
                    type="text"
                    name="designation"
                    value={employee.designation}
                    onChange={handleChange}
                    placeholder="Designation"
                    required
                />
                <input
                    type="text"
                    name="gender"
                    value={employee.gender}
                    onChange={handleChange}
                    placeholder="Gender"
                    required
                />
                <input
                    type="text"
                    name="course"
                    value={employee.course}
                    onChange={handleChange}
                    placeholder="Course"
                    required
                />
                <button type="submit">Update Employee</button>
            </form>
        </div>
    );
};

export default EditEmployee;

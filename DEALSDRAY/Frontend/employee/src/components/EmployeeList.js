import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './EmployeeList.css'; // Importing the CSS file

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const navigate = useNavigate(); // Initialize useNavigate

    const fetchEmployees = async () => {
        const response = await axios.get('http://localhost:5000/api/getemployees');
        setEmployees(response.data);
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleEdit = (employee) => {
        navigate(`/edit-employee/${employee.name}`); // Navigate to EditEmployee page with name as a parameter
    };

    const handleDelete = async (name) => {
        try {
            await axios.delete(`http://localhost:5000/api/employees/${name}`);
            fetchEmployees(); // Refresh employee list
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    const filteredEmployees = employees.filter((employee) =>
        employee.name && employee.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="employee-list-container">
            <h2>Employee List</h2>
            <div className="header">
                <div className="total-count">Total Count: {employees.length}</div>
                <div className="search-container">
                    <label>Enter Search Keyword:</label>
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <table className="employee-table">
                <thead>
                    <tr>
                        <th>Unique Id</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile No</th>
                        <th>Designation</th>
                        <th>Gender</th>
                        <th>Course</th>
                        <th>Create Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEmployees.map((employee, index) => (
                        <tr key={employee._id}>
                            <td>{index + 1}</td>
                            <td>
                                <img src={employee.image || 'default-image.png'} alt="Profile" className="profile-img" />
                            </td>
                            <td>{employee.name || 'N/A'}</td>
                            <td>
                                <a href={`mailto:${employee.email}`}>{employee.email}</a>
                            </td>
                            <td>{employee.mobile}</td>
                            <td>{employee.designation}</td>
                            <td>{employee.gender}</td>
                            <td>{employee.course}</td>
                            <td>{new Date(employee.createDate).toLocaleDateString()}</td>
                            <td>
                                <button className="edit-btn" onClick={() => handleEdit(employee)}>Edit</button> -
                                <button className="delete-btn" onClick={() => handleDelete(employee.name)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeList;

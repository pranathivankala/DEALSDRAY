
const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');


router.post('/employees', async (req, res) => {
  const { name, email, mobile, designation, gender, course, image } = req.body;

  if (!name || !email || !mobile || !designation || !gender || !course) {
    return res.status(400).json({ message: 'All fields are required except for image' });
  }

  try {
    const newEmployee = new Employee({
      name,
      email,
      mobile,
      designation,
      gender,
      course,
      image,
      createDate: new Date(),
    });

    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(500).json({ message: 'Failed to create employee' });
  }
});

// Get all employees
router.get('/getemployees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ message: 'Failed to retrieve employees' });
  }
});


router.get('/employees/:name', async (req, res) => {
  try {
    const employee = await Employee.findOne({ name: req.params.name });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (error) {
    console.error('Error fetching employee:', error);
    res.status(500).json({ message: 'Failed to fetch employee' });
  }
});


router.put('/employees/:name', async (req, res) => {
  const { name, email, mobile, designation, gender, course, image } = req.body;

  try {
    const employee = await Employee.findOneAndUpdate(
      { name: req.params.name },
      { name, email, mobile, designation, gender, course, image },
      { new: true, runValidators: true }
    );

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json(employee);
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ message: 'Failed to update employee' });
  }
});


router.delete('/employees/:name', async (req, res) => {
  try {
    const employee = await Employee.findOneAndDelete({ name: req.params.name });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ message: 'Failed to delete employee' });
  }
});

module.exports = router;

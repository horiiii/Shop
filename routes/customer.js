const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');
const config = require('../config/database');


// Customer
router.post('/customer', (req, res) => {
        let newCustomer = new Customer({
            firstName: req.body.firstName,
            middleName: req.body.middleName,
            lastName: req.body.lastName,
            email: req.body.email,
            age: req.body.age,
            id: req.body.id

        })
        Customer.addCustomer(newCustomer, (err, Customer) => {
            if (err) {
                res.json({ success: false, msg: 'Failed to register Customer' });
            } else {
                res.json({ success: true, msg: 'Customer Registered' });
            }
        })
    })
    // Get All Customer
router.get('/customer', exports.findAll = (req, res) => {
    Customer.find()
        .then(customers => {
            res.send(customers);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while retrieving customerss."
            });
        });

});
// Update a Customer based on ID
router.put('/updateCustomer', (req, res) => {
    Customer.updateCustomerById(req.body, (err, customer) => {
        if (err) throw err;
        if (!customer) {
            return res.json({ success: false, msg: 'Customer not found' });
        }
        if (customer) {
            return res.json({ success: true, msg: 'Customer Found' })
        }
    })
})
// Delete a Customer based on ID
router.put('/deleteCustomer', (req, res) => {
    Customer.DeleteCustomer(req.body, (err, customer) => {
        if (err) throw err;
        if (!customer) {
            return res.json({ success: false, msg: 'Customer not found' });
        } else {
            return res.json({ success: true, msg: 'Customer found' });
        }
    })
})



module.exports = router;
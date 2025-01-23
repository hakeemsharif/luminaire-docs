import express from "express"
import { User } from "../models/userModel.js"
const router = express.Router();
import jwt from "jsonwebtoken"

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.JWT_SECRET, { expiresIn: '1d'})
}

// Login User
router.post('/login', async (request, response) => {

    try {
        const {email, password} = request.body;
        const user = await User.login(email, password);

        // Create Token
        const token = createToken(user._id)

        response.status(200).json({email, token})
       
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})


// Save
router.post('/', async (request, response) => {

    try {
        const { firstName, lastName, userName, email, password, role, file} = request.body;
        const user = await User.signup(firstName, lastName, userName, email, password, role, file);
     
        // Create Token
        const token = createToken(user._id)

        response.status(200).json({email, token})

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }

    // OG Save
    // try {
    //     const newUser = {
    //         firstName: request.body.firstName,
    //         lastName: request.body.lastName,
    //         userName: request.body.userName,
    //         email: request.body.email,
    //         password: request.body.password,
    //         confirmPassword: request.body.confirmPassword,
    //         role: request.body.role,
    //         file: request.body.file,
    //     };

    //     const user = await User.create(newUser);
    //     return response.status(201).send(user);

    // } catch (error) {
    //     console.log(error.message);
    //     response.status(500).send({ message: error.message });
    // }
});

// Get All
router.get('/', async (request, response) => {
    try {
        const users = await User.find({});
        return response.status(200).json({
            count: users.length,
            data: users
        })
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Get Specific
router.get('/:id', async (request, response) => {
    try {

        const { id } = request.params;
        const users = await User.findById(id);
        return response.status(200).json(users)

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Update 
router.put('/:id', async (request, response) => {
    try {
     
        const { id } = request.params;

        const result = await User.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({ message: 'User Not Found' });
        }

        return response.status(200).send({ message: 'User Updated' });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Delete
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const result = await User.findByIdAndDelete(id) ;

        if (!result) {
            return response.status(404).json({ message: 'User Not Found' });
        }

        return response.status(200).send({ message: 'User Deleted' });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;
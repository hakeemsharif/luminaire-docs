import express from "express";
import { Document } from "../models/documentModel.js";

const router = express.Router();

// Save
router.post('/', async (request, response) => {
    try {
        const newDocument = {
            title: request.body.title,
            description: request.body.description,
            author: request.body.author,
            creationDate: request.body.creationDate,
            category: request.body.category,
            language: request.body.language,
            file: request.body.file,
        };

        const document = await Document.create(newDocument);
        return response.status(201).send(document);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Get All
router.get('/', async (request, response) => {
    try {
        const documents = await Document.find({});
        return response.status(200).json({
            count: documents.length,
            data: documents
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
        const documents = await Document.findById(id);
        return response.status(200).json(documents)

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Update 
router.put('/:id', async (request, response) => {
    try {
        // if (!request.body.title ||
        //     !request.body.author ||
        //     !request.body.creationDate ||
        //     !request.body.category ||
        //     !request.body.language ||
        //     !request.body.file 
        // ) {
        //     return response.status(400), send({
        //         message: 'Enter required fields'
        //     });
        // }
        
        const { id } = request.params;

        const result = await Document.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({ message: 'Document Not Found' });
        }

        return response.status(200).send({ message: 'Document Updated' });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Delete
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const result = await Document.findByIdAndDelete(id) ;

        if (!result) {
            return response.status(404).json({ message: 'Document Not Found' });
        }

        return response.status(200).send({ message: 'Document Deleted' });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;
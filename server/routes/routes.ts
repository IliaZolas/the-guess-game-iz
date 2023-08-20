import express, { Request, Response } from 'express';
import { Router } from 'express';
import newUserTemplateCopy from '../models/users';
import newMealPlanTemplateCopy from '../models/mealplans';
import MealPlans from '../models/mealplans';
import Users from '../models/users';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import auth from './auth';
import cloudinary from 'cloudinary';
import {gameLogic} from '../game-logic/game'

const routes: Router = express.Router();

// Index Routes
routes.get('/', (req: Request, res: Response) => {
res.send('Hello world');
});

// User Routes
routes.post('/signup', (req: Request, res: Response) => {
bcrypt
.hash(req.body.password, 10)
.then((hashedPassword) => {
    const user = new newUserTemplateCopy({
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    password: hashedPassword,
    imageUrl: req.body.imageUrl,
    public_id: req.body.publicId,
    });

    user
    .save()
    .then((result) => {
        res.status(201).send({
        message: 'User Created Successfully',
        result,
        });
    })
    .catch((error) => {
        console.log(error),
        res.status(500).send({
        message: 'Error creating user',
        error,
        });
    });
})
.catch((e) => {
    res.status(500).send({
    message: 'Password was not hashed successfully',
    e,
    });
});
});

routes.post('/login', (req: Request, res: Response) => {
    console.log('login route triggered');

    Users.findOne({ email: req.body.email })
        .then((user) => {
        console.log('user object:', user);
        if (!user) {
            res.status(404).send({
            message: 'Email not found',
            });
            return;
        }

        bcrypt
            .compare(req.body.password, user.password)
            .then((passwordCheck) => {
            console.log('password check object:', passwordCheck);
            if (!passwordCheck) {
                console.log('No password provided');
            }
            const token = jwt.sign(
                {
                userId: user._id,
                userEmail: user.email,
                },
                'RANDOM-TOKEN',
                { expiresIn: '24h' }
            );
            res.status(200).send({
                message: 'Login Successful',
                email: user.email,
                userId: user._id,
                token,
            });
            })
            .catch((error) => {
            res.status(400).send({
                message: 'Passwords do not match',
                error,
            });
            });
        })
        .catch((e) => {
        res.status(500).send({
            message: 'An error occurred',
            error: e,
        });
        });
    });  

routes.get('/user/show/:id', (req: Request, res: Response) => {
    const userId = req.params.id;
    console.log('GET SINGLE USER RECORD:', userId);

    Users.findOne({ _id: userId }).then((data) => res.json(data));
    });

// Game routes

routes.get('/start-the-game', async (req: Request, res: Response) => {
    try {
        await gameLogic(req, res);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(500).json({ error: errorMessage });
    }
});

export default routes;

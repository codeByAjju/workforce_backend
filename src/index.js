/* eslint-disable no-unused-vars */
import express from 'express';
import Bootstrap from './bootstrap.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const bootstrap = new Bootstrap(app);

/**
 * Mongodb database connectivity
 */

import mongoose from 'mongoose';
import { DB_URI } from './constants.js';

const connectToMongo = async (cb) => {
  try {
    await mongoose.connect(DB_URI);
    console.log('Database connected successfully!!!');
    cb();
  } catch (error) {
    console.error('Error (DB Connectivity): ', error);
  }
}
;

export default connectToMongo
;

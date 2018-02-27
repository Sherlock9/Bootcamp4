// @flow

// import {SECRET} from '../globals/config';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
//
// function generatedHashedPassword(password: string): string {
//   let SALT = bcrypt.genSaltSync(10);
//   return bcrypt.hashSync(password, SALT);
// }
//
// function isPasswordSame(password: string, hashed: string): boolean {
//   return bcrypt.compareSync(password, hashed);
// }
//
// function generateFreshToken(encodedString: Object): string {
//   return jwt.sign(encodedString, SECRET, {expiresIn: 60 * 60});
// }
//
// export {generatedHashedPassword, isPasswordSame, generateFreshToken};

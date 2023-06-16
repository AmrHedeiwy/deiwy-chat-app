/**
 * @module userSchema
 * This module defines the valitdations that execute when a
 * user enters their register credentials
 *
 * @typedef {Object} user schema
 * @property {string} Firstname - The first name of the user. Must be
 * between 2 and 30 letters only.
 * @property {string} Lastname - The last name of the user. Must be
 * between 2 and 30 letters only.
 * @property {string} Username - The username of the user. Must be
 * between 3 and 20 letters, digits, underscores, or hyphens.
 * @property {string} Email - The email address of the user. Must be
 * unique and in valid email format.
 * @property {string} Password - The password of the user. Must be
 * at least 8 characters long and contain at least one uppercase letter,
 * one lowercase letter, one digit, and one special character from
 * the set @$!%?&.
 */

import { object, string } from 'yup';

const userSchema = object({
  Firstname: string()
    .matches(/^[A-Za-z]{2,30}$/)
    .required(),
  Lastname: string()
    .matches(/^[A-Za-z]{2,30}$/)
    .required(),
  Username: string()
    .matches(/^[A-Za-z\d_-]{3,20}$/)
    .required(),
  Email: string().email().required('error'),
  Password: string().matches(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  )
});

export default userSchema;

require('dotenv/config');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { verifyu } = require('jsonwebtoken');
const { hash, compare } = require('bcryptjs');


// 1. Register a user
// 2. Login a user
// 3. Logout a user
// 4. Setup a proptected route
// 5. Get a new accesstoken with a refresh token

require('dotenv/config');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { verifyu } = require('jsonwebtoken');
const { hash, compare } = require('bcryptjs';)
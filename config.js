require('dotenv').config();

let TOKEN;
if (process.env.DEV === '1') TOKEN = process.env.TOKEN_DEV;
else TOKEN = process.env.TOKEN;

const MONGO_URL = process.env.MONGO_URL;
const PREFIX = process.env.PREFIX;
const ACTIVITIY = process.env.ACTIVITIY;
const ACTIVITIY_TYPE = process.env.ACTIVITIY_TYPE;
const GUILD_ID = process.env.GUILD_ID;
const PORT = process.env.PORT;

module.exports = {
	TOKEN,
	MONGO_URL,
	PREFIX,
	ACTIVITIY,
	ACTIVITIY_TYPE,
	GUILD_ID,
	PORT,
};

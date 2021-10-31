require('dotenv').config();

const TOKEN = process.env.TOKEN;
const MONGO_URL = process.env.MONGO_URL;
const PREFIX = process.env.PREFIX;
const ACTIVITIY = process.env.ACTIVITIY;
const ACTIVITIY_TYPE = process.env.ACTIVITIY_TYPE;
const GUILD_ID = process.env.GUILD_ID;

module.exports = {
	TOKEN,
	MONGO_URL,
	PREFIX,
	ACTIVITIY,
	ACTIVITIY_TYPE,
	GUILD_ID,
};

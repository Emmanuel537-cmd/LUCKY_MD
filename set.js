const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'LUCKY-XFORCE••<=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkVBQ0lJK1kreTBIWEt6bWFXb1VjME1mZk1RQkFubUE2UVRrQWVRa3psZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUG0xazZWTXk3VHJaRkdpYlYzaW0xQzJ4WGNNdzdDbzdFQjRvRlpIR0RCYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHRS91KzR3RzNPbVp3ay9mbndpcVh1WjVnMEwrVWExUTg4TGtsSFgxSzJvPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHVG5sSHpLVjVNTHFrVll4VGNMcDJCYWo4ci9hN2l3alBNK2FqRU15VERJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik9CZ3RSR3cwZEhOQmtoekY1bmNEWUdDNkRvNExNNHd2RUJBN2ZSb3NqbG89In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFXdTFqdG1Ycm8rTmpiU1Z5bDRKMVZJK1VPT1crQ1c0bWVyeFhrS0J0alU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieUMyTnh4R1NLMmVVZG4raVU1Nm0wWis2MkFWYml2OXNKOXpzNVVrZ1gzOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV2ZmT3l3a0JRMkNoUUFIUGtZUHZ1ekRLSm52V0dmaFRiVWFrUXR3cTFtUT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImNwTE5DcGRiTEEzWENCZGFXR0JRNWVGQUFtVHR2RGdqV2xiT2pvUnkwcXJXVXJOSEJCWlBTN0tNQmU5WFB6ZFFTSG1hSXB6VWhoMzZFUU1Rem9yWWp3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTQ0LCJhZHZTZWNyZXRLZXkiOiJTYTJaUXFuQlN5R24zdzZjVVVQNGNyMEJUK2RqekpkeXZpUlh5WFlrSmxjPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI2Mzc4NDg2ODE2NUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI2MTQwMDM5NkNDRTRGMjVDRTk2NUY3RUM4MUUwN0MwOSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzUyMDg3NjAxfSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNjM3ODQ4NjgxNjVAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiRjE1OUREMkRBQjYyRkZEQzYxNTVFRjM5RTlBNTE0OEIifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1MjA4NzYzMH1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiVVJvUU1ET1RSa0s4TnpZYkpubjVIZyIsInBob25lSWQiOiJkM2ZkZTM2Zi0wMTQxLTRiZmItYjM4MS05MTI5NjJhZGQ1OWUiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMUFTd1JUZ2wxK3AzdnRpQWs0ZFJYSVY1aCs0PSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlIzbXlWUTdDWFN3UG5RaHpNbUwxSGgwdEhEWT0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJGUkVERVpSQSIsIm1lIjp7ImlkIjoiMjYzNzg0ODY4MTY1OjY1QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IuKfo+KfouG0hOG0h+G0hy3htIrhtIDKj+Kfo+KfoiIsImxpZCI6IjMzNTU3MDE1NzM2MzM1OjY1QGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSktzMk9JREVJdjR1c01HR0FNZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiYmdnUDlJUS9icVZKVTJ3T2NqdzhuRXRGS3AvVVk5dXk5Mld0R01nbUZrWT0iLCJhY2NvdW50U2lnbmF0dXJlIjoia1NFN1JjanA1V2IzZ0VMZjFNV1F3NEx6Nkd3eTZFM1I0ZHFkTUNmc3ErVTFaQzlDU1U1T0JGNFZ6L25DV2tNN09Cem01NnFUMnZMc0kydWtxM2gyREE9PSIsImRldmljZVNpZ25hdHVyZSI6IlNlbkZNT3BrVU1aVTBZZVhsT0haRi9uYXhHZWFuc3JUSjgxT084aFg3N2tYNlVQcUlNdEIzSEcydGQxM1hLWEZYdFdhd1M3aXZNdVh1ZXk3bXIzZmp3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjYzNzg0ODY4MTY1OjY1QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlc0SUQvU0VQMjZsU1ZOc0RuSThQSnhMUlNxZjFHUGJzdmRsclJqSUpoWkcifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBZ0lCUT09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc1MjA4NzU4MywibGFzdFByb3BIYXNoIjoiMlAxWWhmIiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFKMEkifQ==',
    PREFIXE: process.env.PREFIX || ".",
    GITHUB : process.env.GITHUB|| 'https://github.com/Fred1e/LUCKY_MD',
    OWNER_NAME : process.env.OWNER_NAME || "Fredi",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "263784868165",  
              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT: process.env.AUTO_REACTION || "non",  
     AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
    URL: process.env.URL || "https://files.catbox.moe/7irwqn.jpeg",  
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || 'non',              
    CHAT_BOT: process.env.CHAT_BOT || "off",              
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "yes",
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'no', 
    GCF: process.env.GROUP_HANDLE || 'no', 
    AUTO_REPLY : process.env.AUTO_REPLY || "no", 
    AUTO_STATUS_TEXT: process.env.AUTO_STATUS_TEXT || 'viewed by alpha md',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',
    AUTO_BIO: process.env.AUTO_BIO || 'yes',       
    ANTI_CALL_TEXT : process.env.ANTI_CALL_TEXT || '',             
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029Vb6kkzv1NCrWU4lyyz1h",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029Vb6kkzv1NCrWU4lyyz1h",
    CAPTION : process.env.CAPTION || "✧⁠LUCKY_MD✧",
    BOT : process.env.BOT_NAME || '✧⁠LUCKY_MD✧⁠',
    MODE: process.env.PUBLIC_MODE || "yes",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Dodoma", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || '1',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTI_DELETE_MESSAGE : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTI_CALL: process.env.ANTI_CALL || 'yes', 
    AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',             
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, 
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});


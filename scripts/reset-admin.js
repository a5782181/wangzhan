// Reset admin credentials
const ADMIN_USER = 'admin';
const ADMIN_PASS = 'dsw315210**';

// Read and update site.json
const fs = require('fs');
const path = require('path');

const sitePath = path.join(__dirname, 'data', 'site.json');
const siteData = JSON.parse(fs.readFileSync(sitePath, 'utf8'));

// Add or update admin credentials in site.json
siteData.admin = {
  user: ADMIN_USER,
  pass: ADMIN_PASS,
  lastUpdated: new Date().toISOString()
};

// Write updated data back to site.json
fs.writeFileSync(sitePath, JSON.stringify(siteData, null, 2), 'utf8');

console.log('✅ Admin credentials reset successfully');
console.log(`📝 User: ${ADMIN_USER}`);
console.log(`🔑 Password: ${ADMIN_PASS}`);
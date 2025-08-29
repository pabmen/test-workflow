const fs = require('fs')
const path = require('path')

// Get the tag name from command line argument or environment variable
const tagName = process.argv[2] || process.env.GIT_TAG_NAME || ''

if (!tagName) {
  console.error('No Git tag found. Version not updated.')
  process.exit(1)
}

// Remove 'v' prefix if present to get clean version number
const cleanVersion = tagName.startsWith('v') ? tagName.substring(1) : tagName

// Read package.json file
const packageJsonPath = path.join(__dirname, '../package.json')
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))

// Update the version in package.json
packageJson.version = cleanVersion

// Write the updated version back to package.json
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))

console.log(`Updated version to ${cleanVersion} in package.json`)

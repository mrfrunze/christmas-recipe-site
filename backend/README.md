# Backend - Recipe API

This project contains scripts for working with the recipe API. You can send recipes to the server, retrieve data from the server, and check the API status.

## 📋 Table of Contents

- [Installation](#installation)
- [Commands for Sending Data to Server](#commands-for-sending-data-to-server)
- [Commands for Retrieving Data from Server](#commands-for-retrieving-data-from-server)
- [Commands for Checking API Status](#commands-for-checking-api-status)
- [File Description](#file-description)
- [Project Structure](#project-structure)
- [Usage Examples](#usage-examples)
- [Troubleshooting](#troubleshooting)

---

## 🚀 Installation

Before using, make sure you have Node.js (version 18 or higher) and npm installed.

### 1. Install Dependencies

```bash
npm install
```

This command will install all necessary packages:
- `axios` - for HTTP requests
- `tsx` - for running TypeScript files
- `typescript` - TypeScript compiler
- `@types/node` - Node.js type definitions

---

## 📤 Commands for Sending Data to Server

### Send all recipes from `recipes.json` file to the server

```bash
npm run send
```

or

```bash
npm run send-recipes
```

**What this command does:**
- Reads the `../data/recipes.json` file
- Transforms data into the format required by the API
- Sends each recipe to the server via POST request
- Shows sending progress for each recipe
- Outputs final statistics (how many recipes were sent successfully, how many errors)

**Example output:**
```
📂 Reading recipes.json file...
✅ Found recipes: 16
🌐 API URL: https://grupp1-xjvta.reky.se/recipes

============================================================

[1/16] 📤 Sending: Äppelkaka
   ✅ Successfully created! (ID: 690f031f8a8cd707764039ba)

[2/16] 📤 Sending: Morotsbollar
   ✅ Successfully created! (ID: 690f03208a8cd707764039c7)

...

============================================================

📊 FINAL STATISTICS:
   ✅ Successfully sent: 16
   ❌ Errors: 0
   📦 Total recipes: 16

🎉 All recipes successfully sent to server!
```

**Important notes:**
- The script automatically transforms data format (removes `id`, `difficulty`, and `timeInMins` fields)
- There is a 500 ms delay between requests to avoid overloading the server
- Ingredients with `null` values are automatically filtered

---

## 📥 Commands for Retrieving Data from Server

### Get all recipes from the server

```bash
npm start
```

or

```bash
npm run dev
```

**What this command does:**
- Sends GET request to API: `https://grupp1-xjvta.reky.se/recipes`
- Retrieves all recipes from the server
- Outputs request status information
- Shows the number of recipes retrieved
- Displays an example of the first recipe in JSON format

**Example output:**
```
🔄 Sending request to API...
📍 URL: https://grupp1-xjvta.reky.se/recipes

✅ Request successful!
📊 Response status: 200
📦 Number of recipes: 35

📋 Example of first recipe:
{
  "_id": "68ffe0cb8a8cd70776fd5cae",
  "title": "Toast skagen",
  "description": "Gott till champagne",
  ...
}

✨ All data retrieved successfully!
```

---

## 🔍 Commands for Checking API Status

### API Availability Check (basic check)

```bash
npm start
```

This command also serves to check API functionality. If the API is working correctly, you will see:
- ✅ Response status: 200
- List of recipes
- No error messages

### Detailed API Status Check

You can use the `getRecipes.ts` script for a more detailed check:

```bash
npx tsx getRecipes.ts
```

**What is checked:**
- Server availability
- API response correctness
- Data format
- Presence of recipes on the server

### Check via Direct HTTP Request

You can also use `curl` to check the API:

```bash
curl https://grupp1-xjvta.reky.se/recipes
```

Or in PowerShell (Windows):

```powershell
Invoke-WebRequest -Uri https://grupp1-xjvta.reky.se/recipes -Method GET
```

### Signs of a Working API:
- ✅ Response status: 200 (OK)
- ✅ Recipe array received
- ✅ Data in correct JSON format
- ✅ No network errors or timeouts

### Signs of API Problems:
- ❌ Response status: 404 (Not Found) - API not found
- ❌ Response status: 500 (Internal Server Error) - server error
- ❌ Response status: 503 (Service Unavailable) - service unavailable
- ❌ Network error (ECONNREFUSED, ETIMEDOUT) - server unavailable
- ❌ Empty response or incorrect data format

---

## 📁 File Description

### `getRecipes.ts`
Script for retrieving all recipes from the server via GET request.

**Main functions:**
- Sends GET request to `/recipes`
- Outputs status and number of recipes
- Shows an example of the first recipe
- Handles errors with detailed output

### `sendRecipes.ts`
Script for sending recipes to the server from `recipes.json` file.

**Main functions:**
- Reads the `../data/recipes.json` file
- Transforms data into API format
- Sends POST requests for each recipe
- Tracks progress and statistics
- Handles errors for each recipe

### `package.json`
Project configuration file with dependencies and scripts.

**Scripts:**
- `npm start` / `npm run dev` - get recipes from server
- `npm run send` / `npm run send-recipes` - send recipes to server

### `tsconfig.json`
TypeScript configuration for the project.

---

## 📂 Project Structure

```
backend/
├── getRecipes.ts      # Script for retrieving recipes
├── sendRecipes.ts     # Script for sending recipes
├── package.json       # Project configuration and dependencies
├── tsconfig.json      # TypeScript configuration
├── README.md          # This file
└── node_modules/      # Installed dependencies

../data/
└── recipes.json       # File with recipes to send to server
```

---

## 💡 Usage Examples

### Example 1: Check API Functionality

```bash
# Check if API is working
npm start
```

If you see status 200 and a list of recipes - the API is working correctly.

### Example 2: Send Recipes to Server

```bash
# Make sure recipes.json file exists in ../data/ folder
# Then send recipes
npm run send
```

### Example 3: Get All Recipes from Server

```bash
# Get all recipes
npm start
```

### Example 4: Combined Check (send and retrieve)

```bash
# 1. Send recipes
npm run send

# 2. Check that they appeared on the server
npm start
```

---

## 🔧 Troubleshooting

### Problem: "Cannot find module 'axios'"

**Solution:**
```bash
npm install
```

### Problem: "Cannot find module '../data/recipes.json'"

**Solution:**
Make sure the `recipes.json` file exists in the `../data/` folder relative to the `backend/` folder.

### Problem: "ECONNREFUSED" or "ETIMEDOUT"

**Solution:**
- Check your internet connection
- Make sure the API server is accessible: `https://grupp1-xjvta.reky.se/recipes`
- Check if firewall is blocking the connection

### Problem: "SyntaxError: Unexpected token"

**Solution:**
- Check the JSON format in the `recipes.json` file
- Make sure the file is valid JSON (can be checked via online validator)

### Problem: "Status 404" or "Status 500"

**Solution:**
- Check the API URL: `https://grupp1-xjvta.reky.se/recipes`
- Make sure the server is running
- Check the format of data being sent

### Problem: TypeScript Compilation Errors

**Solution:**
```bash
# Reinstall dependencies
npm install

# Check Node.js version (should be 18+)
node --version
```

---

## 🌐 API Endpoint

**Base URL:** `https://grupp1-xjvta.reky.se`

**Endpoints:**
- `GET /recipes` - get all recipes
- `POST /recipes` - create new recipe
- `GET /recipes/{recipeId}` - get recipe by ID
- `PATCH /recipes/{recipeId}` - update recipe
- `DELETE /recipes/{recipeId}` - delete recipe

---

## 📝 Data Format

### Recipe Format for Sending (API):

```json
{
  "title": "Recipe Name",
  "description": "Recipe Description",
  "ratings": [],
  "imageUrl": "https://example.com/image.jpg",
  "price": 100,
  "categories": ["Category1", "Category2"],
  "instructions": ["Step 1", "Step 2"],
  "ingredients": [
    {
      "name": "Ingredient",
      "amount": 1,
      "unit": "pcs"
    }
  ]
}
```

---

## 📞 Support

If you encounter problems:
1. Check the "Troubleshooting" section
2. Make sure all dependencies are installed
3. Check your internet connection
4. Make sure the API server is accessible

---

## 📄 License

ISC

---

**Last updated:** 2024

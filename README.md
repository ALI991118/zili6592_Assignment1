# Project Title

A Dynamic Book Browsing Web Application

## Description

B2Ybooks is a lightweight, interactive front-end web app

Feature Description:
🔍 Search Real-time book search by title with highlighted results
🎨 Filter Filter by category with or without search
🛒 Cart System Select one book at a time, enter quantity, auto-save to localStorage
♻️ Reset Cart Clears the cart with confirmation prompt
🌗 Dark Mode Toggle Beautifully styled switch with gradient background and sun/moon icons
💾 Persistent State Cart contents and dark mode persist between page reloads via localStorage

## Folder Structure

B2Ybooks/
├── index.html # Main HTML page
├── index.css # Styling (light/dark mode, table, layout)
├── index.js # All interactivity logic
├── data.json # Book data in JSON format
├── images/ # Folder for book cover images
│ └── (book images)
├── README.md # This file

## Getting Started

### Dependencies

No external frameworks required. Only a modern web browser is needed (e.g., Chrome, Firefox, Edge).  
To load the JSON file properly, please use a local development server.

### Installing

1. Download the project folder or clone the repo.
   (From canvas or github - https://github.com/ALI991118/zili6592_Assignment1.git)

2. Ensure the folder structure is preserved.

3. Use VS Code with Live Server or any local HTTP server to launch the app.

### Executing program

Open index.html using Live Server or a local HTTP server.

Use the interface:

🔍 Search for book titles.

🎯 Filter by category.

🛒 Select one book with checkbox, click "Add to cart" and enter quantity.

♻️ Click "Reset the cart" to clear selections.

🌙 Toggle between light and dark mode with the top-right switch.

Cart state and dark mode are saved via localStorage and restored on page reload.

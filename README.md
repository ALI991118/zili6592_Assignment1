# Project Title

A Dynamic Book Browsing Web Application



## Description

B2Ybooks is a lightweight, interactive front-end web app

Feature Description:

- 🔍 Search Real-time book search by title with highlighted results

- 🎨 Filter Filter by category with or without search

- 🛒 Cart System Select one book at a time, enter quantity, auto-save to localStorage

- ♻️ Reset Cart Clears the cart with confirmation prompt

- 🌗 Dark Mode Toggle Beautifully styled switch with gradient background and sun/moon icons

- 💾 Persistent State Cart contents and dark mode persist between page reloads via localStorage



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

1. Open B2Ybooks/index.html using Live Server or a local HTTP server.

2. Use the interface

​	🔍 Search for book titles.

​	🎯 Filter by category.

​	🛒 Select one book with checkbox, click "Add to cart" and enter quantity.

​	♻️ Click "Reset the cart" to clear selections.

​	🌙 Toggle between light and dark mode with the top-right switch.

3. Cart state and dark mode are saved via localStorage and restored on page reload.



## 🧪 Testing & Notes for the Marker

This section outlines the test cases used to validate each feature, along with some remarks you may want to consider when assessing the application.

### 🔍 Search Function

- ✅ Input empty string or whitespace should **not trigger search**.

- ✅ Case insensitive search supported, e.g., `"A"` matches `"a"`.

- ✅ Highlights matching rows when search term is present.

- #### ⚠️ Error Handling

  - No specific error message is needed for empty input; the app just returns all books.

------

### 📂 Category Filter

- ✅ Category filter works independently or with search.

- ✅ Selecting a category with no results prompts an alert.

- ✅ Option "All" resets the filter.

- #### ⚠️Error Handling

  - If no books found:
     `alert("No books found in the selected category.")`

------

### 🛒 Cart Function

- ✅ Only **one book** can be selected at a time for clarity and simplicity.

- ✅ Quantity prompt supports only positive integers (no decimals, no negatives).

- ✅ Invalid input (e.g., `0`, `-1`, `2.0`, `"abc"`) triggers error messages.

- ✅ Cart count is updated and reflects total quantity across all books.

- ✅ Cart state is saved to `localStorage` and restored on page load.

- ✅ Reset cart button shows confirmation and clears the cart.

- #### ⚠️ Error Handling

  - No book selected:
     `alert("Please select one book to add to the cart.")`
  - Input is not a number or includes decimal or Input is 0 or negative :
     `alert("Invalid quantity. Please enter a valid number.")`

------

### 🌙 Dark Mode

- ✅ Toggle switch in the top-right corner with 🌙 and ☀️ icons.
- ✅ Enhanced with gradient styling for visual feedback.
- ✅ Dark mode state is saved via `localStorage`.
- ✅ Smooth transitions between themes.

------

### 🧩 Component Interaction

- ✅ Cart actions (add/reset) do not affect current search or filter state.

- ✅ Book data is dynamically rendered; changes are reactive to both search and category filter.

- ✅ UI prevents checkbox conflicts and multiple selections.

  #### 


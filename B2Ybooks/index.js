
// Book Data & Initial Rendering
let bookData = [];

document.addEventListener("DOMContentLoaded", function () {
  fetch("data.json")
    .then(response => response.json())
    .then(data => {
      bookData = data;
      filterAndSearchBooks(); // Initial display
    })
    .catch(error => {
      console.log("Error loading data", error);
    });

  // Search & Filter Function
  function filterAndSearchBooks() {
    const rawInput = document.getElementById("searchInput").value;
    const searchTerm = rawInput.trim().toLowerCase();
    const selectedCategory = document.getElementById("filterCategories").value;
    const isEmptySearch = rawInput.trim() === "";

    let filteredBooks;

    if (selectedCategory !== "") {
      filteredBooks = bookData.filter(book => {
        const matchesCategory = book.category === selectedCategory;
        const matchesSearch = isEmptySearch || book.title.toLowerCase().includes(searchTerm);
        return matchesCategory && matchesSearch;
      });
    } else {
      filteredBooks = isEmptySearch
        ? bookData.slice()
        : bookData.filter(book => book.title.toLowerCase().includes(searchTerm));
    }

    if (filteredBooks.length === 0) {
      if (!isEmptySearch && selectedCategory !== "") {
        alert("No matching books found for the selected category and search term.");
      } else if (!isEmptySearch) {
        alert("No books match your search term.");
      } else if (selectedCategory !== "") {
        alert("No books found in the selected category.");
      }
    }

    displayBooks(filteredBooks, isEmptySearch ? "" : searchTerm);
  }

  // Render Books to Table
  function displayBooks(books, searchTerm = "") {
    const tableBody = document.getElementById("bookTable");
    tableBody.innerHTML = "";

    books.forEach(book => {
      const row = document.createElement("tr");

      const shouldHighlight = searchTerm !== "" && book.title.toLowerCase().includes(searchTerm);
      if (shouldHighlight) {
        row.classList.add("highlighted");
      }

      const ratingStars = getStars(book.rating);

      row.innerHTML = `
        <td><input type="checkbox"></td>
        <td><img src="${book.img}" alt="Book Cover" style="width:50px; height:auto;"></td>
        <td>${book.title}</td>
        <td>${ratingStars}</td>
        <td>${book.authors}</td>
        <td>${book.year}</td>
        <td>$${book.price}</td>
        <td>${book.publisher}</td>
        <td>${book.category}</td>
      `;

      tableBody.appendChild(row);
    });
  }

  // Convert number to star icons
  function getStars(rating) {
    const fullStar = '<span class="full">★</span>';
    const emptyStar = '<span class="empty">☆</span>';
    const max = 5;
    const rounded = Math.round(rating);
    return `<span class="star-rating">${fullStar.repeat(rounded)}${emptyStar.repeat(max - rounded)}</span>`;
  }

  // 🔘 Button Events
  document.getElementById("btn").addEventListener("click", function (event) {
    event.preventDefault();
    filterAndSearchBooks();
  });

  document.getElementById("filterBtn").addEventListener("click", function (event) {
    event.preventDefault();
    filterAndSearchBooks();
  });
});


// 🛒 Shopping Cart Module
let cart = [];

// Initialize cart from localStorage
document.addEventListener("DOMContentLoaded", () => {
  const storedCart = localStorage.getItem("cart");
  if (storedCart) {
    cart = JSON.parse(storedCart);
    updateCartCount();
  }
});

// Limit to one checkbox selected
document.addEventListener("change", function (event) {
  if (event.target.type === "checkbox") {
    const allCheckboxes = document.querySelectorAll("#bookTable input[type='checkbox']");
    allCheckboxes.forEach(cb => {
      if (cb !== event.target) cb.checked = false;
    });
  }
});

// Add to cart
document.getElementById("addToCartBtn").addEventListener("click", function () {
  const allCheckboxes = document.querySelectorAll("#bookTable input[type='checkbox']");
  let selectedRow = null;

  allCheckboxes.forEach(cb => {
    if (cb.checked) {
      selectedRow = cb.closest("tr");
    }
  });

  if (!selectedRow) {
    alert("Please select one book to add to the cart.");
    return;
  }

  const title = selectedRow.children[2].textContent.trim();
  const quantityInput = prompt("Enter quantity to add:", "1");

  if (!/^\d+$/.test(quantityInput)) {
    alert("Invalid quantity. Please enter a valid number.");
    return;
  }

  const quantity = Number(quantityInput);
  if (quantity <= 0) {
    alert("Invalid quantity. Please enter a number greater than 0.");
    return;
  }

  const existing = cart.find(item => item.title === title);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ title, quantity });
  }

  selectedRow.querySelector("input[type='checkbox']").checked = false;
  saveCart();
  updateCartCount();
});

// Reset cart
document.getElementById("resetCartBtn").addEventListener("click", function () {
  const confirmed = confirm("Are you sure you want to reset the cart?");
  if (confirmed) {
    cart = [];
    saveCart();
    updateCartCount();
  }
});

// Update cart count display
function updateCartCount() {
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cartCount").textContent = `(${totalCount})`;
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}


// 🌙 Dark Mode Switch
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("darkModeToggle");

  // Initialize dark mode
  const savedMode = localStorage.getItem("darkMode");
  if (savedMode === "enabled") {
    document.body.classList.add("dark-mode");
    toggle.checked = true;
  }

  // Toggle event
  toggle.addEventListener("change", () => {
    if (toggle.checked) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("darkMode", "enabled");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("darkMode", "disabled");
    }
  });
});

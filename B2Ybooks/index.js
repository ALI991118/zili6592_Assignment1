let bookData = [];

document.addEventListener("DOMContentLoaded", function () {
  fetch("data.json")
    .then(response => response.json())
    .then(data => {
      bookData = data;
      filterAndSearchBooks(); // 初始加载
    })
    .catch(error => {
      console.log("Error loading data", error);
    });

  function filterAndSearchBooks() {
    const rawInput = document.getElementById("searchInput").value;
    const searchTerm = rawInput.trim().toLowerCase();
    const selectedCategory = document.getElementById("filterCategories").value;
  
    let filteredBooks;
    
    // 🧠 Edge case: 空输入 or 全是空格
    const isEmptySearch = rawInput.trim() === "";
  
    // 分类已选
    if (selectedCategory !== "") {
      filteredBooks = bookData.filter(book => {
        const matchesCategory = book.category === selectedCategory;
        const matchesSearch = isEmptySearch || book.title.toLowerCase().includes(searchTerm);
        return matchesCategory && matchesSearch;
      });
    } else {
      // ✅ 修改这里，确保只在有搜索词时才过滤，否则显示全部
      filteredBooks = isEmptySearch
        ? bookData.slice()
        : bookData.filter(book => book.title.toLowerCase().includes(searchTerm));
    }
  
    // ✅ 三种情况的无结果提示
    if (filteredBooks.length === 0) {
      if (!isEmptySearch && selectedCategory !== "") {
        alert("No matching books found for the selected category and search term.");
      } else if (!isEmptySearch) {
        alert("No books match your search term.");
      } else if (selectedCategory !== "") {
        alert("No books found in the selected category.");
      }
    }

    // 渲染 & 仅在非空搜索时执行高亮
    displayBooks(filteredBooks, isEmptySearch ? "" : searchTerm);
  }

    

  function displayBooks(books, searchTerm = "") {
    const tableBody = document.getElementById("bookTable");
    tableBody.innerHTML = "";
  
    books.forEach(book => {
      const row = document.createElement("tr");
  
      const shouldHighlight =
        searchTerm !== "" && book.title.toLowerCase().includes(searchTerm);
  
      if (shouldHighlight) {
        row.classList.add("highlighted");
      } else {
        row.classList.remove("highlighted");
      }
  
      // ⭐ 把数字转换成星星字符串
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
  
  // ⭐ 工具函数：把数字转为星星图标
  function getStars(rating) {
    const fullStar = '<span class="full">★</span>';
    const emptyStar = '<span class="empty">☆</span>';
    const max = 5;
  
    const rounded = Math.round(rating);
    return `<span class="star-rating">${fullStar.repeat(rounded)}${emptyStar.repeat(max - rounded)}</span>`;
  }
  

  // 搜索按钮
  document.getElementById("btn").addEventListener("click", function (event) {
    event.preventDefault();
    filterAndSearchBooks();
  });

  // 筛选按钮
  document.getElementById("filterBtn").addEventListener("click", function (event) {
    event.preventDefault();
    filterAndSearchBooks();
  });
});




let cart = [];

// 初始化：从 localStorage 恢复购物车
document.addEventListener("DOMContentLoaded", () => {
  const storedCart = localStorage.getItem("cart");
  // localStorage.removeItem("cart");
  if (storedCart) {
    cart = JSON.parse(storedCart);
    updateCartCount();
  }
});

// 限制只能勾选一本
document.addEventListener("change", function (event) {
  if (event.target.type === "checkbox") {
    const allCheckboxes = document.querySelectorAll("#bookTable input[type='checkbox']");
    allCheckboxes.forEach(cb => {
      if (cb !== event.target) cb.checked = false;
    });
  }
});



// Add to Cart 按钮功能
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

  // 使用正则验证是纯数字（不接受小数或非数字）
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

// 重置购物车按钮
document.getElementById("resetCartBtn").addEventListener("click", function () {
  const confirmed = confirm("Are you sure you want to reset the cart?");
  if (confirmed) {
    cart = [];
    saveCart();
    updateCartCount();
  }
});

// 更新购物车数量显示
function updateCartCount() {
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cartCount").textContent = `(${totalCount})`;
}

// 保存购物车到 localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}




// Dark Mode 开关逻辑
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("darkModeToggle");

  // 初始化 - 检查 localStorage
  const savedMode = localStorage.getItem("darkMode");
  if (savedMode === "enabled") {
    document.body.classList.add("dark-mode");
    toggle.checked = true;
  }

  // 切换开关时切换样式
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

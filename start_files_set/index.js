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
    const searchTerm = document.getElementById("searchInput").value.toLowerCase();
    const selectedCategory = document.getElementById("filterCategories").value;

    let filteredBooks;

    // 分类已选 → 搜索 + 分类 同时过滤
    if (selectedCategory !== "") {
      filteredBooks = bookData.filter(book => {
        const matchesCategory = book.category === selectedCategory;
        const matchesSearch = book.title.toLowerCase().includes(searchTerm);
        return matchesCategory && matchesSearch;
      });
    } else {
      // 只搜索，不分类 → 显示全部，用 searchTerm 控制高亮
      filteredBooks = bookData.slice(); // 拷贝全部
    }

    displayBooks(filteredBooks, searchTerm);
  }

  function displayBooks(books, searchTerm = "") {
    const tableBody = document.getElementById("bookTable");
    tableBody.innerHTML = "";

    books.forEach(book => {
      const row = document.createElement("tr");

      const shouldHighlight =
        searchTerm !== "" && book.title.toLowerCase().includes(searchTerm);

      row.style.backgroundColor = shouldHighlight ? "#ffffcc" : "";

      row.innerHTML = `
        <td><input type="checkbox"></td>
        <td><img src="${book.img}" alt="Book Cover" style="width:50px; height:auto;"></td>
        <td>${book.title}</td>
        <td>${book.rating}</td>
        <td>${book.authors}</td>
        <td>${book.year}</td>
        <td>$${book.price}</td>
        <td>${book.publisher}</td>
        <td>${book.category}</td>
      `;

      tableBody.appendChild(row);
    });
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

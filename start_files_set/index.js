let bookData = [];
document.addEventListener("DOMContentLoaded", function () {

  fetch("data.json")
      .then(response => response.json())
      .then(data => {
          bookData = data;
          displayBooks(bookData);
      })
      .catch(error => {
        console.log("Error loading data", error);
      });

  function displayBooks(books) {
    const tableBody = document.getElementById("bookTable");
    tableBody.innerHTML = "";

    books.forEach(book => {
      let row = document.createElement("tr");
      row.innerHTML = `
          <td><input type="checkbox"></td>
          <td><img src="${book.img}" alt="Book Cover" style="width:50px; height:auto;"></td>
          <td>${book.title}</td>
          <td>${book.authors}</td>
          <td>${book.year}</td>
          <td>$${book.price}</td>
          <td>${book.publisher}</td>
          <td>${book.category}</td>
      `;

      tableBody.appendChild(row);
    });
  }

  // 搜索 + 分类筛选 统一处理逻辑
  function filterAndSearchBooks() {
    const searchTerm = document.getElementById("searchInput").value.toLowerCase();
    const selectedCategory = document.getElementById("filterCategories").value;

    const filteredBooks = bookData.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchTerm) || book.authors.toLowerCase().includes(searchTerm);
      const matchesCategory = selectedCategory === "" || book.category === selectedCategory;
      return matchesSearch && matchesCategory; // 两个条件都要满足
    });

    displayBooks(filteredBooks);
  }

  // 监听搜索按钮点击
  document.getElementById("btn").addEventListener("click", function(event) {
    event.preventDefault();
    filterAndSearchBooks();
  });

  // 监听 Filter 按钮点击
  document.getElementById("filterBtn").addEventListener("click", function(event) {
    event.preventDefault();
    filterAndSearchBooks();
  });

});

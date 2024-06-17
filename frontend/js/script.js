document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  const addBookForm = document.getElementById('add-book-form');
  const booksList = document.getElementById('books-list');
  const currentlyReadingList = document.getElementById('currently-reading-list');
  const navLinks = document.querySelectorAll('nav a');

  // Check if user is logged in
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  // Function to toggle navigation based on authentication
  function toggleNav() {
    navLinks.forEach(link => {
      if (isLoggedIn) {
        if (link.classList.contains('auth')) {
          link.style.display = 'inline-block';
        } else {
          link.style.display = 'none';
        }
      } else {
        if (link.classList.contains('auth')) {
          link.style.display = 'none';
        } else {
          link.style.display = 'inline-block';
        }
      }
    });
  }

  toggleNav(); // Initial call to toggle nav links

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Login form submitted');
      localStorage.setItem('isLoggedIn', 'true');
      toggleNav(); // Update nav after login
      window.location.href = 'books.html';
    });
  }

  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Account created successfully!');
      window.location.href = 'login.html';
    });
  }

  if (addBookForm) {
    addBookForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('book-title').value;
      const author = document.getElementById('book-author').value;
      const status = document.getElementById('book-status').value;

      const book = { title, author, status };
      let books = JSON.parse(localStorage.getItem('books')) || [];
      books.push(book);
      localStorage.setItem('books', JSON.stringify(books));
      alert('Book added successfully');
      addBookForm.reset();
      renderBooks();
    });
  }

  function renderBooks() {
    if (booksList) {
      booksList.innerHTML = '';
      const books = JSON.parse(localStorage.getItem('books')) || [];
      books.forEach((book) => {
        const bookItem = document.createElement('div');
        bookItem.className = 'book-item';
        bookItem.innerHTML = `
          <h3>${book.title}</h3>
          <p><strong>Author:</strong> ${book.author}</p>
          <p><strong>Status:</strong> ${book.status}</p>
        `;
        booksList.appendChild(bookItem);
      });
    }

    if (currentlyReadingList) {
      currentlyReadingList.innerHTML = '';
      const books = JSON.parse(localStorage.getItem('books')) || [];
      const currentlyReading = books.filter(book => book.status === 'Currently Reading');
      currentlyReading.forEach((book) => {
        const bookItem = document.createElement('div');
        bookItem.className = 'book-item';
        bookItem.innerHTML = `
          <h3>${book.title}</h3>
          <p><strong>Author:</strong> ${book.author}</p>
        `;
        currentlyReadingList.appendChild(bookItem);
      });
    }
  }

  renderBooks();
});

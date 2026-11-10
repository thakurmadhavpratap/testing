/* --- AUTH PAGE LOGIC --- */
function toggleAuth(type) {
    const loginForm = document.getElementById('form-login');
    const signupForm = document.getElementById('form-signup');
    const btnLogin = document.getElementById('btn-login');
    const btnSignup = document.getElementById('btn-signup');

    if (!loginForm || !signupForm) return;

    if (type === 'login') {
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
        btnLogin.classList.add('active');
        btnSignup.classList.remove('active');
    } else {
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
        btnLogin.classList.remove('active');
        btnSignup.classList.add('active');
    }
}

function handleAuth(event) {
    event.preventDefault();
    window.location.href = 'courses.html';
}

/* --- MAIN INITIALIZATION --- */
document.addEventListener('DOMContentLoaded', () => {
    // Safety check: Is mockData loaded?
    if (typeof mockData === 'undefined') {
        console.error("CRITICAL ERROR: mockData is missing. Please check data.js for syntax errors.");
        return;
    }

    // 1. Check for saved search from Home Page
    const savedSearch = localStorage.getItem('searchQuery');

    // 2. Courses Page Logic
    const courseContainer = document.getElementById('course-container');
    if (courseContainer) {
        // If we have a saved search, execute it immediately
        if(savedSearch) {
            const searchInput = document.getElementById('global-search');
            if(searchInput) searchInput.value = savedSearch;

            renderCourses(savedSearch);
            // Clear it so it doesn't persist forever
            localStorage.removeItem('searchQuery');
        } else {
            renderCourses();
        }
    }

    // 3. Books Page Logic
    const booksContainer = document.getElementById('books-container');
    if (booksContainer) {
        renderBooks();
    }
});

/* --- SEARCH LOGIC --- */
// Called when pressing "Enter" on Index/Home page
function handleEnter(e) {
    if (e.key === 'Enter') {
        const query = e.target.value;
        localStorage.setItem('searchQuery', query);
        window.location.href = 'courses.html';
    }
}

// Called on KeyUp in Courses page
function liveSearch() {
    const searchInput = document.getElementById('global-search');
    if (!searchInput) return;

    const query = searchInput.value.toLowerCase();
    renderCourses(query);
}

/* --- RENDER FUNCTIONS --- */
function renderCourses(filterText = '') {
    const container = document.getElementById('course-container');
    if(!container) return;

    container.innerHTML = '';

    if (typeof mockData === 'undefined') {
        container.innerHTML = '<p>Error loading data.</p>';
        return;
    }

    const filtered = mockData.courses.filter(c =>
        c.title.toLowerCase().includes(filterText.toLowerCase()) ||
        c.instructor.toLowerCase().includes(filterText.toLowerCase())
    );

    if(filtered.length === 0) {
        container.innerHTML = '<p style="color:white; padding:10px;">No courses found matching "' + filterText + '".</p>';
        return;
    }

    filtered.forEach(course => {
        const card = document.createElement('div');
        card.className = 'course-card';
        card.innerHTML = `
            <img src="${course.thumbnail}" alt="${course.title}">
            <div class="card-content">
                <div class="card-title">${course.title}</div>
                <div class="card-instructor">${course.instructor}</div>
                <div class="card-price">${course.price}</div>
            </div>
        `;
        card.onclick = () => openClassroom(course);
        container.appendChild(card);
    });
}

function renderBooks() {
    const container = document.getElementById('books-container');
    if(!container) return;

    container.innerHTML = '';

    if (typeof mockData === 'undefined') return;

    mockData.books.forEach(book => {
        const card = document.createElement('div');
        card.className = 'course-card';
        card.innerHTML = `
            <img src="${book.thumbnail}" alt="${book.title}">
            <div class="card-content">
                <div class="card-title">${book.title}</div>
                <div class="card-instructor">${book.author}</div>
                <button class="btn-primary" style="margin-top: auto;">Read Now</button>
            </div>
        `;
        card.onclick = () => openBookReader(book);
        container.appendChild(card);
    });
}

/* --- BOOK READER LOGIC --- */
let currentBookQuiz = [];

function openBookReader(book) {
    const listView = document.getElementById('book-list-view');
    const readerView = document.getElementById('book-reader-view');

    if(!listView || !readerView) return;

    listView.classList.add('hidden');
    readerView.classList.remove('hidden');

    const pdfFrame = document.getElementById('pdf-viewer');
    if(pdfFrame) pdfFrame.src = book.pdfUrl;

    currentBookQuiz = book.quiz || [];
    renderBookQuiz(currentBookQuiz);
}

function closeBookReader() {
    const listView = document.getElementById('book-list-view');
    const readerView = document.getElementById('book-reader-view');
    if(!listView || !readerView) return;

    listView.classList.remove('hidden');
    readerView.classList.add('hidden');

    const pdfFrame = document.getElementById('pdf-viewer');
    if(pdfFrame) pdfFrame.src = "";
}

function renderBookQuiz(questions) {
    const container = document.getElementById('book-quiz-container');
    const result = document.getElementById('book-quiz-result');
    if(!container) return;

    container.innerHTML = '';
    if(result) result.innerText = '';

    if(questions.length === 0) {
        container.innerHTML = '<p>No quiz available for this book.</p>';
        return;
    }

    questions.forEach((q, index) => {
        let html = `<div class="question-block">
            <p>${index + 1}. ${q.q}</p>`;
        q.options.forEach((opt, i) => {
            html += `<label><input type="radio" name="bq${index}" value="${i}"> ${opt}</label>`;
        });
        html += `</div>`;
        container.innerHTML += html;
    });
}

function checkBookQuiz() {
    let score = 0;
    if(currentBookQuiz.length === 0) return;

    currentBookQuiz.forEach((q, index) => {
        const selected = document.querySelector(`input[name="bq${index}"]:checked`);
        if(selected && parseInt(selected.value) === q.correct) {
            score++;
        }
    });

    const result = document.getElementById('book-quiz-result');
    if(result) {
        result.innerText = `You scored ${score} out of ${currentBookQuiz.length}`;
        result.style.color = score === currentBookQuiz.length ? '#22c55e' : '#facc15';
    }
}

/* --- CLASSROOM LOGIC --- */
let currentQuiz = [];

function openClassroom(course) {
    const listView = document.getElementById('course-list-view');
    const classroomView = document.getElementById('classroom-view');
    if(!listView || !classroomView) return;

    listView.classList.add('hidden');
    classroomView.classList.remove('hidden');

    document.getElementById('video-player').src = course.videoUrl;
    document.getElementById('code-editor').value = course.codeSnippet;

    const output = document.getElementById('output');
    if(output) output.innerText = "";

    currentQuiz = course.quiz || [];
    renderQuiz(currentQuiz);
}

function closeClassroom() {
    const video = document.getElementById('video-player');
    if(video) video.pause();
    document.getElementById('course-list-view').classList.remove('hidden');
    document.getElementById('classroom-view').classList.add('hidden');
}

function switchTab(tab) {
    const tabNotes = document.getElementById('tab-notes');
    const tabQuiz = document.getElementById('tab-quiz');
    const btnNotes = document.getElementById('btn-notes');
    const btnQuiz = document.getElementById('btn-quiz');

    if(!tabNotes || !tabQuiz) return;

    tabNotes.classList.add('hidden');
    tabQuiz.classList.add('hidden');
    btnNotes.classList.remove('active');
    btnQuiz.classList.remove('active');

    document.getElementById(`tab-${tab}`).classList.remove('hidden');
    document.getElementById(`btn-${tab}`).classList.add('active');
}

function renderQuiz(questions) {
    const container = document.getElementById('quiz-container');
    const result = document.getElementById('quiz-result');
    if(!container) return;

    container.innerHTML = '';
    if(result) result.innerText = '';

    if(questions.length === 0) {
        container.innerHTML = '<p>No quiz available for this lesson.</p>';
        return;
    }

    questions.forEach((q, index) => {
        let html = `<div class="question-block">
            <p>${index + 1}. ${q.q}</p>`;
        q.options.forEach((opt, i) => {
            html += `<label><input type="radio" name="q${index}" value="${i}"> ${opt}</label>`;
        });
        html += `</div>`;
        container.innerHTML += html;
    });
}

function checkQuiz() {
    let score = 0;
    if(currentQuiz.length === 0) return;

    currentQuiz.forEach((q, index) => {
        const selected = document.querySelector(`input[name="q${index}"]:checked`);
        if(selected && parseInt(selected.value) === q.correct) {
            score++;
        }
    });

    const result = document.getElementById('quiz-result');
    if(result) {
        result.innerText = `You scored ${score} out of ${currentQuiz.length}`;
        result.style.color = score === currentQuiz.length ? '#22c55e' : '#facc15';
    }
}

function runCode() {
    const codeEl = document.getElementById('code-editor');
    const output = document.getElementById('output');
    if(!codeEl || !output) return;

    const code = codeEl.value;
    output.innerText = "> Running script...\n";

    setTimeout(() => {
        if(code.includes("print") || code.includes("console.log")) {
            const cleanText = code.replace(/print\(|console\.log\(|\)|\"|\'/g, "");
            output.innerText = `> ${cleanText}`;
        } else if(code.includes("<h1>")) {
            output.innerText = "> Rendering HTML Element...";
        } else {
            output.innerText = "> Code executed successfully.";
        }
    }, 400);
}
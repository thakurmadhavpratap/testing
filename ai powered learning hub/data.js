// data.js
// Safe Mode: Using online placeholders to ensure site loads.

const mockPdf = "https://docs.google.com/gview?embedded=true&url=https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

const mockData = {
    courses: [
        {
            id: 1,
            title: "Web Development Bootcamp",
            instructor: "Dr. Angela Yu",
            rating: 4.8,
            price: "$19.99",
            thumbnail: "image/img1.jpg",
            pdfUrl: mockPdf,
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            codeSnippet: "<h1>Hello World</h1>",
            quiz: [
                { q: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Text Maker Logic"], correct: 0 },
                { q: "Which tag is used for the largest heading?", options: ["<h6>", "<h1>"], correct: 1 }
            ]
        },
        {
            id: 2,
            title: "Data Science Fundamentals",
            instructor: "Jose Portilla",
            rating: 4.7,
            price: "$14.99",
            thumbnail: "image/img2.jpg",
            pdfUrl: mockPdf,
            videoUrl: "https://www.w3schools.com/html/movie.mp4",
            codeSnippet: "print('Hello Data')",
            quiz: [
                { q: "Which library is used for data manipulation?", options: ["Pandas", "Requests"], correct: 0 },
                { q: "What is the output of 2**3?", options: ["6", "8"], correct: 1 }
            ]
        },
        {
            id: 3,
            title: "Machine Learning A-Z",
            instructor: "Kirill Eremenko",
            rating: 4.9,
            price: "$24.99",
            thumbnail: "image/img4.jpg",
            pdfUrl: mockPdf,
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            codeSnippet: "import tensorflow as tf",
            quiz: [
                { q: "What is Supervised Learning?", options: ["Learning with labeled data", "Learning without data"], correct: 0 }
            ]
        },
        {
            id: 4,
            title: "React JS Guide",
            instructor: "Max Schwarzmüller",
            rating: 4.6,
            price: "$12.99",
            thumbnail: "image/img4.jpg",
            pdfUrl: mockPdf,
            videoUrl: "https://www.w3schools.com/html/movie.mp4",
            codeSnippet: "const App = () => <h1>Hi</h1>",
            quiz: [
                { q: "What is a Component?", options: ["A reusable code block", "A database"], correct: 0 }
            ]
        }
    ],
    books: [
        {
            title: "Clean Code",
            author: "Elon Musk",
            thumbnail: "image/book1.jpg",
            pdfUrl:"pdf/1.pdf",
            quiz: [
                { q: "What is the primary goal of Clean Code?", options: ["To make code readable", "To make code fast"], correct: 0 }
            ]
        },
        {
            title: "Engineering Mechanics: Statics",
            author: "R.C. Hibbeler",
            thumbnail: "image/book2.jpg",
            pdfUrl:"pdf/2.pdf",
            quiz: [
                { q: "What is Newton's First Law?", options: ["F=ma", "Law of Inertia"], correct: 1 }
            ]
        },
        {
            title: "Intro to Thermodynamics",
            author: "Michael Boles",
            thumbnail: "image/book3.jpg",
            pdfUrl:"pdf/3.pdf",
            quiz: [
                { q: "The First Law of Thermodynamics relates to:", options: ["Conservation of Energy", "Entropy"], correct: 0 }
            ]
        },
        {
            title: "Electric Circuits",
            author: "Charles K. Alexander",
            thumbnail: "image/book4.jpg",
            pdfUrl:"pdf/2.pdf",
            quiz: [
                { q: "V = IR is known as:", options: ["Kirchhoff's Law", "Ohm's Law"], correct: 1 }
            ]
        },
        {
            title: "Data Structures & Algorithms",
            author: "Narasimha Karumanchi",
            thumbnail: "image/book5.jpg",
            pdfUrl:"pdf/1.pdf",
            quiz: [
                { q: "Which data structure is LIFO?", options: ["Queue", "Stack"], correct: 1 }
            ]
        },
        {
            title: "Design Patterns",
            author: "Gang of Four",
            thumbnail: "image/book6.jpg",
            pdfUrl:"pdf/3.pdf",
            quiz: [
                { q: "Which pattern creates only one instance?", options: ["Singleton", "Factory"], correct: 0 }
            ]
        }
    ]
};
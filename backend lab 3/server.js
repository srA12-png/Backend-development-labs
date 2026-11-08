
const express = require('express');

const app = express();
app.use(express.json());

// Temporary books data
let books = [
    { id: 1, title: 'Harry Potter', author: 'J.K. Rowling', price: 500 },
    { id: 2, title: 'Wings of Fire', author: 'A.P.J. Abdul Kalam', price: 300 },
    { id: 3, title: 'The Alchemist', author: 'Paulo Coelho', price: 400 },
    { id: 4, title: 'Rich Dad Poor Dad', author: 'Robert Kiyosaki', price: 600 },
    { id: 5, title: 'Atomic Habits', author: 'James Clear', price: 450 }
];

// Home route
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to Lab 3 REST API'
    });
});

// GET all books with search, sorting, pagination and price filter
app.get('/books', (req, res) => {
    let {
        search_q = '',
        order_by = 'id',
        order = 'ASC',
        limit = '10',
        offset = '0',
        min_price,
        max_price
    } = req.query;

    let result = [...books];

    // Search by title
    if (search_q) {
        result = result.filter(book =>
            book.title.toLowerCase().includes(search_q.toLowerCase())
        );
    }

    // Price range filter
    if (min_price !== undefined) {
        result = result.filter(book => book.price >= Number(min_price));
    }

    if (max_price !== undefined) {
        result = result.filter(book => book.price <= Number(max_price));
    }

    // Validate sorting
    const allowedFields = ['id', 'title', 'author', 'price'];

    if (!allowedFields.includes(order_by)) {
        return res.status(400).json({
            message: 'Invalid order_by field'
        });
    }

    if (!['ASC', 'DESC'].includes(order.toUpperCase())) {
        return res.status(400).json({
            message: 'Order must be ASC or DESC'
        });
    }

    // Sorting
    result.sort((a, b) => {
        let x = a[order_by];
        let y = b[order_by];

        if (typeof x === 'string') {
            x = x.toLowerCase();
            y = y.toLowerCase();
        }

        if (x < y) return order.toUpperCase() === 'ASC' ? -1 : 1;
        if (x > y) return order.toUpperCase() === 'ASC' ? 1 : -1;
        return 0;
    });

    // Pagination validation
    const limitNum = Number(limit);
    const offsetNum = Number(offset);

    if (!Number.isInteger(limitNum) || limitNum <= 0 ||
        !Number.isInteger(offsetNum) || offsetNum < 0) {
        return res.status(400).json({
            message: 'Invalid limit or offset'
        });
    }

    result = result.slice(offsetNum, offsetNum + limitNum);

    res.status(200).json(result);
});

// GET book by ID
app.get('/books/:id', (req, res) => {
    const id = Number(req.params.id);
    const book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).json({
            message: 'Book not found'
        });
    }

    res.status(200).json(book);
});

// POST create book
app.post('/books', (req, res) => {
    const { title, author, price } = req.body;

    if (
        typeof title !== 'string' || !title.trim() ||
        typeof author !== 'string' || !author.trim() ||
        price === undefined || price === null ||
        typeof price !== 'number' || !Number.isFinite(price)
    ) {
        return res.status(400).json({
            message: 'Title, author and valid numeric price are required'
        });
    }

    const newBook = {
        id: books.length > 0
            ? Math.max(...books.map(b => b.id)) + 1
            : 1,
        title: title.trim(),
        author: author.trim(),
        price
    };

    books.push(newBook);

    res.status(201).json({
        message: 'Book created successfully',
        book: newBook
    });
});

// PUT update book
app.put('/books/:id', (req, res) => {
    const id = Number(req.params.id);
    const book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).json({
            message: 'Book not found'
        });
    }

    const { title, author, price } = req.body;

    if (
        typeof title !== 'string' || !title.trim() ||
        typeof author !== 'string' || !author.trim() ||
        price === undefined || price === null ||
        typeof price !== 'number' || !Number.isFinite(price)
    ) {
        return res.status(400).json({
            message: 'Title, author and valid numeric price are required'
        });
    }

    book.title = title.trim();
    book.author = author.trim();
    book.price = price;

    res.status(200).json({
        message: 'Book updated successfully',
        book
    });
});

// DELETE book
app.delete('/books/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = books.findIndex(b => b.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: 'Book not found'
        });
    }

    books.splice(index, 1);

    res.status(200).json({
        message: 'Book deleted successfully'
    });
});

// Server
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

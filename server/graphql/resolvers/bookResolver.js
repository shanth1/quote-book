module.exports = {
    Query: {
        getAllBooks: async (_, {}, { Book }) => {
            const books = await Book.find();
            return books;
        },
        getBook: async (_, { bookArgs }, { Book }) => {
            const { bookId } = bookArgs;
            return await Book.find(bookId);
        },
    },
    Mutation: {
        addBook: async (_, { userArgs }, { User }) => {
            const {
                title,
                authors,
                year,
                pages,
                image,
                file,
                mainIdea,
                description,
                genres,
                tags,
                private,
                rating,
                userId,
            } = userArgs;
            const newBook = new Book({
                title,
                authors,
                year,
                pages,
                image,
                file,
                mainIdea,
                description,
                genres,
                tags,
                private,
                rating,
                userId,
            });

            return newBook.save();
        },

        deleteBook: async (_, { bookArgs }, { Book }) => {
            const { bookId } = bookArgs;
            Book.find({ bookId }).then((books) => {
                books.forEach((book) => {
                    book.deleteOne();
                });
            });

            return Book.findByIdAndRemove(bookId);
        },
    },
};

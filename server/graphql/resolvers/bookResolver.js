module.exports = {
    Query: {
        getAllBooks: async (_, {}, { Book }) => {
            const books = await Book.find();
            return books;
        },
        getBook: async (_, { bookId }, { Book }) => {
            return await Book.findById(bookId);
        },
    },
    Book: {
        quotes: async (parent, _, { Quote }) => {
            return await Quote.find({ bookId: parent.id });
        },
        user: async ({ userId }, _, { User }) => {
            return User.findById(userId);
        },
    },
    Mutation: {
        addBook: async (_, { book }, { User, Book }) => {
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
            } = book;
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

        deleteBook: async (_, { bookId }, { Book, Quote }) => {
            Quote.find({ bookId }).then((quote) => {
                quote.forEach((quote) => {
                    quote.deleteOne();
                });
            });

            return Book.findByIdAndRemove(bookId);
        },
    },
};

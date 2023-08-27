const { gql } = require("apollo-server-express");

gql`
    type Box {
        id: ID!
        title: String!
        authors: [String!]!
        year: String
        image: String
        mainIdea: String
        description: String
        genres: [String]
        tags: [String]
        createdAt: String!
        type: String!
        updatedAt: String!
        isPrivate: Boolean!
        rating: Int
        quotes: [Quote]
        user: User
        quoteCounter: Int
    }
`;

module.exports = [
    {
        id: "1",
        title: "Наедине с собой",
        authors: ["Марк Аврелий"],
        year: "II",
        image: "https://aif-s3.aif.ru/images/023/499/bbc4015d47166a5245d2cb78d05df2b9.jpg",
        mainIdea: "",
        description: "",
        genres: ["Эссе", "Саморазвитие"],
        tags: ["Personal", "Ideas"],
        createdAt: "1693070015066",
        type: "Book",
        updatedAt: "1693070015066",
        isPrivate: false,
        rating: 4,
        quoteCounter: 0,
    },
    {
        id: "2",
        title: "Револьвер",
        authors: ["Гай Ричи"],
        year: "2005",
        image: "https://www.film.ru/sites/default/files/styles/thumb_1024x450/public/filefield_paths/revolver-on-showmax.jpeg",
        mainIdea: "",
        description: "",
        genres: ["Боевик", "Триллер", "Драма"],
        tags: ["Personal", "Ideas", "Images", "Other"],
        createdAt: "1693070557992",
        type: "Movie",
        updatedAt: "1693070557992",
        isPrivate: false,
        rating: 0,
        quoteCounter: 0,
    },
];

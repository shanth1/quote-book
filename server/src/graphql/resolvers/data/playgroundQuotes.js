const { gql } = require("apollo-server-express");

gql`
    type Quote {
        id: ID!
        header: String
        text: String!
        createdAt: String!
        updatedAt: String!
        marker: String
        tags: [String]
        isPrivate: Boolean!
        user: User!
        box: Box!
    }
`;

module.exports = [
    [
        {
            id: "1",
            box: {
                id: "1",
                title: "Наедине с собой",
            },
            header: "Заголовок 1",
            text: "Text of quote",
            createdAt: "1693070557992",
            updatedAt: "1693070557992",
            marker: "123 page",
            tags: ["[String]"],
            isPrivate: true,
        },
        {
            id: "1",
            box: {
                id: "1",
                title: "Наедине с собой",
            },
            header: "Заголовок 1",
            text: "Text of quote",
            createdAt: "1693070557992",
            updatedAt: "1693070557992",
            marker: "123 page",
            tags: ["[String]"],
            isPrivate: true,
        },
    ],
    [
        {
            id: "1",
            box: {
                id: "2",
                title: "Револьвер",
            },
            header: "Заголовок 2",
            text: "Text of quote 2",
            createdAt: "1693070557992!",
            updatedAt: "1693070557992",
            marker: "12222222 page",
            tags: ["[String]"],
            isPrivate: true,
        },
    ],
];

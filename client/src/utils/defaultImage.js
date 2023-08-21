import Book from "../assets/Book.webp";
import Movie from "../assets/Movie.webp";
import Person from "../assets/Person.webp";
import Music from "../assets/Music.webp";
import Other from "../assets/Other.webp";

export const getDefaultImageFromType = (type) => {
    switch (type) {
        case "Book":
            return Book;
        case "Movie":
            return Movie;
        case "Person":
            return Person;
        case "Music":
            return Music;
        case "Other":
            return Other;
        default:
            return "";
    }
};

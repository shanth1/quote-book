export const getBoxPlaceholders = (type) => {
    switch (type) {
        case "Book":
            return {
                title: "Dandelion Wine",
                authors: "Ray Bradbury",
                year: "1957",
                genres: "Novel, Fantasy",
                mainIdea: "Add main idea of book",
                description: "Add description of book",
                image: "https://book-covers/image1",
            };
        case "Movie":
            return {
                title: "No Country for Old Men",
                authors: "Joel Coen, Ethan Coen",
                year: "2007",
                genres: "Crime, Drama, Thriller",
                mainIdea: "Add main idea of movie",
                description: "Add description of movie",
                image: "https://film-covers/image1",
            };
        case "Person":
            return {
                title: "Marcus Aurelius",
                authors: "",
                year: "II",
                genres: "Emperor, Philosopher",
                mainIdea: "Add main idea of this person",
                description: "Add description of person",
                image: "https://photos/Marcus-Aurelius",
            };
        case "Music":
            return {
                title: "The Dark Side of the Moon",
                authors: "Pink Floyd",
                year: "1973",
                genres: "Progressive rock, Psychedelic rock",
                mainIdea: "Add main idea of music",
                description: "Add description of music",
                image: "https://music-covers/image1",
            };
        case "Other":
            return {
                title: "Enter title of box",
                authors: "Enter authors of box",
                year: "Enter a year",
                genres: "Enter genres",
                mainIdea: "Add main idea of box",
                description: "Add description of box",
                image: "Enter the url of preview image",
            };
        default:
            return {
                title: "",
                authors: "",
                year: "",
                genres: "",
                mainIdea: "",
                description: "",
                image: "",
            };
    }
};

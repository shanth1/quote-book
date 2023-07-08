module.exports = {
    Query: {
        getAllBoxes: async (_, {}, { Box }) => {
            const boxes = await Box.find();
            return boxes;
        },
        getBox: async (_, { boxId }, { Box }) => {
            return await Box.findById(boxId);
        },
    },
    Box: {
        quotes: async (parent, _, { Quote }) => {
            return await Quote.find({ boxId: parent.id });
        },
        user: async ({ userId }, _, { User }) => {
            return User.findById(userId);
        },
    },
    Mutation: {
        addBox: async (_, { box }, { Box }) => {
            const {
                title,
                authors,
                year,
                image,
                file,
                mainIdea,
                description,
                genres,
                type,
                tags,
                isPrivate,
                rating,
                userId,
            } = box;
            const newBox = new Box({
                title,
                authors,
                year,
                image,
                file,
                mainIdea,
                description,
                genres,
                type,
                tags,
                isPrivate,
                rating,
                userId,
            });

            return newBox.save();
        },

        deleteBox: async (_, { boxId }, { Box, Quote }) => {
            Quote.find({ boxId }).then((quote) => {
                quote.forEach((quote) => {
                    quote.deleteOne();
                });
            });

            return Box.findByIdAndRemove(boxId);
        },
    },
};

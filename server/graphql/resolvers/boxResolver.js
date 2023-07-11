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
            const newBox = await new Box(box);
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

        updateBox: async (_, { boxId, newBox }, { Box }) => {
            const updatedBox = await Box.findByIdAndUpdate(boxId, newBox, {
                new: true,
            });
            return updatedBox;
        },
    },
};

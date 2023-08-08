const { ApolloError } = require("apollo-server-express");

module.exports = {
    Query: {
        getAllBoxes: async (_, {}, { Box, isAuth }) => {
            const boxes = await Box.find();
            return boxes;
        },
        getBox: async (_, { boxId }, { Box, isAuth }) => {
            if (!isAuth) {
                throw new ApolloError("Auth error");
            }
            return await Box.findById(boxId);
        },
    },
    Box: {
        quotes: async (parent, _, { Quote, isAuth }) => {
            return await Quote.find({ boxId: parent.id });
        },
        user: async ({ userId }, _, { User, isAuth }) => {
            return User.findById(userId);
        },
    },
    Mutation: {
        addBox: async (_, { box }, { Box, isAuth }) => {
            if (!isAuth) {
                throw new ApolloError("Auth error");
            }
            const newBox = await new Box(box);
            return newBox.save();
        },

        deleteBox: async (_, { boxId }, { Box, Quote, isAuth }) => {
            if (!isAuth) {
                throw new ApolloError("Auth error");
            }
            Quote.find({ boxId }).then((quote) => {
                quote.forEach((quote) => {
                    quote.deleteOne();
                });
            });

            return Box.findByIdAndRemove(boxId);
        },

        updateBox: async (_, { boxId, newBox }, { Box, isAuth }) => {
            if (!isAuth) {
                throw new ApolloError("Auth error");
            }
            const updatedBox = await Box.findByIdAndUpdate(boxId, newBox, {
                new: true,
            });
            return updatedBox;
        },
    },
};

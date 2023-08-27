import { useContext, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import Button from "../../shared/Button/Button";
import { useForm } from "../../hooks/formHook";
import { ADD_BOX } from "../../graphql/mutation";
import { getArrayFromString } from "../../utils/stringToArray";
import { validateForm } from "../../utils/validateForm";
import { AuthContext } from "../../context/AuthContext";
import { GET_USER_BOXES, GET_USER_TITLES } from "../../graphql/queries";
import { BoxForm } from "../../entities/BoxForm/BoxForm";
import { getDefaultImageFromType } from "../../utils/defaultImage";
import { playgroundCallback } from "../../utils/playgroundCallback";

export const AddBox = ({ closeCallback }) => {
    const { userId, logout } = useContext(AuthContext);

    const { data } = useQuery(GET_USER_TITLES, {
        variables: { userId: userId },
    });
    const boxes = [];
    data?.getUser?.boxes.forEach((box) => {
        boxes.push(box.title.toLowerCase());
    });

    const addBox = () => {
        addBoxMutation().catch((e) => logout());
        closeCallback();
    };
    const typeStore = useState("Book");
    const privateStore = useState(true);
    const ratingStore = useState();
    const tagsStore = useState();

    const [onChange, onSubmit, values] = useForm(addBox, {
        title: "",
        authors: "",
        year: "",
        mainIdea: "",
        description: "",
        genres: "",
        image: "",
    });

    const [addBoxMutation] = useMutation(ADD_BOX, {
        variables: {
            box: {
                userId: userId,
                title: values.title,
                type: typeStore[0],
                authors:
                    typeStore[0] !== "Person"
                        ? getArrayFromString(values.authors)
                        : [],
                year: values.year,
                genres: getArrayFromString(values.genres),
                tags: tagsStore[0],
                mainIdea: values.mainIdea,
                description: values.description,
                isPrivate: privateStore[0],
                rating: Number(ratingStore[0]),
                image: values.image
                    ? values.image
                    : getDefaultImageFromType(typeStore[0]),
            },
        },
        refetchQueries: [GET_USER_BOXES],
    });

    const errors = [];
    const requiredError = !validateForm([values.title]);
    const uniqueError = boxes.includes(values.title.toLowerCase());
    if (requiredError) errors.push("Title field is empty");
    if (uniqueError) errors.push("Title already exists");

    return (
        <BoxForm
            header="Add Box"
            typeStore={typeStore}
            privateStore={privateStore}
            ratingStore={ratingStore}
            tagsStore={tagsStore}
            values={values}
            onChange={onChange}
            errors={errors}
        >
            <Button
                onClick={userId ? onSubmit : playgroundCallback}
                isActive={!requiredError && !uniqueError}
            >
                Add box
            </Button>
        </BoxForm>
    );
};

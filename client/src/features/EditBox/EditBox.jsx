import { useContext, useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import Button from "../../shared/Button/Button";
import { validateForm } from "../../utils/validateForm";
import { UPDATE_BOX } from "../../graphql/mutation";
import { isEqualObject } from "../../utils/compareObjects";
import { getArrayFromString } from "../../utils/stringToArray";
import { AuthContext } from "../../context/AuthContext";
import { GET_USER_BOXES } from "../../graphql/queries";
import { BoxForm } from "../../entities/BoxForm/BoxForm";
import { useForm } from "../../hooks/formHook";

const EditBox = ({ boxData, closeCallback }) => {
    const { userId, logout } = useContext(AuthContext);

    const editBox = () => {
        updateBoxMutation().catch((e) => logout());
        closeCallback();
    };

    const [oldValues, setOldValues] = useState({});
    useEffect(() => {
        setOldValues({
            rating: boxData.rating ? String(boxData.rating) : "",
            isPrivate: boxData.isPrivate,
            type: boxData.type,
            title: boxData.title,
            authors: boxData.authors ? boxData.authors.join(", ") : "",
            year: boxData.year ? String(boxData.year) : "",
            mainIdea: boxData.mainIdea,
            description: boxData.description,
            genres: boxData.genres ? boxData.genres.join(", ") : "",
            tags: boxData.tags ? boxData.tags.join(", ") : "",
            image: boxData.image,
        });
    }, [boxData]);

    const typeStore = useState(boxData.type);
    const privateStore = useState(boxData.isPrivate);
    const ratingStore = useState(boxData.rating ? String(boxData.rating) : "");
    const tagsStore = useState(boxData.tags);
    const [onChange, onSubmit, values] = useForm(editBox, {
        title: boxData.title,
        authors: boxData.authors.join(", "),
        year: boxData.year,
        mainIdea: boxData.mainIdea,
        description: boxData.description,
        genres: boxData.genres.join(", "),
        image: boxData.image,
    });

    const [updateBoxMutation] = useMutation(UPDATE_BOX, {
        variables: {
            boxId: boxData.id,
            newBox: {
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
                image: values.image ? values.image : undefined,
            },
        },
        refetchQueries: [GET_USER_BOXES],
    });

    return (
        <BoxForm
            header="Edit box"
            typeStore={typeStore}
            privateStore={privateStore}
            ratingStore={ratingStore}
            tagsStore={tagsStore}
            values={values}
            onChange={onChange}
        >
            <Button
                onClick={onSubmit}
                isActive={
                    validateForm([values.title]) &&
                    !isEqualObject(oldValues, {
                        rating: ratingStore[0] || "",
                        isPrivate: privateStore[0],
                        type: typeStore[0],
                        title: values.title,
                        authors: values.authors,
                        year: values.year || "",
                        mainIdea: values.mainIdea,
                        description: values.description,
                        genres: values.genres,
                        tags: tagsStore[0] ? tagsStore[0].join(", ") : "",
                        image: values.image,
                    })
                }
            >
                Update box
            </Button>
        </BoxForm>
    );
};

export { EditBox };

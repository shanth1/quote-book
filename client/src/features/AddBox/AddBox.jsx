import { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import Button from "../../shared/Button/Button";
import { useForm } from "../../hooks/formHook";
import { ADD_BOX } from "../../graphql/mutation";
import { getArrayFromString } from "../../utils/stringToArray";
import { validateForm } from "../../utils/validateForm";
import { AuthContext } from "../../context/AuthContext";
import { GET_USER_BOXES } from "../../graphql/queries";
import { BoxForm } from "../../entities/BoxForm/BoxForm";

export const AddBox = ({ closeCallback }) => {
    const { userId, logout } = useContext(AuthContext);

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
                authors: getArrayFromString(values.authors),
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
            header="Add Box"
            typeStore={typeStore}
            privateStore={privateStore}
            ratingStore={ratingStore}
            tagsStore={tagsStore}
            values={values}
            onChange={onChange}
        >
            <Button onClick={onSubmit} isActive={validateForm([values.title])}>
                Add box
            </Button>
        </BoxForm>
    );
};

import { useContext, useEffect, useState } from "react";
import Button from "../../shared/Button/Button";
import Input from "../../shared/Input/Input";
import { useForm } from "../../hooks/formHook";
import Label from "../../shared/Label/Label";
import SelectFrom from "../../shared/SelectForm/SelectForm";
import { useMutation } from "@apollo/client";
import { AuthContext } from "../../context/AuthContext";
import { GET_BOOKS } from "../../graphql/queries";
import { ADD_BOX } from "../../graphql/mutation";
import H1 from "../../shared/H1/H1";
import { stringToArray } from "../../utils/stringToArray";
import Content from "../../shared/Content/Content";
import Required from "../../shared/Required/Required";
import { validateForm } from "../../utils/validateForm";

export const AddBox = ({ closeCallback }) => {
    const addBox = () => {
        addBoxMutation();
        closeCallback();
    };

    const {
        auth: {
            user: { id },
        },
    } = useContext(AuthContext);
    const [type, setType] = useState("Book");
    const [isPrivate, setPrivateStatus] = useState(true);
    const [rating, setRating] = useState("");

    const [onChange, onSubmit, values] = useForm(addBox, {
        title: "",
        ratings: "",
        authors: "",
        year: "",
        mainIdea: "",
        description: "",
        genres: "",
        tags: "",
        image: "",
    });

    const [validStatus, setValidStatus] = useState(
        validateForm([values.title, values.image]),
    );
    useEffect(() => {
        setValidStatus(validateForm([values.title]));
    }, [values.title]);

    const [addBoxMutation] = useMutation(ADD_BOX, {
        variables: {
            box: {
                userId: id,
                title: values.title,
                type: type,
                authors: stringToArray(values.authors),
                year: Number(values.year),
                genres: stringToArray(values.genres),
                tags: stringToArray(values.tags),
                mainIdea: values.mainIdea,
                description: values.description,
                isPrivate: isPrivate,
                rating: Number(rating),
                image: values.image ? values.image : undefined,
            },
        },
        refetchQueries: [GET_BOOKS],
    });

    return (
        <form>
            <Content>
                <H1>Add box</H1>
                <SelectFrom
                    names={["Book", "Movie", "Person", "Other"]}
                    selected={type}
                    setSelected={setType}
                />
                <div className="w-full flex gap-4">
                    <div className="w-full">
                        <Label>
                            <Required>Title</Required>
                        </Label>
                        <Input
                            name="title"
                            placeholder="Enter title of box"
                            onChange={onChange}
                        />
                    </div>
                    <div className="w-52">
                        <Label>Rating</Label>
                        <select
                            onChange={(event) => setRating(event.target.value)}
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option value="">-</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </div>
                <div className="w-full flex gap-4">
                    <div className="w-full">
                        <Label>Authors</Label>
                        <Input
                            name="authors"
                            placeholder="Biba, Boba"
                            onChange={onChange}
                        />
                    </div>
                    <div className="w-52">
                        <Label>Year</Label>
                        <Input
                            name="year"
                            placeholder="2023"
                            onChange={onChange}
                        />
                    </div>
                </div>

                <div>
                    <Label>Main idea</Label>
                    <Input
                        name="mainIdea"
                        placeholder="Add main idea of box"
                        onChange={onChange}
                    />
                </div>
                <div>
                    <Label>Description</Label>
                    <Input
                        name="description"
                        placeholder="Add description"
                        onChange={onChange}
                    />
                </div>
                <div className="w-full flex gap-4">
                    <div className="w-full">
                        <Label>Genres</Label>
                        <Input
                            name="genres"
                            placeholder="Drama, Comedy"
                            onChange={onChange}
                        />
                    </div>
                    <div className="w-full">
                        <Label>Tags</Label>
                        <Input
                            name="tags"
                            placeholder="Work"
                            onChange={onChange}
                        />
                    </div>
                </div>
                <div className="w-50">
                    <Label>Image (URL)</Label>
                    <Input
                        name="image"
                        placeholder="https://www.images.com/image1"
                        onChange={onChange}
                    />
                </div>
                <div className="w-full flex gap-4">
                    <div className="w-full flex justify-center items-center">
                        <input
                            id="default-checkbox"
                            type="checkbox"
                            checked={isPrivate}
                            onChange={() => setPrivateStatus(!isPrivate)}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                            for="default-checkbox"
                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            Private
                        </label>
                    </div>
                    <div className="w-full">
                        <Button onClick={onSubmit} isActive={validStatus}>
                            Add box
                        </Button>
                    </div>
                </div>
            </Content>
        </form>
    );
};

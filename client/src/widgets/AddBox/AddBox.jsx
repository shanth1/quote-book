import { useContext, useState } from "react";
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
        <div>
            <form className="space-y-4 md:space-y-6" action="#">
                <H1 text="Add item" />
                <SelectFrom
                    names={["Book", "Movie", "Person", "Other"]}
                    selected={type}
                    setSelected={setType}
                />
                <div className="w-full flex gap-4">
                    <div className="w-full">
                        <Label text="Title" />
                        <Input
                            name="title"
                            placeholder="Enter title of box"
                            onChange={onChange}
                        />
                    </div>
                    <div className="w-52">
                        <Label text="Rating" />
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
                        <Label text="Authors" />
                        <Input
                            name="authors"
                            placeholder="Biba, Boba"
                            onChange={onChange}
                        />
                    </div>
                    <div className="w-52">
                        <Label text="Year" />
                        <Input
                            name="year"
                            placeholder="2023"
                            onChange={onChange}
                        />
                    </div>
                </div>

                <div>
                    <Label text="Main idea" />
                    <Input
                        name="mainIdea"
                        placeholder="Add main idea of box"
                        onChange={onChange}
                    />
                </div>
                <div>
                    <Label text="Description" />
                    <Input
                        name="description"
                        placeholder="Add description"
                        onChange={onChange}
                    />
                </div>
                <div className="w-full flex gap-4">
                    <div className="w-full">
                        <Label text="Genres" />
                        <Input
                            name="genres"
                            placeholder="Drama, Comedy"
                            onChange={onChange}
                        />
                    </div>
                    <div className="w-full">
                        <Label text="Tags" />
                        <Input
                            name="tags"
                            placeholder="Work"
                            onChange={onChange}
                        />
                    </div>
                </div>
                <div className="w-50">
                    <Label text="Image (URL)" />
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
                        <Button text="Add box" onClick={onSubmit} />
                    </div>
                </div>
            </form>
        </div>
    );
};

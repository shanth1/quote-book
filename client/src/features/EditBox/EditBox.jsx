import { useContext, useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import Button from "../../shared/Button/Button";
import H1 from "../../shared/H1/H1";
import Input from "../../shared/Input/Input";
import Label from "../../shared/Label/Label";
import Required from "../../shared/Required/Required";
import Content from "../../shared/Content/Content";
import SelectFrom from "../../shared/SelectForm/SelectForm";
import { validateForm } from "../../utils/validateForm";
import { UPDATE_BOX } from "../../graphql/mutation";
import { GET_BOXES } from "../../graphql/queries";
import { isEqualObject } from "../../utils/compareObjects";
import { stringToArray } from "../../utils/stringToArray";
import { AuthContext } from "../../context/AuthContext";

const EditBox = ({ userId, boxData, closeCallback }) => {
    const { logout } = useContext(AuthContext);

    const [oldValues, setOldValues] = useState({});
    useEffect(() => {
        setOldValues({
            rating: boxData.rating ? String(boxData.rating) : "",
            isPrivate: boxData.isPrivate,
            type: boxData.type,
            title: boxData.title,
            authors: boxData.authors ? boxData.authors.join(", ") : "",
            year: boxData.year ? boxData.year : "",
            mainIdea: boxData.mainIdea,
            description: boxData.description,
            genres: boxData.genres ? boxData.genres.join(", ") : "",
            tags: boxData.tags ? boxData.tags.join(", ") : "",
            image: boxData.image,
        });
    }, [boxData]);

    const [type, setType] = useState("");
    const [isPrivate, setPrivateStatus] = useState(true);
    const [rating, setRating] = useState("");
    const [form, setForm] = useState({});
    useEffect(() => {
        setType(boxData.type);
        setPrivateStatus(boxData.isPrivate);
        setRating(boxData.rating ? boxData.rating : "");
        setForm({
            title: boxData.title,
            authors: boxData.authors ? boxData.authors.join(", ") : "",
            year: boxData.year ? boxData.year : "",
            mainIdea: boxData.mainIdea,
            description: boxData.description,
            genres: boxData.genres ? boxData.genres.join(", ") : "",
            tags: boxData.tags ? boxData.tags.join(", ") : "",
            image: boxData.image,
        });
    }, [boxData]);

    const onChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };
    const onSubmit = (event) => {
        event.preventDefault();
        updateBoxMutation().catch((e) => logout());
        closeCallback();
    };

    const [updateBoxMutation] = useMutation(UPDATE_BOX, {
        variables: {
            boxId: boxData.id,
            newBox: {
                userId: userId,
                title: form.title,
                type: type,
                authors: stringToArray(form.authors),
                year: Number(form.year),
                genres: stringToArray(form.genres),
                tags: stringToArray(form.tags),
                mainIdea: form.mainIdea,
                description: form.description,
                isPrivate: isPrivate,
                rating: Number(rating),
                image: form.image ? form.image : undefined,
            },
        },
        refetchQueries: [GET_BOXES],
    });

    return (
        <form>
            <Content>
                <H1>Edit box</H1>
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
                            value={form.title}
                            placeholder="Enter title of box"
                            onChange={onChange}
                            autoFocus={true}
                        />
                    </div>
                    <div className="w-52">
                        <Label>Rating</Label>
                        <select
                            value={rating}
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
                            value={form.authors}
                            placeholder="Biba, Boba"
                            onChange={onChange}
                        />
                    </div>
                    <div className="w-52">
                        <Label>Year</Label>
                        <Input
                            name="year"
                            value={form.year}
                            placeholder="2023"
                            onChange={onChange}
                        />
                    </div>
                </div>

                <div>
                    <Label>Main idea</Label>
                    <Input
                        name="mainIdea"
                        value={form.mainIdea}
                        placeholder="Add main idea of box"
                        onChange={onChange}
                    />
                </div>
                <div>
                    <Label>Description</Label>
                    <Input
                        name="description"
                        value={form.description}
                        placeholder="Add description"
                        onChange={onChange}
                    />
                </div>
                <div className="w-full flex gap-4">
                    <div className="w-full">
                        <Label>Genres</Label>
                        <Input
                            name="genres"
                            value={form.genres}
                            placeholder="Drama, Comedy"
                            onChange={onChange}
                        />
                    </div>
                    <div className="w-full">
                        <Label>Tags</Label>
                        <Input
                            name="tags"
                            value={form.tags}
                            placeholder="Work"
                            onChange={onChange}
                        />
                    </div>
                </div>
                <div className="w-50">
                    <Label>Image (URL)</Label>
                    <Input
                        name="image"
                        value={form.image}
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
                        <Button
                            onClick={onSubmit}
                            isActive={
                                validateForm([form.title]) &&
                                !isEqualObject(
                                    { ...form, type, rating, isPrivate },
                                    oldValues,
                                )
                            }
                        >
                            Update box
                        </Button>
                    </div>
                </div>
            </Content>
        </form>
    );
};

export { EditBox };

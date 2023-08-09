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
import { isEqualObject } from "../../utils/compareObjects";
import { stringToArray } from "../../utils/stringToArray";
import { AuthContext } from "../../context/AuthContext";
import { GET_USER_BOXES } from "../../graphql/queries";
import { getBoxPlaceholders } from "../../utils/boxPlaceholders";

const EditBox = ({ boxData, closeCallback }) => {
    const { userId, logout } = useContext(AuthContext);

    const [oldValues, setOldValues] = useState({});
    useEffect(() => {
        setOldValues({
            rating: boxData.rating ? boxData.rating : "",
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
        refetchQueries: [GET_USER_BOXES],
    });

    return (
        <form>
            <Content>
                <H1>Edit box</H1>
                <SelectFrom
                    names={["Book", "Movie", "Person", "Music", "Other"]}
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
                            placeholder={getBoxPlaceholders(type).title}
                            onChange={onChange}
                            autoFocus={true}
                        />
                    </div>
                    <div className="w-52">
                        <Label>Rating</Label>
                        <select
                            value={rating}
                            onChange={(event) => setRating(event.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                        <Label isActive={type !== "Person"}>Authors</Label>
                        <Input
                            name="authors"
                            value={form.authors}
                            placeholder={getBoxPlaceholders(type).authors}
                            onChange={onChange}
                            disabled={type === "Person"}
                        />
                    </div>
                    <div className="w-52">
                        <Label>{type === "Person" ? "Century" : "Year"}</Label>
                        <Input
                            name="year"
                            value={form.year}
                            placeholder={getBoxPlaceholders(type).year}
                            onChange={onChange}
                        />
                    </div>
                </div>

                <div>
                    <Label>Main idea</Label>
                    <Input
                        name="mainIdea"
                        value={form.mainIdea}
                        placeholder={getBoxPlaceholders(type).mainIdea}
                        onChange={onChange}
                    />
                </div>
                <div>
                    <Label>Description</Label>
                    <Input
                        name="description"
                        value={form.description}
                        placeholder={getBoxPlaceholders(type).description}
                        onChange={onChange}
                    />
                </div>
                <div className="w-full flex gap-4">
                    <div className="w-full">
                        <Label>
                            {type === "Person" ? "Activity" : "Genres"}
                        </Label>
                        <Input
                            name="genres"
                            value={form.genres}
                            placeholder={getBoxPlaceholders(type).genres}
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
                        placeholder={getBoxPlaceholders(type).image}
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
                        <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
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

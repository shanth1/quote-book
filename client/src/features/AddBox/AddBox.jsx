import { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import H1 from "../../shared/H1/H1";
import Button from "../../shared/Button/Button";
import Label from "../../shared/Label/Label";
import Input from "../../shared/Input/Input";
import SelectFrom from "../../shared/SelectForm/SelectForm";
import Content from "../../shared/Content/Content";
import Required from "../../shared/Required/Required";
import { useForm } from "../../hooks/formHook";
import { ADD_BOX } from "../../graphql/mutation";
import { stringToArray } from "../../utils/stringToArray";
import { validateForm } from "../../utils/validateForm";
import { AuthContext } from "../../context/AuthContext";
import { GET_USER_BOXES } from "../../graphql/queries";
import { getBoxPlaceholders } from "../../utils/boxPlaceholders";
import { MultipleSelect } from "../../shared/MultipleSelect/MultipleSelect";
import { SingleSelect } from "../../shared/SingleSelect/SingleSelect";
import { Switch } from "../../shared/Switch/Switch";

export const AddBox = ({ closeCallback }) => {
    const { userId, logout } = useContext(AuthContext);

    const addBox = () => {
        addBoxMutation().catch((e) => logout());
        closeCallback();
    };
    const [type, setType] = useState("Book");
    const [isPrivate, setPrivateStatus] = useState(true);
    const [rating, setRating] = useState();
    const ratingOptions = [
        { value: "1", label: "★☆☆☆☆" },
        { value: "2", label: "★★☆☆☆" },
        { value: "3", label: "★★★☆☆" },
        { value: "4", label: "★★★★☆" },
        { value: "5", label: "★★★★★" },
    ];

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
                userId: userId,
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
        refetchQueries: [GET_USER_BOXES],
    });

    const [tags, setTags] = useState();
    const tagsOptions = [
        {
            label: "Mammal",
            options: [
                { value: "Dolphin", label: "🐬 Dolphin" },
                { value: "Giraffe", label: "🦒 Giraffe" },
            ],
        },
        { value: "fox", label: "🦊 Fox" },
        { value: "Butterfly", label: "🦋 Butterfly" },
        { value: "Honeybee", label: "🐝 Honeybee" },
    ];

    return (
        <form>
            <Content>
                <H1>Add box</H1>
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
                            placeholder={getBoxPlaceholders(type).title}
                            onChange={onChange}
                            autoFocus={true}
                        />
                    </div>
                    <div className="w-64">
                        <Label>Rating</Label>
                        <SingleSelect
                            options={ratingOptions}
                            state={rating}
                            setState={setRating}
                        />
                    </div>
                </div>
                <div className="w-full flex gap-4">
                    <div className="w-full">
                        <Label isActive={type !== "Person"}>Authors</Label>
                        <Input
                            name="authors"
                            placeholder={getBoxPlaceholders(type).authors}
                            onChange={onChange}
                            disabled={type === "Person"}
                        />
                    </div>
                    <div className="w-64">
                        <Label>{type === "Person" ? "Century" : "Year"}</Label>
                        <Input
                            name="year"
                            placeholder={getBoxPlaceholders(type).year}
                            onChange={onChange}
                        />
                    </div>
                </div>
                <div>
                    <Label>Tags</Label>
                    <MultipleSelect
                        options={tagsOptions}
                        state={tags}
                        setState={setTags}
                    />
                </div>

                <div>
                    <Label>Main idea</Label>
                    <Input
                        name="mainIdea"
                        placeholder={getBoxPlaceholders(type).mainIdea}
                        onChange={onChange}
                    />
                </div>
                <div>
                    <Label>Description</Label>
                    <Input
                        name="description"
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
                            placeholder={getBoxPlaceholders(type).genres}
                            onChange={onChange}
                        />
                    </div>
                    <div className="w-full">
                        <Label>Image (URL)</Label>
                        <Input
                            name="image"
                            placeholder={getBoxPlaceholders(type).image}
                            onChange={onChange}
                        />
                    </div>
                </div>
                <div className="w-full flex gap-4">
                    <div className="w-full flex justify-center items-center">
                        <Switch state={isPrivate} setState={setPrivateStatus} />
                        <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Private
                        </label>
                    </div>
                    <div className="w-full">
                        <Button
                            onClick={onSubmit}
                            isActive={validateForm([values.title])}
                        >
                            Add box
                        </Button>
                    </div>
                </div>
            </Content>
        </form>
    );
};

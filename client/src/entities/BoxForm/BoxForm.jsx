import Content from "../../shared/Content/Content";
import H1 from "../../shared/H1/H1";
import Input from "../../shared/Input/Input";
import Label from "../../shared/Label/Label";
import { MultipleSelect } from "../../shared/MultipleSelect/MultipleSelect";
import Required from "../../shared/Required/Required";
import SelectFrom from "../../shared/SelectForm/SelectForm";
import { SingleSelect } from "../../shared/SingleSelect/SingleSelect";
import { Switch } from "../../shared/Switch/Switch";
import { getBoxPlaceholders } from "./utils/boxPlaceholders";

const ratingOptions = [
    { value: "1", label: "★☆☆☆☆" },
    { value: "2", label: "★★☆☆☆" },
    { value: "3", label: "★★★☆☆" },
    { value: "4", label: "★★★★☆" },
    { value: "5", label: "★★★★★" },
];

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

export const BoxForm = ({
    header,
    children,
    typeStore,
    privateStore,
    ratingStore,
    tagsStore,
    values,
    onChange,
}) => {
    const [type, setType] = typeStore;
    const [privateStatus, setPrivateStatus] = privateStore;
    const [rating, setRating] = ratingStore;
    const [tags, setTags] = tagsStore;

    return (
        <form>
            <Content>
                <H1>{header}</H1>
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
                            value={values?.title}
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
                            value={values?.authors}
                            placeholder={getBoxPlaceholders(type).authors}
                            onChange={onChange}
                            disabled={type === "Person"}
                        />
                    </div>
                    <div className="w-64">
                        <Label>{type === "Person" ? "Century" : "Year"}</Label>
                        <Input
                            name="year"
                            value={values?.year}
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
                        value={values?.mainIdea}
                        placeholder={getBoxPlaceholders(type).mainIdea}
                        onChange={onChange}
                    />
                </div>
                <div>
                    <Label>Description</Label>
                    <Input
                        name="description"
                        value={values?.description}
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
                            value={values?.genres}
                            placeholder={getBoxPlaceholders(type).genres}
                            onChange={onChange}
                        />
                    </div>
                    <div className="w-full">
                        <Label>Image (URL)</Label>
                        <Input
                            name="image"
                            value={values?.image}
                            placeholder={getBoxPlaceholders(type).image}
                            onChange={onChange}
                            autoSelect={true}
                        />
                    </div>
                </div>
                <div className="w-full flex gap-4">
                    <div className="w-full flex justify-center items-center">
                        <Switch
                            state={privateStatus}
                            setState={setPrivateStatus}
                        />
                        <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Private
                        </label>
                    </div>
                    <div className="w-full">{children}</div>
                </div>
            </Content>
        </form>
    );
};

import Content from "../../shared/Content/Content";
import H1 from "../../shared/H1/H1";
import Input from "../../shared/Input/Input";
import Label from "../../shared/Label/Label";
import { MultipleSelect } from "../../shared/MultipleSelect/MultipleSelect";
import Required from "../../shared/Required/Required";
import Textarea from "../../shared/Textarea/Textarea";

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

export const QuoteForm = ({
    header,
    children,
    privateStore,
    tagsStore,
    values,
    onChange,
}) => {
    const [isPrivate, setPrivateStatus] = privateStore;
    const [tags, setTags] = tagsStore;

    return (
        <form>
            <Content>
                <H1>{header}</H1>
                <div className="w-full flex gap-4">
                    <div className="w-full">
                        <Label>
                            <Required>Header</Required>
                        </Label>
                        <Input
                            name="header"
                            placeholder="Enter header of quote"
                            value={values.header}
                            onChange={onChange}
                            autoFocus={true}
                        />
                    </div>
                    <div className="w-40">
                        <Label>Marker</Label>
                        <Input
                            name="marker"
                            placeholder="272"
                            value={values.marker}
                            onChange={onChange}
                        />
                    </div>
                </div>
                <div className="w-full">
                    <Label>Tags</Label>
                    <MultipleSelect
                        options={tagsOptions}
                        state={tags}
                        setState={setTags}
                    />
                </div>

                <div>
                    <Label>
                        <Required>Text</Required>
                    </Label>
                    <Textarea
                        name="text"
                        value={values.text}
                        placeholder="Enter text of quote"
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
                    <div className="w-full">{children}</div>
                </div>
            </Content>
        </form>
    );
};

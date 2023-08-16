import { tagOptions } from "../../data/tagOptions";
import Content from "../../shared/Content/Content";
import H1 from "../../shared/H1/H1";
import Input from "../../shared/Input/Input";
import { Tooltip } from "../../shared/Label/Components/Tooltip/Tooltip";
import Label from "../../shared/Label/Label";
import { MultipleSelect } from "../../shared/MultipleSelect/MultipleSelect";
import Required from "../../shared/Required/Required";
import { Switch } from "../../shared/Switch/Switch";
import Textarea from "../../shared/Textarea/Textarea";
import { BiErrorCircle } from "react-icons/bi";

export const QuoteForm = ({
    header,
    children,
    privateStore,
    tagsStore,
    values,
    onChange,
    errors,
}) => {
    const [privateStatus, setPrivateStatus] = privateStore;
    const [tags, setTags] = tagsStore;

    return (
        <form>
            <Content>
                <div className="flex justify-between items-center">
                    <H1>{header}</H1>
                    {!!errors?.length && (
                        <Tooltip leftSide message={errors.join("\n")}>
                            <BiErrorCircle size={"24px"} color="red" />
                        </Tooltip>
                    )}
                </div>
                <div className="w-full flex gap-4">
                    <div className="w-full">
                        <Label>Header</Label>
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
                        options={tagOptions}
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

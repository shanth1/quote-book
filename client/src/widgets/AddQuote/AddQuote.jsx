import { useContext, useEffect, useState } from "react";
import Button from "../../shared/Button/Button";
import Input from "../../shared/Input/Input";
import { useForm } from "../../hooks/formHook";
import Label from "../../shared/Label/Label";
import { useMutation } from "@apollo/client";
import { AuthContext } from "../../context/AuthContext";
import { ADD_QUOTE } from "../../graphql/mutation";
import H1 from "../../shared/H1/H1";
import { stringToArray } from "../../utils/stringToArray";
import Content from "../../shared/Content/Content";
import Required from "../../shared/Required/Required";
import { validateForm } from "../../utils/validateForm";
import Textarea from "../../shared/Textarea/Textarea";
import { GET_BOX_QUOTES } from "../../graphql/queries";

export const AddQuote = ({ closeCallback, boxId }) => {
    const addQuote = () => {
        addQuoteMutation();
        closeCallback();
    };

    const {
        auth: {
            user: { id },
        },
    } = useContext(AuthContext);
    const [isPrivate, setPrivateStatus] = useState(true);

    const [onChange, onSubmit, values] = useForm(addQuote, {
        header: "",
        page: "",
        tags: "",
        text: "",
    });

    const [validStatus, setValidStatus] = useState(
        validateForm([values.header, values.text]),
    );
    useEffect(() => {
        setValidStatus(validateForm([values.header, values.text]));
    }, [values.header, values.text]);

    const [addQuoteMutation] = useMutation(ADD_QUOTE, {
        variables: {
            quote: {
                userId: id,
                boxId: boxId,
                header: values.header,
                page: values.page,
                tags: stringToArray(values.tags),
                text: values.text,
                timeCode: values.timeCode,
                isPrivate,
            },
        },
        refetchQueries: [GET_BOX_QUOTES],
    });

    return (
        <form>
            <Content>
                <H1>Add quote</H1>
                <div className="w-full">
                    <Label>
                        <Required>Header</Required>
                    </Label>
                    <Input
                        name="header"
                        placeholder="Enter header of quote"
                        onChange={onChange}
                    />
                </div>
                <div className="w-full flex gap-4">
                    <div className="w-full">
                        <Label>Page</Label>
                        <Input
                            name="page"
                            placeholder="272"
                            onChange={onChange}
                        />
                    </div>
                    <div className="w-full">
                        <Label>Tags</Label>
                        <Input
                            name="tags"
                            placeholder="Work, Personal"
                            onChange={onChange}
                        />
                    </div>
                </div>

                <div>
                    <Label>
                        <Required>Text</Required>
                    </Label>
                    <Textarea
                        name="text"
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
                        <label
                            for="default-checkbox"
                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            Private
                        </label>
                    </div>
                    <div className="w-full">
                        <Button onClick={onSubmit} isActive={validStatus}>
                            Add quote
                        </Button>
                    </div>
                </div>
            </Content>
        </form>
    );
};

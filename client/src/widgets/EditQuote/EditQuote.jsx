import { useEffect, useState } from "react";
import Button from "../../shared/Button/Button";
import Input from "../../shared/Input/Input";
import Label from "../../shared/Label/Label";
import { useMutation } from "@apollo/client";
import { UPDATE_QUOTE } from "../../graphql/mutation";
import H1 from "../../shared/H1/H1";
import { stringToArray } from "../../utils/stringToArray";
import Content from "../../shared/Content/Content";
import Required from "../../shared/Required/Required";
import { validateForm } from "../../utils/validateForm";
import Textarea from "../../shared/Textarea/Textarea";
import { GET_BOX_QUOTES } from "../../graphql/queries";
import { isEqualObject } from "../../utils/compareObjects";

export const EditQuote = ({
    userId,
    boxId,
    quoteId,
    quoteData,
    closeCallback,
}) => {
    const [oldValues, setOldValues] = useState();
    useEffect(() => {
        setOldValues({
            header: quoteData.header,
            marker: quoteData.marker ? quoteData.marker : "",
            tags: quoteData.tags ? quoteData.tags.join(", ") : "",
            isPrivate: quoteData.isPrivate,
            text: quoteData.text,
        });
    }, [quoteData]);

    const [isPrivate, setPrivateStatus] = useState();
    const [values, setValues] = useState({});
    useEffect(() => {
        setPrivateStatus(quoteData.isPrivate);
        setValues({
            header: quoteData.header,
            marker: quoteData.marker,
            tags: quoteData.tags ? quoteData.tags.join(", ") : "",
            text: quoteData.text,
        });
    }, [quoteData]);

    const onChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const onSubmit = (event) => {
        event.preventDefault();
        updateQuoteMutation();
        closeCallback();
    };

    const [validStatus, setValidStatus] = useState(false);
    useEffect(() => {
        setValidStatus(validateForm([values.header, values.text]));
    }, [values.header, values.text]);

    const [updatedStatus, setUpdatedStatus] = useState(false);
    useEffect(() => {
        console.log("values", values);
        console.log("old values", oldValues);
        setUpdatedStatus(!isEqualObject({ ...values, isPrivate }, oldValues));
    }, [values, isPrivate, oldValues]);

    const [updateQuoteMutation] = useMutation(UPDATE_QUOTE, {
        variables: {
            quoteId: quoteId,
            newQuote: {
                userId: userId,
                boxId: boxId,
                header: values.header,
                marker: values.marker,
                tags: stringToArray(values.tags),
                text: values.text,
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
                        value={values.header}
                        onChange={onChange}
                    />
                </div>
                <div className="w-full flex gap-4">
                    <div className="w-full">
                        <Label>Marker</Label>
                        <Input
                            name="marker"
                            placeholder="272"
                            value={values.marker}
                            onChange={onChange}
                        />
                    </div>
                    <div className="w-full">
                        <Label>Tags</Label>
                        <Input
                            name="tags"
                            placeholder="Work, Personal"
                            value={values.tags}
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
                            isActive={validStatus && updatedStatus}
                        >
                            Update quote
                        </Button>
                    </div>
                </div>
            </Content>
        </form>
    );
};

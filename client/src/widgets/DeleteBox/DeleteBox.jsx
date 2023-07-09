import { useState } from "react";
import Content from "../../shared/Content/Content";
import DeleteButton from "../../shared/DeleteButton/DeleteButton";
import H1 from "../../shared/H1/H1";
import Input from "../../shared/Input/Input";
import Label from "../../shared/Label/Label";
import { useMutation } from "@apollo/client";
import { DELETE_BOX } from "../../graphql/mutation";
import { GET_BOXES } from "../../graphql/queries";

const DeleteBox = ({ id, title, closeCallback }) => {
    const [inputTitle, setInputTitle] = useState("");

    const onClick = () => {
        deleteBox();
        closeCallback();
    };

    const onChange = (event) => {
        setInputTitle(event.target.value);
    };

    const [deleteBox] = useMutation(DELETE_BOX, {
        variables: {
            boxId: id,
        },
        refetchQueries: [GET_BOXES],
    });

    return (
        <Content>
            <H1>Delete box</H1>
            <Label>{`Type "${title}" to delete the box`}</Label>
            <Input onChange={onChange} />
            <div className="w-full">
                <div className="w-1/2 ml-auto mr-0">
                    <DeleteButton
                        onClick={onClick}
                        isActive={inputTitle === title}
                    >
                        Delete box
                    </DeleteButton>
                </div>
            </div>
        </Content>
    );
};

export { DeleteBox };

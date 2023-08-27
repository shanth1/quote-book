import { useContext, useState } from "react";
import Content from "../../shared/Content/Content";
import DeleteButton from "../../shared/DeleteButton/DeleteButton";
import H1 from "../../shared/H1/H1";
import Input from "../../shared/Input/Input";
import Label from "../../shared/Label/Label";
import { useMutation } from "@apollo/client";
import { DELETE_BOX } from "../../graphql/mutation";
import { AuthContext } from "../../context/AuthContext";
import { GET_USER_BOXES } from "../../graphql/queries";
import { playgroundCallback } from "../../utils/playgroundCallback";

const DeleteBox = ({ boxId, title, closeCallback }) => {
    const [inputTitle, setInputTitle] = useState("");

    const { userId, logout } = useContext(AuthContext);

    const onSubmit = (event) => {
        event.preventDefault();
        deleteBox().catch((e) => logout());
        closeCallback();
    };

    const onChange = (event) => {
        setInputTitle(event.target.value);
    };

    const [deleteBox] = useMutation(DELETE_BOX, {
        variables: {
            boxId: boxId,
        },
        refetchQueries: [GET_USER_BOXES],
    });

    return (
        <form>
            <Content>
                <H1>Delete box</H1>
                <Label>{`Type "${title}" to delete the box`}</Label>
                <Input onChange={onChange} autoFocus={true} />
                <div className="w-full">
                    <div className="w-1/2 ml-auto mr-0">
                        <DeleteButton
                            onClick={userId ? onSubmit : playgroundCallback}
                            isActive={inputTitle === title}
                        >
                            Delete box
                        </DeleteButton>
                    </div>
                </div>
            </Content>
        </form>
    );
};

export { DeleteBox };

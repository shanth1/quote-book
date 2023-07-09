import { useContext, useState } from "react";
import { useQuery } from "@apollo/client";
import { AuthContext } from "../../context/AuthContext";
import { BoxPreview } from "./BoxPreview/BoxPreview";
import { GET_BOXES } from "../../graphql/queries";
import H1 from "../../shared/H1/H1";
import Content from "../../shared/Content/Content";
import { Modal } from "../../shared/Modal/Modal";
import { DeleteBox } from "../../widgets/DeleteBox/DeleteBox";

export const Boxes = () => {
    const [deleteModalActive, setDeleteModalActive] = useState(false);
    const [deleteTitle, setDeleteTitle] = useState("");
    const [deleteId, setDeleteId] = useState("");

    const {
        auth: { user },
    } = useContext(AuthContext);
    const { loading, error, data } = useQuery(GET_BOXES, {
        variables: { userId: user.id },
    });

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;

    const boxes = data.getUser.boxes;

    return (
        <div>
            <Content>
                <H1>Boxes</H1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    {boxes.length !== 0
                        ? boxes.map((item) => (
                              <BoxPreview
                                  boxData={item}
                                  setModalActive={setDeleteModalActive}
                                  setDeleteTitle={setDeleteTitle}
                                  setDeleteId={setDeleteId}
                              />
                          ))
                        : "No boxes"}
                </div>
            </Content>
            <Modal active={deleteModalActive} setActive={setDeleteModalActive}>
                <DeleteBox
                    id={deleteId}
                    title={deleteTitle}
                    closeCallback={setDeleteModalActive}
                />
            </Modal>
        </div>
    );
};

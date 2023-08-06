import { useState } from "react";
import { Modal } from "../../shared/Modal/Modal";
import { DeleteBox } from "../DeleteBox/DeleteBox";
import { EditBox } from "../EditBox/EditBox";
import { BoxItem } from "./BoxItem/BoxItem";

export const BoxList = ({ boxes, userId }) => {
    const [deleteModalActive, setDeleteModalActive] = useState(false);
    const [editModalActive, setEditModalActive] = useState(false);
    const [editedBoxData, setEditedBoxData] = useState({});
    const [deleteTitle, setDeleteTitle] = useState("");
    const [deleteId, setDeleteId] = useState("");

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {boxes.length !== 0
                    ? boxes.map((item) => (
                          <BoxItem
                              boxData={item}
                              setModalActive={setDeleteModalActive}
                              setDeleteTitle={setDeleteTitle}
                              setDeleteId={setDeleteId}
                              setEditedBoxData={setEditedBoxData}
                              setEditModalActive={setEditModalActive}
                          />
                      ))
                    : "No boxes"}
            </div>

            <Modal active={deleteModalActive} setActive={setDeleteModalActive}>
                {deleteModalActive && (
                    <DeleteBox
                        id={deleteId}
                        title={deleteTitle}
                        closeCallback={setDeleteModalActive}
                    />
                )}
            </Modal>
            <Modal active={editModalActive} setActive={setEditModalActive}>
                {editModalActive && (
                    <EditBox
                        userId={userId}
                        boxData={editedBoxData}
                        closeCallback={setEditModalActive}
                    />
                )}
            </Modal>
        </div>
    );
};

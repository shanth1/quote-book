import { useState } from "react";
import { Modal } from "../../shared/Modal/Modal";
import { DeleteBox } from "../../features/DeleteBox/DeleteBox";
import { EditBox } from "../../features/EditBox/EditBox";
import { BoxItem } from "./BoxItem/BoxItem";

export const BoxList = ({ boxes }) => {
    const [deleteModalActive, setDeleteModalActive] = useState(false);
    const [editModalActive, setEditModalActive] = useState(false);
    const [editedBoxData, setEditedBoxData] = useState({});
    const [deleteTitle, setDeleteTitle] = useState("");
    const [deleteId, setDeleteId] = useState("");

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-2 lg:gap-x-3 gap-y-4">
                {boxes.length !== 0
                    ? boxes.map((item) => (
                          <BoxItem
                              key={item.id}
                              boxData={item}
                              setFunctions={{
                                  setDeleteModalActive,
                                  setDeleteTitle,
                                  setDeleteId,
                                  setEditedBoxData,
                                  setEditModalActive,
                              }}
                          />
                      ))
                    : "No boxes"}
            </div>

            {deleteModalActive && (
                <Modal
                    active={deleteModalActive}
                    setActive={setDeleteModalActive}
                >
                    <DeleteBox
                        boxId={deleteId}
                        title={deleteTitle}
                        closeCallback={setDeleteModalActive}
                    />
                </Modal>
            )}

            {editModalActive && (
                <Modal active={editModalActive} setActive={setEditModalActive}>
                    <EditBox
                        boxData={editedBoxData}
                        closeCallback={setEditModalActive}
                    />
                </Modal>
            )}
        </div>
    );
};

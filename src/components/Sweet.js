import React, { useState } from "react";
import { dbService, storageService } from "fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Sweet = ({ sweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newSweet, setNewSweet] = useState(sweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("정말 삭제하시겠습니까?");
    if (ok) {
      await dbService.doc(`sweets/${sweetObj.id}`).delete();
      if (sweetObj.attachmentUrl) {
        await storageService.refFromURL(sweetObj.attachmentUrl).delete();
      }
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`sweets/${sweetObj.id}`).update({
      text: newSweet,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewSweet(value);
  };
  return (
    <div className="sweet">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container sweetEdit">
            <input
              type="text"
              placeholder="Edit your sweet"
              value={newSweet}
              required
              autoFocus
              onChange={onChange}
              className="formInput"
            />
            <input type="submit" value="Update Sweet" className="formBtn" />
          </form>
          <span onClick={toggleEditing} className="formBtn cancelBtn">
            Cancel
          </span>
        </>
      ) : (
        <>
          <h4>{sweetObj.text}</h4>
          {sweetObj.attachmentUrl && <img src={sweetObj.attachmentUrl} />}
          {isOwner && (
            <div className="sweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} color="#979798" />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} color="#979798" />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Sweet;

import React, { useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { FcFolder, FcFile } from "react-icons/fc";
export default function Input(props) {
  const { addNew, setAddNew, setData } = props;
  const myRef = useRef(null);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    let data;
    if (addNew.type === "file") {
      data = {
        id: uuidv4(),
        type: "file",
        name: myRef.current.value
      };
    } else {
      data = {
        id: uuidv4(),
        children: [],
        type: "folder",
        name: myRef.current.value
      };
    }
    if (addNew.root) {
      setData((prev) => [data, ...prev]);
      setAddNew({});
    } else {
      setData((prev) => {
        let newPrev = prev.map((pd) => {
          if (pd.id === addNew.id) {
            pd.children.push(data.id);
            return pd;
          }
          return pd;
        });
        return [data, ...newPrev];
      });
      setAddNew({});
    }
  };

  return (
    <form
      onSubmit={handleOnSubmit}
      className="mt-2 space-x-2 flex items-center"
    >
      {addNew.type === "file" && <FcFile fontSize={22} />}
      {addNew.type === "folder" && <FcFolder fontSize={22} />}
      <input
        ref={myRef}
        autoFocus
        maxLength={16}
        onBlur={() => setAddNew({})}
        className="flex-1 rounded-md p-1 px-2 text-gray-200 bg-transparent border"
      />
    </form>
  );
}

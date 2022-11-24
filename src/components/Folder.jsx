import React from "react";
import { FcFolder, FcOpenedFolder } from "react-icons/fc";
import New from "./New";
import File from "./File";
import Input from "./Input";

export default function Folder(props) {
  const {
    data,
    getChild,
    open,
    toggleFolderState,
    addNew,
    setAddNew,
    setData
  } = props;
  const { id, name, children } = data;

  const renderChildren = () => {
    return (
      <div className="ml-4">
        {children.map((cd) => {
          const d = getChild(cd);
          if (d.type === "folder")
            return (
              <Folder
                key={d.id}
                {...{
                  data: d,
                  getChild,
                  open,
                  toggleFolderState,
                  addNew,
                  setAddNew,
                  setData,
                  id: d.id
                }}
              />
            );
          if (d.type === "file") return <File key={d.id} {...{ data: d }} />;
          return null;
        })}
      </div>
    );
  };

  return (
    <div className="py-1">
      {/* folder info */}
      <div className="flex items-center justify-between">
        <div
          onClick={() => toggleFolderState(id)}
          className="flex flex-1 items-center space-x-2 cursor-pointer"
        >
          {open?.includes(id) ? (
            <FcOpenedFolder fontSize={22} />
          ) : (
            <FcFolder fontSize={22} />
          )}
          <p className="text-gray-400 hover:text-gray-200 flex-1">{name}</p>
        </div>
        <New {...{ addNew, setAddNew, root: false, id }} />
      </div>
      {/* folder contents */}
      {addNew && addNew.id === id && (
        <div className="ml-4">
          <Input {...{ addNew, setAddNew, setData, id }} />
        </div>
      )}
      {children.length > 0 &&
        (open?.includes(id) || (addNew && addNew.id === id)) &&
        renderChildren()}
    </div>
  );
}

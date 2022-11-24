import React from "react";
import { VscNewFile, VscNewFolder } from "react-icons/vsc";

export default function New(props) {
  const { addNew, setAddNew, root } = props;
  let id = props?.id;

  const newFolder = (e) => {
    e.stopPropagation();
    setAddNew({
      id,
      type: "folder",
      root
    });
  };

  const newFile = (e) => {
    e.stopPropagation();
    setAddNew({
      id,
      type: "file",
      root
    });
  };

  return (
    <div className="flex items-center text-gray-200 space-x-2">
      <VscNewFile onClick={newFile} fontSize={18} cursor="pointer" />
      <VscNewFolder onClick={newFolder} fontSize={18} cursor="pointer" />
    </div>
  );
}

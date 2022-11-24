import React, { useEffect, useState } from "react";
import File from "./File";
import Folder from "./Folder";

export default function Display(props) {
  const { data, setData, addNew, setAddNew } = props;
  const [open, setOpen] = useState([]);

  useEffect(() => {
    if (addNew) {
      if (open) {
        if (!open.includes(addNew.id)) setOpen((prev) => [...prev, addNew.id]);
      } else {
        setOpen([addNew.id]);
      }
    }
  }, [addNew, open]);

  const toggleFolderState = (id) => {
    if (open.length === 0) {
      setOpen([id]);
    } else {
      if (open.includes(id)) setOpen((prev) => prev.filter((p) => p !== id));
      else setOpen((prev) => [...prev, id]);
    }
  };

  const getChild = (cd) => {
    let val;
    data.forEach((d) => {
      if (d.id === cd) {
        val = d;
      }
    });
    return val;
  };

  const getChildrens = () => {
    if (data) {
      const folders = data.filter((d) => d.children && d.children.length > 1);
      let childrens = [];

      folders.forEach((fd) => {
        fd.children.forEach((cd) => {
          childrens.push(cd);
        });
      });
      return childrens;
    }
  };

  const getRootFolders = () => {
    if (data) {
      let rootFolders = [];
      data.forEach((d) => {
        if (!getChildrens().includes(d.id)) {
          rootFolders.push(d);
        }
      });
      return rootFolders;
    }
  };

  const render = () => {
    return getRootFolders().map((d) => {
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
              setData
            }}
          />
        );
      if (d.type === "file") return <File key={d.id} {...{ data: d }} />;
      return null;
    });
  };

  return <div>{data && render()}</div>;
}

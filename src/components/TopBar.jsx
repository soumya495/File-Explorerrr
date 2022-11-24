import React from "react";
import New from "./New";

export default function TopBar(props) {
  return (
    <div className="flex items-center justify-between border-b pb-2">
      <p className="font-bold uppercase text-gray-400 text-xs tracking-wide">
        file explorer
      </p>
      <New {...props} />
    </div>
  );
}

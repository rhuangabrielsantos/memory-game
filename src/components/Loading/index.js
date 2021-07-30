import React from "react";
import { FaSyncAlt } from "react-icons/fa";

import "./styles.css";

export default function Loading() {
  return (
    <div className="flex items-center justify-center bg-darker">
      <FaSyncAlt
        icon="FaSyncAlt"
        className="text-cullen icon-spin w-11 h-auto"
      />
    </div>
  );
}

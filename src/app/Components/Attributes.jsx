import React from "react";

const Attributes = ({
    value,
    color,
    textSize = "text-md",
    height = "h-20",
}) => (
    <div
    className={`flex justify-center items-center ${color} text-white font-bold ${textSize} ${height} w-32 m-2 rounded-md text-center`}
    >
        {value}
    </div>
);

export default Attributes;
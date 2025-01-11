import React from "react";

const EmailTable = ({ email,mongoId,date,deleteEmail }) => {
  return (
    <tr className="bg-white border-b text-left">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        {email ? email : "No email"}
      </th>
      <td className="px-6 py-4 hidden sm:block">{new Date().toDateString()}</td>
      <td onClick={() => deleteEmail(mongoId)}
      className="px-6 py-4  cursor-pointer">X</td>
    </tr>
  );
};

export default EmailTable;

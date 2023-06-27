import React from "react";
import ListItem from "./ListItem";
import Table from "./Table";
const Content = ({ data, fetchError }) => {
  return (
    <div>
        <p>{fetchError}</p>
        <Table data={data}/>
    </div>
  );
};

export default Content;
 
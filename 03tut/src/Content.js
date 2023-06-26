import React from "react";
import { useState } from "react";
import ItemList from "./ItemList";

const Content = ({ items, handleCheck, handleDelete }) => {
  return (
    <main>
      {items.length ? (
        <ItemList
          items={items}
          handleCheck={handleCheck}
          handleDelete={handleCheck}
        />
      ) : (
        <p style={{ marginTop: "2rem" }}> Your List Is Empty </p>
      )}
    </main>
  );
};

export default Content;

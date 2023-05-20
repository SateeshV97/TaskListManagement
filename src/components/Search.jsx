import React from "react";
import TextField from "@mui/material/TextField";
const Search = ({ setSearchQuery }) => (
  <form>
    <TextField
      id="search-bar"
      className="text"
      onChange={(e) => {
        setSearchQuery(e.target.value);
      }}
      variant="outlined"
      placeholder="Search..."
      size="small"
    />
  </form>
);

export default Search;

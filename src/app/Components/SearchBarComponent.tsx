import { ISearchBar } from "@/Interface/Interface";
import React from "react";

const SearchBarComponent = (props: ISearchBar) => {
  return (
    <div className="px-10">
      <div className="pt-9">
        <div className="search-container py-3 px-3">
          <div className="flex flex-1">
            <input className="form-control text-black" type="text" placeholder="Search for a United States City" aria-label="Search" onKeyDown={props.onKeyDown} value={props.value} onChange={props.onChange}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBarComponent;

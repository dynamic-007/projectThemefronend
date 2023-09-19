import React from "react";

const FilterContext=React.createContext({
    initialState:{},
    selectedList:[],
    changeListItem:()=>{},
    changeCategory:()=>{},
})

export default FilterContext
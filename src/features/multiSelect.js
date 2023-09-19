import React from "react";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";

import  {options,categoryoptions, hroptions, ccoptions, deptypeoptions, districtoptions, deptnameoptions} from "../data/equipment";

import FilterContext from "../context/context";

const MultiSelectAll = (props) => {
  const {element}=props;
  
  
  return(
  <FilterContext.Consumer>{value=>{
    const {changeCategory,initialState}=value;
    let dropoptions=[];
    if(element==="category"){
      dropoptions=categoryoptions;
    }
    else if(element==="depttype"){
      dropoptions=deptypeoptions;
    }
    else if(element==="districts"){
      dropoptions=districtoptions
    }
    else if(element==="deptname"){
      dropoptions=deptnameoptions
    }
    else{
      if(initialState.category.length!==4){
      for(let i=0;i<initialState.category.length;i++){
        if(initialState.category[i].value==="Human Resources"){
          dropoptions.push(...hroptions);
        }
        if(initialState.category[i].value==="Equipment"){
          dropoptions.push(...options);
        }
        if(initialState.category[i].value==="Medical Supplies"){
          dropoptions.push(...ccoptions);
        }

      }
    }
    else{
      dropoptions=options;
    }
    }
  function getDropdownButtonLabel({ placeholderButtonLabel, value }) {
    if (value && value.some((o) => o.value === "*")) {
      return `${placeholderButtonLabel}: All`;
    } else {
      return `${placeholderButtonLabel}: ${value.length} selected`;
    }
  }

  function onChange(value, event) {
    let temp={...initialState};
    console.log(value,event.action)
   
    if (event.action === "select-option" && event.option.value === "*") {
      temp[element]=this.options;
      changeCategory({...temp});
    } else if (
      event.action === "deselect-option" &&
      event.option.value === "*"
    ) {
      temp[element]=[];
      changeCategory({...temp});
    } else if (event.action === "deselect-option") {
      let newV=value.filter((o) => o.value !== "*");
      console.log(newV);
      temp[element]=newV;
      changeCategory({...temp});
    } else if (value.length === this.options.length - 1) {
      temp[element]=this.options;
      changeCategory({...temp});
    } else {
      temp[element]=value;
      changeCategory({...temp});
    }
  }

  return (
    <ReactMultiSelectCheckboxes
      options={[{ label: "All", value: "*" }, ...dropoptions]}
      placeholderButtonLabel={element}
      getDropdownButtonLabel={getDropdownButtonLabel}
      value={initialState[element]}
      onChange={onChange}
      setState={changeCategory}
    />
  );
  }}</FilterContext.Consumer>);

  // function getDropdownButtonLabel({ placeholderButtonLabel, value }) {
  //   if (value && value.some((o) => o.value === "*")) {
  //     return `${placeholderButtonLabel}: All`;
  //   } else {
  //     return `${placeholderButtonLabel}: ${value.length} selected`;
  //   }
  // }

  // function onChange(value, event) {
  //   if (event.action === "select-option" && event.option.value === "*") {
      
  //     this.setState(this.options);
  //   } else if (
  //     event.action === "deselect-option" &&
  //     event.option.value === "*"
  //   ) {
  //     this.setState([]);
  //   } else if (event.action === "deselect-option") {
  //     this.setState(value.filter((o) => o.value !== "*"));
  //   } else if (value.length === this.options.length - 1) {
  //     this.setState(this.options);
  //   } else {
  //     this.setState(value);
  //   }
  // }

  // return (
  //   <ReactMultiSelectCheckboxes
  //     options={[{ label: "All", value: "*" }, ...options]}
  //     placeholderButtonLabel="Colors"
  //     getDropdownButtonLabel={getDropdownButtonLabel}
  //     value={selectedOptions}
  //     onChange={onChange}
  //     setState={setSelectedOptions}
  //   />
  // );
};

export default MultiSelectAll;
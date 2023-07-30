import React, { useContext,  useReducer } from 'react';
import { filterReducer } from '../reducers';



const filterInitialState={
    productList:[],
    onlyInStock:false,
    bestSellerOnly:false,
    sortBy:null,
    ratings:null

}

 const FilterContext=React.createContext(filterInitialState);

//we only need to export the provider and the filter
export const FilterProvider=({children})=>{
    const [state, dispatch]=useReducer(filterReducer,filterInitialState);
    //state gives overall information about what is happening
    //dispatch makes chnages 

    function initialProductList(products){
        dispatch({
            type: "PRODUCT_LIST",
            payload: {
                products:products
            }
        })
    }

const value={
    //the product list below is the empty array and the second one initial product list calls the function that get the products from api and updates
    productList: state.productList,
   
   initialProductList
}

return(
    <FilterContext.Provider value={value}>
               {children}
    </FilterContext.Provider>
)
}
//we basically need this line of code on every page where we need the context
export const useFilter=() => {
    const context=useContext(FilterContext);
    return context;
}


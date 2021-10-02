const initState = {
    data:[],
    services:[],
    userData:{},
    loading:true,
    categoryId:'',
    complainData:{}
}

export const reducer = (state = initState,action)=>{
    if(action.type=="ADD_DATA"){
         return {
             ...state,
             data:action.payload
         }
    }
    if(action.type=="SET_LOADING"){
        return {
            ...state,
            loading:action.payload
        }
    }
    if(action.type=="ADD_USER"){
        return {
            ...state,
            loading:action.payload
        }
    }
    if(action.type=="ADD_CATEGORY"){
        return {
            ...state,
            categoryId:action.payload
        }
    }
    if(action.type=="ADD_SERVICES"){
        return {
            ...state,
            services:action.payload
        }
    }
    if(action.type=="ADD_COMPLAINDATA"){
        return {
            ...state,
            complainData:action.payload
        }
    }
    
    return state
}
import jwt_decode from "jwt-decode"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Toast from 'react-native-toast-message';
import {useSelector,useDispatch} from 'react-redux'
import { BaseUrl } from "../../Constants/baseUrl.js";
export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const loggedinUser = (user,token, dispatch) => {
    var temp={user: user , token: token}
    console.log("username:"+user)
    const api = process.env.BASE_URL2;
    const decoded = jwt_decode(token)
    dispatch(setCurrentUser(decoded, temp))
};
export const loginUser = (user, dispatch) => {
    console.log("username:"+user.userName)
    const api = process.env.BASE_URL2;
    fetch(`${BaseUrl.wifi}/api/v1/client/login`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
    .then((res) => res.json())
    .then((data) => {
        if (data) {
            const token = data.token;
            const userNow=data.user;
            AsyncStorage.setItem("jwt", token)
            console.log('jwt token saved')
            storeData(userNow)
            //const value=AsyncStorage.getItem('jwt')
            //console.log("token value is ",value)
            
            const decoded = jwt_decode(token)
            dispatch(setCurrentUser(decoded, data))

        } else {
            console.log("elseeeeeeeeeee called")
           logoutUser(dispatch)
        }
    })
    .catch((err) => {
       alert("incorrect details")
       console.log(err)
       
        logoutUser(dispatch)
    });
};
const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('userData', jsonValue)
      console.log("saved user data")
    } catch (e) {
      console.log("sorry cant save")
    }
  }
  const storeCategories = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('categories', jsonValue)
      console.log("saved categories data")
    } catch (e) {
      console.log("sorry cant save")
    }
  }
  const storeServices = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('services', jsonValue)
      console.log("saved services data")
    } catch (e) {
      console.log("sorry cant services save")
    }
  }
export const registerUser = (user, dispatch) => {
   console.log("username:"+user)
    fetch(`${BaseUrl.wifi}/api/v1/client/register`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
    .then((res) => res.json())
    .then((data) => {
        if (data) {
            const userNow = data;
        
            storeCategories(userNow)
            console.log("Categories data is ",data)
        
            //const value=AsyncStorage.getItem('jwt')
           //console.log("token value is ",value)
          // logoutUser(dispatch)
           

        }
    })
    .catch((err) => {
       alert("incorrect details fro signin.Check your details again")
       console.log(err)
    
        
    });
};
export const getCategory = () => {
    const dispatch  = useDispatch()
     fetch(`${BaseUrl.wifi}/api/v1/category/`, {
         method: "GET",
         
         headers: {
             Accept: "application/json",
             "Content-Type": "application/json",
         },
     })
     .then((res) => res.json())
     .then((data) => {
         if (data) {
            dispatch({type:"ADD_DATA",payload:data})
           
             const categoryNow = data;
             
             storeCategories(categoryNow)
             //console.log("user data is ",data)
         
             //const value=AsyncStorage.getItem('jwt')
            //console.log("token value is ",value)
            
 
         }
     })
     .catch((err) => {
        alert("incorrect details.Check your details again")
        console.log(err)
     
        
     });
 };
 export const getService = ( id) => {
    const dispatch  = useDispatch()
          console.log(id)
          const req=
    fetch(`${BaseUrl.wifi}/api/v1/service/?id=${id}` ,{
        method: "GET",
        
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
    .then((res) => res.json())
    .then((data) => {
        if (data) {
            const categoryNow = data;
            dispatch({type:"ADD_SERVICES",payload:data})
            //storeServices(categoryNow)
            console.log("service data is ",data)
        
            //const value=AsyncStorage.getItem('jwt')
           //console.log("token value is ",value)
           

        }
    })
    .catch((err) => {
       alert("incorrect details.Check your details again")
       console.log(err)
    
       
    });
};

export const getUserProfile = (id) => {
    console.log("getUserProfile")
    fetch(`${baseURL}users/${id}`, {
        method: "GET",
        body: JSON.stringify(user),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
    })
    .then((res) => res.json())
    .then((data) => console.log(data));
}

export const logoutUser = (dispatch) => {
    console.log("logoutiing user")
    AsyncStorage.removeItem("jwt");
    console.log("async removeddddddddddd");
    dispatch(setCurrentUser({}))
}

export const setCurrentUser = (decoded, user) => {
    //console.log("user is "+user.getUserProfile);
    return {
        type: SET_CURRENT_USER,
        payload: decoded,
        userProfile: user
    }
}
export const setCurrentCategory = (categoryId) => {
    //console.log("user is "+user.getUserProfile);
    return {
        type: SET_CURRENT_CATEGORY,
        payload: categoryId,
        
    }
}
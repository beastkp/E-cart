import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
// import cartItems from '../../cartItems';

const url = "https://course-api.com/react-useReducer-cart-project";

// createAsyncThunk is used when you want to fetch the data frpm a third party API
// it has 2 parameters which are the type and a callback function that returns a promise


const initialState = {
    cartItems:[],
    amount:4,
    total:0,
    isLoading:true, 

}

export const getCartItems = createAsyncThunk('cart/getCartItems',()=>{
    return fetch(url).then(resp => resp.json()).catch(err=>console.log(err));
}); // it gives 3 lifecycle actions pendinf fullfull and rejected

const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        // if you want to use return statement here you have to add all the properties to it, as return statement hampers the initial state so if you write return {cartItems=[]} then amount,total and other variables will get deleted as only cartItems are mentioned
        clearCart: (state)=>{
            state.cartItems =[]
        },
        //you are setting up the reducer where clearcart is the name of the reducer and we can mutate the state directly because Immer library takes care of that 
        removeItem: (state,action)=>{
            // console.log(action);
            const itemId = action.payload;
            state.cartItems = state.cartItems.filter((item)=>item.id!==itemId)
        },
        increase: (state,{payload})=>{ // directly destructuring
            const cartItem = state.cartItems.find((item)=>item.id === payload.id);
            cartItem.amount +=1;
            console.log(payload);
        },
        decrease: (state,action)=>{
            const cartItem = state.cartItems.find((item)=>item.id === action.payload.id);
            cartItem.amount -=1
            console.log(action);
        },
        calculateTotal : (state)=>{
            let amount =0;
            let total =0;
            state.cartItems.forEach((item)=>{
                amount += item.amount;
                total += item.amount*item.price;
            });
            state.amount = amount
            state.total = total
        }
    },
    extraReducers:{
        [getCartItems.pending] : (state,action)=>{
            state.isLoading = true
        },
        [getCartItems.fulfilled] : (state,action)=>{
            console.log(action)
            state.isLoading = false;
            state.cartItems = action.payload;
        },
        [getCartItems.rejected] : (state,action)=>{
            state.isLoading = false
        },
    }
});

console.log(cartSlice);
// this is the actual reducer 

export const {clearCart, removeItem, increase,decrease, calculateTotal}  =cartSlice.actions;
export default cartSlice.reducer;


import Navbar from "./components/Navbar";
import CartContainer from "./components/CartContainer";
import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { calculateTotal,getCartItems } from "./features/card/cardSlice";
import Modal from "./components/Modal";


function App() {
  const dispatch = useDispatch();
  const {cartItems,isLoading} = useSelector((store)=>store.cart);
  const {isOpen} = useSelector((store)=>store.modal);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    dispatch(calculateTotal());
  }, [cartItems])

  useEffect(() => {
      dispatch(getCartItems())
  }, [])
  
  if(isLoading){
    return(
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    )
  }
  return(
    <main>
      {isOpen && <Modal/>}
      <Navbar/>
      <CartContainer/>
    </main>
  )
}
export default App;

import React from 'react'
import CardItem from './CartItem'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from '../features/card/cardSlice'
import { openModal } from '../features/modal/modalSlice'

const CartContainer = () => {
    const dispatch = useDispatch();
    const {cartItems,amount,total} = useSelector((store)=>store.cart)
    const {isOpen} = useSelector((store)=>store.modal);
    if(amount<1){
        return <section className='cart'>
            <header>
                <h2>Your Bag</h2>
                <h4 className="empty-cart">is currently empty</h4>
            </header>
        </section>
    }
  return (
    <div className='cart'>
        <header>
            <h2>Your bag</h2>
                </header>
            <div>
                {cartItems.map((item)=>{
                    return <CardItem key={item.id} {...item} />  
                })}
            </div>
            <footer>
                <hr />
                <div className="cart-total">

                <h4>Total <span>${total.toFixed(2)}</span></h4>
                {/* //toFixed method is the inbuilt javascript method for maintaining 2 digits after decimal */}
                </div>
                <button className="btn clear-btn" onClick={()=>{
                    dispatch(openModal()) // here we want to open the modal
                    // dispatch(clearCart())
                }}>clear cart</button>
            </footer>
    </div>
  )
}

export default CartContainer
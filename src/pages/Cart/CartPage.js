import {CartEmpty} from "./Components/CartEmpty";
import {CartList} from "./Components/CartList";
import { useCart } from "../../context/CartContext";

export const CartPage=()=>{
  
    const {cartList}=useCart();

  
    return (
        <main>
 {cartList.length ?  <CartList    />  : <CartEmpty/>} 

        </main>
    )
}
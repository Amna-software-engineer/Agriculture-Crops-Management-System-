
import React, { useState } from 'react';
import { X, ShoppingBasket, Trash2, Plus, Minus, ArrowRight, Wheat, Carrot, Apple, Trees, ArrowLeft, MapPin, Phone, User } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { decreaseQty, increaseQty, deleteItem, clearCart } from '../../features/cart.slice';
import { useDeleteItem, useEditItemInCart } from '../../api/cart.api';
import { useAddOrder } from '../../api/order.api';

import { useNavigate } from "react-router-dom";
// buyer, crop, quantity, totalPrice, shippingAddress

const ClientCartDrawer = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.auth.currUser);
  const cartItems = useSelector(state => state?.cart?.items);
  const [showForm, setShowForm] = useState(false);
  const [shippingDetails, setShippingDetails] = useState({
    address: '',
    city: '',
    phone: ''
  });
  const { editItem } = useEditItemInCart();
  const { addOrder } = useAddOrder();
  const { deleteItem } = useDeleteItem();
  const categoryIcons = (cropType) => {
    switch (cropType) {
      case "Grain":
        return <Wheat size={40} className="text-amber-500" />;
      case "Vegetable":
        return <Carrot size={40} className="text-orange-500" />;
      case "Fruit":
        return <Apple size={40} className="text-red-500" />;
      case "Fiber":
        return <Trees size={40} className="text-emerald-600" />;
      default:
        return null;
    }
  };


  const isEmpty = cartItems.length === 0;

  const handleCartEdit = async (id, type, crop) => {

    const currentItem = cartItems.find(item => item.crop._id === id);
    let newQty = currentItem.cartQty; // for backend update
    if (type === "inc") {
      dispatch(increaseQty(id));
      newQty += 1;
    } else if (type === "dec") {
      if (newQty <= 1) { // If Qty is 1, remove the item
        await handleDeleteItem(id);
        return;
      } else {
        dispatch(decreaseQty(id));
        newQty -= 1;
      }
    }
    await editItem({ buyer: user._id, items: [{ cartQty: newQty, crop: crop._id, }] });
  }
  const handleDeleteItem = async (itemId) => {
    console.log(itemId);

    dispatch(deleteItem(itemId));
    await deleteItem(itemId);
  }
  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    const orderData = {
      buyer: user._id,
      items: cartItems.map(item => ({ crop: item.crop._id, quantity: item.cartQty })),
      shippingAddress: shippingDetails,
      totalPrice: cartItems.reduce((total, item) => total + (item?.crop?.price * item?.cartQty), 0)
    };
    console.log("Final Order Data:", orderData);

    await addOrder(orderData);
    dispatch(clearCart());
    onClose();
    navigate("/dashboard/client/my-orders");

  };
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity" onClick={onClose} />
      )}

      {/* Drawer Container */}
      <div className={`fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>

        {/* Header */}
        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              {showForm && (
                <button onClick={() => setShowForm(false)} className="mr-2 p-1 hover:bg-gray-100 rounded-full">
                  <ArrowLeft size={20} />
                </button>
              )}
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-lg leading-tight">{showForm ? "Shipping Details" : "Your Basket"}</h3>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{cartItems?.length} Items Ready to Order</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-50 rounded-full text-gray-400 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content Area */}
        <div className="h-[calc(100vh-200px)] overflow-y-auto p-6">
          {!showForm ? (isEmpty ? (
            /* --- EMPTY STATE --- */
            <div className="h-full flex flex-col items-center justify-center text-center gap-4">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center">
                <ShoppingBasket size={48} className="text-gray-200" />
              </div>
              <div>
                <p className="text-slate-800 font-bold text-lg">Basket is empty</p>
                <p className="text-gray-400 text-sm mt-1 px-10">Add fresh produce from the marketplace to start your order.</p>
              </div>
            </div>
          ) : (
            /* --- FILLED STATE --- */
            <div className="space-y-4">
              {cartItems?.map((item) => (
                <div key={item._id} className="flex gap-4 p-4 rounded-2xl border border-gray-50 hover:border-emerald-100 transition-all bg-white shadow-sm">
                  <div className="h-16 w-16 bg-slate-50 rounded-xl flex items-center justify-center text-2xl">
                    {categoryIcons(item?.crop?.cropType)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-bold text-slate-800">{item?.crop?.name}</h4>
                      <button className="text-gray-300 hover:text-red-400" onClick={() => handleDeleteItem(item?._id)}><Trash2 size={16} /></button>
                    </div>
                    <p className="text-emerald-500 font-bold text-sm mt-0.5">Rs. {item?.crop?.price}</p>

                    {/* Qty Controls */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-3 bg-slate-50 rounded-lg p-1">
                        <button className="p-1 hover:bg-white rounded-md text-slate-400" onClick={() => handleCartEdit(item?.crop?._id, "dec", item?.crop)}><Minus size={14} /></button>
                        <span className="text-xs font-bold text-slate-700">{item?.cartQty || 1}</span>
                        <button className="p-1 hover:bg-white rounded-md text-slate-400" onClick={() => handleCartEdit(item?.crop?._id, "inc", item?.crop)}><Plus size={14} /></button>
                      </div>
                      <p className="text-xs font-bold text-slate-400">Subtotal: {item?.crop?.price * item?.cartQty}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
          ) : (
            /* --- SHIPPING FORM STATE --- */
            <form id="shipping-form" onSubmit={handleFinalSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Delivery Address</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
                  <textarea
                    required
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-emerald-500"
                    placeholder="Full House Address, Street, etc."
                    value={shippingDetails.address}
                    onChange={(e) => setShippingDetails({ ...shippingDetails, address: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">City</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input
                    required
                    type="text"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-emerald-500"
                    placeholder="Your City"
                    value={shippingDetails.city}
                    onChange={(e) => setShippingDetails({ ...shippingDetails, city: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input
                    required
                    type="tel"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-emerald-500"
                    placeholder="03xx-xxxxxxx"
                    value={shippingDetails.phone}
                    onChange={(e) => setShippingDetails({ ...shippingDetails, phone: e.target.value })}
                  />
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Footer / Checkout Button */}
        {!isEmpty && (
          <div className="absolute bottom-0 left-0 w-full p-6 bg-white border-t border-gray-50">
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">Estimated Total</p>
              <p className="text-2xl font-black text-slate-900 underline decoration-emerald-400 decoration-4">Rs. {cartItems?.reduce((total, item) => total + (item?.crop?.price * item?.cartQty), 0)}</p>
            </div>
            {!showForm ? (
              <button
                onClick={() => setShowForm(true)}
                className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-lg"
              >
                Checkout Now <ArrowRight size={18} />
              </button>
            ) : (
              <button
                form="shipping-form"
                type="submit"
                className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all shadow-lg"
              >
                Confirm Order <ArrowRight size={18} />
              </button>
            )}
            {/* <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-xl shadow-slate-200" onClick={() => handlePlaceOrder(cartItems)}>
              Place Order
              <ArrowRight size={18} />
            </button> */}
          </div>
        )}
      </div>
    </>
  );
};

export default ClientCartDrawer;
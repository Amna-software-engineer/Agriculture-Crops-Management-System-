import React, { useEffect, useState } from 'react';
import { ShoppingCart, Star, MapPin, Wheat, Carrot, Apple, Trees } from 'lucide-react';
import DashboardHeader from "../../component/DashboardHeader"
import { useGetAllCrops } from '../../api/crop.api';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setCrops } from '../../features/crops.slice';
import ClientCartDrawer from './ClientCartDrawer';
import { useAddItemToCart } from '../../api/cart.api';
import { addItems } from '../../features/cart.slice';

const ClientMarketPlace = () => {
  const user = useSelector(state => state.auth.currUser);
  const [cropList, setCropList] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState({
    buyer: user._id,
    quantity: 0,
    items: []
  });

  const dispatch = useDispatch();
  const { loading, Error, getCrops } = useGetAllCrops();
  const { addItem } = useAddItemToCart();
  const location = useLocation();
  // getting crops
  useEffect(() => {
    const fetchAllData = async () => {
      //  fetching Data
      const crops = await getCrops();
      // updating local state
      setCropList(crops || []);
      //updating store 
      dispatch(setCrops(crops || []));

    };

    fetchAllData();
  }, [location.pathname]);

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
  // "Grain", "Vegetable", "Fruit", "Fiber"
  // save items to store(store will update state + save to localStorage) 

  // inside client markepplace pg
  const HandleCart = async (crop) => {

    dispatch(addItems({ crop, cartQty: 1 }));
    // saving to database
    await addItem({ buyer: user._id, items: [{ cartQty: 1, crop: crop._id }] });
    setIsCartOpen(true);
  }


  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <DashboardHeader page={"Marketplace"} role={"Client"} onCartClick={() => setIsCartOpen(true)} />

      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {cropList.map((crop) => (
          <div key={crop?.id} className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex flex-col gap-4">

            {/* Top Badge (Location) */}
            <div className="flex justify-between items-start">
              <span className="flex items-center gap-1 bg-slate-50 text-slate-500 text-[10px] font-bold px-2 py-1 rounded-md">
                <MapPin size={12} /> {crop?.location}
              </span>
              <div className="flex items-center gap-1 text-orange-400 font-bold text-xs">
                <Star size={14} fill="currentColor" /> {crop?.rating}
              </div>
            </div>

            {/* Placeholder for Icon/Image */}
            <div className="h-32 bg-slate-50 rounded-2xl flex items-center justify-center">
              {categoryIcons(crop?.cropType)}
            </div>

            {/* Info Section */}
            <div>
              <div>
                <h3 className="font-bold text-slate-800 text-lg">{crop?.name}</h3>
                <div className='flex justify-between'>
                  <p className="text-slate-400 text-xs mt-1">  Sold by <span className="text-slate-600 font-medium">{crop?.formerId?.name}</span></p>
                  <p className="text-slate-400 text-xs mt-1">Availabe Stock: <span className="text-slate-600 font-medium">{crop?.quantity}</span></p>

                </div>
              </div>

            </div>

            {/* Price & Action Section */}
            <div className="flex justify-between items-end mt-2">
              <div>
                <p className="text-emerald-500 font-bold text-xl">Rs. {crop?.price}</p>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">PRICE / KG</p>
              </div>

              <button className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl hover:bg-slate-800 transition-all text-sm font-medium" onClick={() => HandleCart(crop)} >
                <ShoppingCart size={16} />
                Add to Cart
              </button>
            </div>

          </div>
        ))}
      </div>
      {/*  cart */}
      <ClientCartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)}
      />
    </div>
  );
};

export default ClientMarketPlace;
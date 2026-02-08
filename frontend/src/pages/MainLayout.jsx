
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from '../component/Sidebar'
import { useSelector } from 'react-redux';

const MainLayout = () => {

  const navigate = useNavigate();

  const user = useSelector(state => state.auth.currUser);

  if(!user){
    navigate("/login");
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="content-area w-full">
        <Outlet /> {/* Saare pages (Orders, Crops) yahan render honge */}
      </div>
    </div>

  )
}

export default MainLayout

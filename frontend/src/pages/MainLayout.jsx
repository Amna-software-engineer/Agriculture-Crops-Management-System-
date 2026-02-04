
import { Outlet } from 'react-router-dom'
import AdminSidebar from '../component/AdminSidebar'

const MainLayout = () => {


  return (
    <div className="flex">
         <AdminSidebar />
      <div className="content-area w-full">
        <Outlet /> {/* Saare pages (Orders, Crops) yahan render honge */}
      </div>
    </div>
    
  )
}

export default MainLayout

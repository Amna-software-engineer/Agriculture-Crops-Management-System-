
import { Outlet } from 'react-router-dom'

import Sidebar from '../component/Sidebar'

const MainLayout = () => {


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

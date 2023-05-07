import "./sidebar.scss"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EngineeringIcon from '@mui/icons-material/Engineering';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
const Sidebar = () => {
  return (
    <div className="sidebar">
        <div className="top">
            <span className="logo">
                Proctor Assistant
                
            </span>
        </div>
        <hr />
        <div className="center">
            <ul>
                <p className="title">MAIN</p>
                <li>
                    <DashboardIcon className="icon"/>
                    <span> Dashboard</span>
                </li>
                
                <p className="title">STAFF</p>
                <li>              
                    <EditCalendarIcon className="icon"/>       
                    <span> Final Exam Scheduler</span>                 
                </li>
                <li>                     
                    <EngineeringIcon className="icon"/>                     
                    <span> Classroom Manager</span>                 
                </li>

                <p className="title">STUDENT</p>
                <li>                                   
                    <CalendarMonthIcon className="icon"/>                            
                    <span> Calendar</span>                                  
                </li>                 
                <li>                                          
                    <EngineeringIcon className="icon"/>                                          
                    <span> Classroom Finder</span>                                  
                </li>
    
            </ul>
        </div>
        <div className="bottom">
            <div className="colorOption"></div>
            <div className="colorOption"></div>
            
        </div>


    </div>
  )
}

export default Sidebar
import './App.css';
import Navbar from './components/admin-panel/navbar/navbar';
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect} from 'react';
import { useBeforeunload } from 'react-beforeunload';
import Employeedetail from './components/admin-panel/employeedetail/employeedetail';
import Login from './components/admin-panel/login/login'
import Dashboard from './components/admin-panel/dashboard/dashboard'
import Addemployee from './components/admin-panel/addemployee/addemployee';
import Markattendance from './components/user-panel/markattendance/markattendance'
import Module from './components/admin-panel/attendancemodule/module';
import Attendancedetail from './components/admin-panel/attendancedetail/attendancedetail';
import Multipleuser from './components/admin-panel/multipleusers/multipleuser';
import Tasksadmin from './components/admin-panel/Tasksadmin/Tasksadmin';
import Editemployee from './components/admin-panel/editemployee/editemployee';
import Listviewleaves from './components/admin-panel/leavesstatus/listviewleaves';
import Leavestatus from './components/admin-panel/leavestatus/leavestatus';
import Leavereq from './components/admin-panel/leaverequest/leavereq'
import Checkleaves from './components/admin-panel/checkleaves/checkleaves';
import Adminleaveslist from './components/admin-panel/adminleavelist/leaveslist';
import Adminapprovedleaves from './components/admin-panel/adminapprovedleaves/approvedleaves';
import Rejectedleavelist from './components/admin-panel/adminrejectedleavelist/rejectedleavelist';
import Adminrejectedleaves from './components/admin-panel/adminrejectedleaves/rejectedleaves';
import Todaypendingtasklist from './components/admin-panel/todaypendingtask/todaypending';
import Todaypendingdetail from './components/admin-panel/todaypenidngdetail/todaytaskdetail';
import Monthlypending from './components/admin-panel/monthlypendingtask/monthlypending';
import Monthlypendinglist from './components/admin-panel/monthlypendingtasklist/monthlypendinglist';
import Todayaccepteddetail from './components/admin-panel/todayacceptedtasks/todayaccepted';
import Todayacceptedlist from './components/admin-panel/todayacceptedtasklist/todayacceptedlist';
import Monthlyacceptedlist from './components/admin-panel/monthlyacceptedtasklist/monthlyacceptedlist';
import Monthlyaccepteddetail from './components/admin-panel/monthlyacceptedtask/monthlyaccepteddetail';
import Todayrejectdetail from './components/admin-panel/todayrejecttask/todayrejectdetail';
import Todayrejectlist from './components/admin-panel/todayrejectedlist/todayrejectlist';
import Monthlyrejecteddetail from './components/admin-panel/monthlyrejected/monthlyrejecteddetail'
import Monthlyrejectlist from './components/admin-panel/monthlyrejectedtasklist/monthlyrejectedlist'
import Completedtasklist from './components/admin-panel/todaycompletedtasklist/completedtask';
import Completedtaskdetail from './components/admin-panel/todaycompletedtaskdetail/completedtaskdetail';
import Monthlycompletedlist from './components/admin-panel/monthlycompletedtasklist/monthlycompleted';
import Monthlycompleteddetail from './components/admin-panel/monthlycompletedtaskdetail/monthlycompleteddetail';
                      // userpanel

import Pendinglist from './components/user-panel/pendingtasklist/pendinglist';
import Pendingtaskdetail from './components/user-panel/userstaskstatus/pendingtask';
import Taskstatus from './components/user-panel/Taskstatus/taskstatus';
import Attendancemultipleusers from './components/admin-panel/attendancemultipleusers/attendancemultipleusers';
import Userattendancedetail from './components/admin-panel/userattendancedetail/userattendancedetail';
import Usertasks from './components/user-panel/userTasks/usertasks';
import Checkout from './components/user-panel/checkout/checkout';
import Confirmcheckout from './components/user-panel/confirmcheckout/confirmcheckout';
import Applyleave from './components/user-panel/applyfor leave/applyleave';
import Pendingleaves from './components/user-panel/pendingleaves/pendingleaves';
import Approvedleaves from './components/user-panel/approvesleaves/approvedleaves';
import Rejectedleaves from './components/user-panel/rejectedleaves/rejectedleaves';
import Taskrejectreason from './components/user-panel/rejectreason/taskrejectreason';
import Yesterdaytask from './components/user-panel/yesterdaypendingtasks/yesterdaytask';
import Yesterdaypending from './components/user-panel/yesterdaydetailpending/yesterdaypending';
import Todayacceptedtask from './components/user-panel/Todayacceptedtasklist/acceptedtask';
import Todayacceptdetail from './components/user-panel/todayacceptedtaskdetail/detailtask';
import Yesterdayaccept from './components/user-panel/yesterdaydetailaccept/yesterdayaccept';
import Yesterdaydetailaccept from './components/user-panel/yesterdaylistaccept/yesterdaydetailaccept';
import Todaycompletedtask from './components/user-panel/todaycompletedtasklist/todaycompletedtask';
import Todaycompletetaskdetail from './components/user-panel/todaycompletedtaskdetail/completedtaskdetail'
import Yesterdaycompleted from './components/user-panel/yesterdaycompletedtsk/yesterdaycompleted';
import Yesterdaycompletelist from './components/user-panel/yesterdaycompletedlist/yesterdaycompletelist';
import Todayrejected from './components/user-panel/todayrejectedtasks/todayrejected';
import Todayrejectedlist from './components/user-panel/todayrejectedlist/rejectedlist';
import Yesterdayrejectlist from './components/user-panel/yesterdayrejectedlist/yesterdayrejectlist';
import Yesterdayrejectdetail from './components/user-panel/yesterdayrejectdetail/rejectdetail';
import Assigntasklist from './components/admin-panel/assigntasklist/assigntask';
import Assigntaskdetail from './components/admin-panel/assigntaskdetail/assigntaskdetail'
import Dailyattendance from './components/user-panel/dailyattendanceemployee/dailyattendance'
import Dailyattendancedetail from './components/user-panel/dailyattendancedetail/dailyattendancedetail';
import Yesterdayattendance from './components/user-panel/yesterdayattendancelist/yesterdayattendance';
import Yesterdayattendancedetail from './components/user-panel/yesterdayattendancedetail/yesterdayattendancedetail';
import { useNavigate, } from 'react-router-dom';
import Cookie from 'react-cookies'
function App() {
  const Navigate = useNavigate();
  const Location = useLocation();
  useEffect(() => {
    const token = Cookie.load('token')    
    if (token !== undefined) {
      Navigate('/')
    }else{
      Navigate('/login')
    }
  }, [])
 
   useBeforeunload ((event)=>{
    event.preventDefault();

   })
  return (
    <>
      {(Location.pathname !== "/login") && <Navbar />}

      <Routes>
        <Route exact path='/login' element={<Login />} />
        <Route path='/' element={<Dashboard />} />
        <Route path='/empdetail/:id' element={<Employeedetail />} />
        <Route path='/addemployee' element={<Addemployee />} />
        <Route path='/editemployee/:id' element={<Editemployee />} />
        <Route path='/adminattendancedetail/:id' element={<Attendancedetail />} />
        <Route path='/attendance/' element={<Module />} />
        <Route path='/markattendance/' element={<Markattendance />} />
        <Route path='/listview' element={<Multipleuser />} />
        <Route path='/attendancelistview' element={<Attendancemultipleusers />} />
        <Route path='/attendancedetail/:id' element={<Userattendancedetail />} />
        <Route path='/Tasksadmin/' element={< Tasksadmin />} />
        <Route path='/Tasksuser/' element={< Usertasks />} />
        <Route path='/checkout/' element={<Checkout />} />
        <Route path='/confirmcheckout/' element={<Confirmcheckout />} />
        <Route path='/leaveslistview/' element={<Listviewleaves />} />
        <Route path='/leavestatus/:id' element={<Leavestatus/>} />
        <Route path='/leavereq/:id' element={<Leavereq/>} />
        <Route path='/applyleave/' element={<Applyleave/>} />
        <Route path='/viewpendingleave/' element={<Pendingleaves/>} />
        <Route path='/viewapprovedleave/' element={<Approvedleaves/>} />
        <Route path='/viewrejectedleave/' element={<Rejectedleaves/>} />
        <Route path='/leavestatusadmin/' element={<Checkleaves/>} />
        <Route path='/adminapproveleaves/' element={<Adminleaveslist/>} />
        <Route path='/adminapproveleavesdetail/:id' element={<Adminapprovedleaves/>} />
        <Route path='/adminrejectedleaves' element={<Rejectedleavelist/>} />
        <Route path='/adminrejectedleaves/:id' element={<Adminrejectedleaves/>} />
        <Route path='/dailyattendance/list' element={<Dailyattendance/>} />
        <Route path='/dailyattendance/detail/:id' element={<Dailyattendancedetail/>} />
        <Route path='/yesterdatattendance/list' element={<Yesterdayattendance/>} />
        <Route path='/yesterdatattendance/detail/:id' element={<Yesterdayattendancedetail/>} />

                    {/* User Pending Tasks Routes */}
        <Route path='/yesterdaytasks/' element={<Yesterdaytask/>} />
        <Route path='/pendinglist/' element={<Pendinglist/>} />
        <Route path='/pendingtaskdetail/:id' element={<Pendingtaskdetail/>} />
        <Route path='/reasonreject/:id' element={<Taskrejectreason/>} />
        <Route path='/yesterdaydetail/:id' element={<Yesterdaypending/>} />
                  {/* User Accepted Tasks Routes */}
         <Route path='/accepted/list/' element={<Todayacceptedtask/>} />
         <Route path='/accepted/detail/:id' element={<Todayacceptdetail/>} />
         <Route path='/taskstatus/:id' element={<Taskstatus/>} />
         <Route path='/acceptedyesterday/' element={<Yesterdayaccept/>} />
         <Route path='/accepteddetail/:id' element={<Yesterdaydetailaccept/>} />
                   {/* User Completed Tasks Routes */}
         <Route path='/completed/today' element={<Todaycompletedtask/>} />
         <Route path='/completed/detail/:id' element={<Todaycompletetaskdetail/>} />
         <Route path='/completed/yesterday' element={<Yesterdaycompletelist/>} />
         <Route path='/yesterdaycompleted/detail/:id' element={<Yesterdaycompleted/>} />
                 {/* User Rejected Tasks Routes */}
          <Route path='/rejected/today' element={<Todayrejectedlist/>} />
         <Route path='/rejected/detail/:id' element={<Todayrejected/>} />
         <Route path='/rejected/yesterday' element={<Yesterdayrejectlist/>} />
         <Route path='/yesterdayrejected/detail/:id' element={<Yesterdayrejectdetail/>} />
                 {/* Admin Pending Tasks Routes */}
         <Route path='/admin/pendingtasks' element={<Todaypendingtasklist/>} />
         <Route path='/admin/pendingtasks/detail/:id' element={<Todaypendingdetail/>} />     
         <Route path='/admin/pendingtasks/monthly' element={<Monthlypendinglist/>} />
         <Route path='/admin/pendingtasks/monthlydetail/:id' element={<Monthlypending/>} />  
                  {/* Admin Accepted Tasks Routes */}   
           <Route path='/admin/acceptedtasks' element={<Todayacceptedlist/>} />
         <Route path='/admin/acceptedtasks/detail/:id' element={<Todayaccepteddetail/>} />  
         <Route path='/admin/acceptedtasks/monthly' element={<Monthlyacceptedlist/>} />
         <Route path='/admin/acceptedtasks/monthlydetail/:id' element={<Monthlyaccepteddetail/>} /> 
                  {/* Admin Rejected Tasks Routes */}  
         <Route path='/admin/rejectedtasks' element={<Todayrejectlist/>} />
         <Route path='/admin/rejectedtasks/detail/:id' element={<Todayrejectdetail/>} />  
         <Route path='/admin/rejectedtasks/monthly' element={<Monthlyrejectlist/>} />
         <Route path='/admin/rejectedtasks/monthlydetail/:id' element={<Monthlyrejecteddetail/>} /> 
                  {/* Admin Rejected Tasks Routes */} 
        <Route path='/admin/completedtasks' element={<Completedtasklist />} />
         <Route path='/admin/completedtasks/detail/:id' element={<Completedtaskdetail/>} />  
         <Route path='/admin/completedtasks/monthly' element={<Monthlycompletedlist/>} />
         <Route path='/admin/completedtasks/monthlydetail/:id' element={<Monthlycompleteddetail/>} /> 
                   {/* Admin Rejected Tasks Routes */} 
        <Route path='/admin/assigntask' element={<Assigntasklist />} />
         <Route path='/admin/assigntask/detail/:id' element={<Assigntaskdetail/>} /> 
      </Routes>

    </>
  );
}

export default App;

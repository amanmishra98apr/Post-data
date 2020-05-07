var tblhrmdailyrosterattendance = require("../models/tbl_hrm_daily_roster_attendance")
var tblhrmemployeedetails = require("../models/tbl_hrm_employee_details")
var tblemployeedesignations = require("../models/tbl_employee_designations")
var tblemployeedepartments = require("../models/tbl_employee_departments")
var tblhrmemployeeleavetrack = require("../models/tbl_hrm_employee_leave_track")
var tblhrmlogs = require("../models/tbl_hrm_logs")
const sequalize = require("../common/dbconfig").sequelize;
const Sequalize = require("sequelize");




// Find in employee leave table

exports.userAttendance = (req, res, next) => {
tblhrmdailyrosterattendance = tblhrmdailyrosterattendance(sequalize, Sequalize)
tblhrmdailyrosterattendance.findAll({
          offset:(req.body.Page_No-1)*10,limit:10,

          where:{
            emp_id:req.body.Emp_Id
          }

      }).then(a_users => {
          console.log('done attendance');
          tblhrmemployeedetails = tblhrmemployeedetails(sequalize, Sequalize)
          tblhrmemployeedetails.findAll({
          //  offset:(req.body.Page_No-1)*10,limit:10,


            where:{
              id:[a_users[0].id,a_users[1].id,a_users[2].id,a_users[3].id,a_users[4].id,a_users[5].id,a_users[6].id,a_users[7].id,a_users[8].id,a_users[9].id]
            }


          }).then(l_users =>{
            console.log("****done leave*****");
            tblemployeedesignations = tblemployeedesignations(sequalize, Sequalize)
            tblemployeedesignations.findAll({
              //offset:(req.body.Page_No-1)*10,limit:10,

            }).then(deg_users =>{
              console.log("****done degination****")
              tblemployeedepartments = tblemployeedepartments(sequalize, Sequalize)
              tblemployeedepartments.findAll({

                //offset:(req.body.Page_No-1)*10,limit:10,
                where:{
                  id:[a_users[0].id,a_users[1].id,a_users[2].id,a_users[3].id,a_users[4].id,a_users[5].id,a_users[6].id,a_users[7].id,a_users[8].id,a_users[9].id]
                }
              }).then(dept_users =>{
                console.log("****done department****")
                tblhrmemployeeleavetrack = tblhrmemployeeleavetrack(sequalize, Sequalize)
                tblhrmemployeeleavetrack.findAll({
                //  offset:(req.body.Page_No-1)*10,limit:10,
                  where:{
                    id:[a_users[0].id,a_users[1].id,a_users[2].id,a_users[3].id,a_users[4].id,a_users[5].id,a_users[6].id,a_users[7].id,a_users[8].id,a_users[9].id]
                  }
                }).then(ltrack_users =>{
                  console.log("****done leave track****")
                    list=[]
                      for(i=0;i<10;i++){
                        if(a_users[i].id<18){
                      list.push({id:a_users[i].id,emp_id:a_users[i].emp_id,city_id:a_users[i].city_id,date:a_users[i].date,checkin_time:a_users[i].checkin_time,checkout_time:a_users[i].checkout_time,attendance_type:a_users[i].attendance_type,absent_type:a_users[i].absent_type,comments:a_users[i].comments,attendance_id:a_users[i].id,hrm_mode:2,grab_id:l_users[i].grab_id,emp_name:l_users[i].employee_firstname,designation:deg_users[i].designation_name,leave_type:ltrack_users[i].leave_type,status:l_users[i].status,duty_hour:new Date(a_users[i].checkin_time).getHours()-new Date(a_users[i].checkout_time).getHours(),department:dept_users[i].department_name})

                    }
                    else if(a_users[i].id>18 && a_users[i].id<49){
                      list.push({id:a_users[i].id,emp_id:a_users[i].emp_id,city_id:a_users[i].city_id,date:a_users[i].date,checkin_time:a_users[i].checkin_time,checkout_time:a_users[i].checkout_time,attendance_type:a_users[i].attendance_type,absent_type:a_users[i].absent_type,comments:a_users[i].comments,attendance_id:a_users[i].id,hrm_mode:2,grab_id:l_users[i].grab_id,emp_name:l_users[i].employee_firstname,designation:deg_users[i].designation_name,leave_type:ltrack_users[i].leave_type,status:l_users[i].status,duty_hour:new Date(a_users[i].checkin_time).getHours()-new Date(a_users[i].checkout_time).getHours()})
                    }
                    else if(a_users[i].id>49 && a_users[i].id<249){
                      list.push({id:a_users[i].id,emp_id:a_users[i].emp_id,city_id:a_users[i].city_id,date:a_users[i].date,checkin_time:a_users[i].checkin_time,checkout_time:a_users[i].checkout_time,attendance_type:a_users[i].attendance_type,absent_type:a_users[i].absent_type,comments:a_users[i].comments,attendance_id:a_users[i].id,hrm_mode:2,grab_id:l_users[i].grab_id,emp_name:l_users[i].employee_firstname,leave_type:ltrack_users[i].leave_type,status:l_users[i].status,duty_hour:new Date(a_users[i].checkin_time).getHours()-new Date(a_users[i].checkout_time).getHours()})
                    }
                    else if(a_users[i].id>249 && a_users[i].id<16838){
                      list.push({id:a_users[i].id,emp_id:a_users[i].emp_id,city_id:a_users[i].city_id,date:a_users[i].date,checkin_time:a_users[i].checkin_time,checkout_time:a_users[i].checkout_time,attendance_type:a_users[i].attendance_type,absent_type:a_users[i].absent_type,comments:a_users[i].comments,attendance_id:a_users[i].id,hrm_mode:2,leave_type:ltrack_users[i].leave_type,duty_hour:new Date(a_users[i].checkin_time).getHours()-new Date(a_users[i].checkout_time).getHours()})
                    }
                    else if(a_users[i].id>16838){
                      list.push({id:a_users[i].id,emp_id:a_users[i].emp_id,city_id:a_users[i].city_id,date:a_users[i].date,checkin_time:a_users[i].checkin_time,checkout_time:a_users[i].checkout_time,attendance_type:a_users[i].attendance_type,absent_type:a_users[i].absent_type,comments:a_users[i].comments,attendance_id:a_users[i].id,hrm_mode:2,duty_hour:new Date(a_users[i].checkin_time).getHours()-new Date(a_users[i].checkout_time).getHours()})
                    }


                    }
                    //console.log(list);
                    res.json(list);
                })
              })
            })
          })
        });

}




/*exports.userAttendance = (req, res, next) => {
        tblhrmdailyrosterattendance = tblhrmdailyrosterattendance(sequalize, Sequalize)
        tblhrmdailyrosterattendance.findAll({
          where:{
          emp_id:req.body.Emp_Id
    },
          offset:(req.body.Page_No-1)*20,limit:20,
      }).then(users => {
        list=[]
          for(i=0;i<20;i++){
          list.push({id:users[i].id,emp_id:users[i].emp_id,date:users[i].date,checkin_time:users[i].checkin_time,checkout_time:users[i].checkout_time,attendance_type:users[i].attendance_type,absent_type:users[i].absent_type,comments:users[i].comments,duty_hour:new Date(users[i].checkin_time).getHours()-new Date(users[i].checkout_time).getHours()})

        }
          res.json(list);

        });
}*/

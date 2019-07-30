import React from 'react'
import FirebaseFunctions,{ unlockSchedule } from '../functions/FirebaseConnections';
import * as DateFunctions from '../functions/DateFunctions'

export const DataContext = React.createContext()

export default class DataProvider extends React.Component {
    state = {
        appName: "Test Yo",
        Users: {
            Users: []
        },
        Settings: {
            StartDate: DateFunctions.getStartOfWeek(new Date()),
            EndDate: DateFunctions.getEndOfWeek(new Date()),
            Shifts: []
        },
        Schedules: {
            Schedules:[],
            DaysOff:[]
        }
    }

    UserData = {
        AddUser: (user) => {
            this.setState({
                Users: {
                    ...this.state.Users,
                    Users: this.state.Users.Users.concat(user)
                }
            })
        },
        UpdateUser: (User) => {
            this.setState({
                Users:{
                        ...this.state.Users,
                        Users: this.state.Users.Users.map((user)=>{if(user.id===User.id){return(User)}return(user)})
                }
            })
        },
        RemoveUser: (User) => {
            this.setState({
                Users:{
                    Users:{
                        ...this.state.Users,
                        Users: this.state.Users.Users.filter((user)=>user.id!==User.id)
                    }
                }
            })
        }
    }

    ScheduleData = {
        AddSchedule: (schedule) => {
            this.setState({
                Schedules: {
                    ...this.state.Schedules,
                    Schedules: this.state.Schedules.Schedules.concat(schedule)
                }
            })
        },
        UpdateSchedule: (Schedule) => {
            this.setState({
                Schedules: {
                ...this.state.Schedules,
                Schedules: this.state.Schedules.Schedules.map((schedule)=>{if(schedule.id===Schedule.id){return(Schedule)}return(schedule)})
                }
            })
        },
        RemoveSchedule: (Schedule) => {
            this.setState({
                Schedules: {
                ...this.state.Schedules,
                Schedules: this.state.Schedules.Schedules.filter((schedule)=>schedule.id!==Schedule.id)
                }
            })
        },
        AddRequestOff: (request)=>{
            this.setState({
                Schedules:{
                ...this.state.Schedules,
                DaysOff: this.state.Schedules.DaysOff.concat(request)
                }
            })
        },
        UpdateRequestOff: (newRequest) => {
            this.setState({
                Schedules: {
                ...this.state.Schedules,
                DaysOff:this.state.Schedules.DaysOff.map((Request)=>{
                    if(Request.id===newRequest.id){
                        return(newRequest)
                    }else{
                        return(Request)
                    }
                        
                    })
                }
            })
        },
        RemoveRequestOff: (request) => {
            this.setState({
                Schedules: {
                ...this.state.Schedules,
                DaysOff: this.state.Schedules.DaysOff.filter((Request)=>request.id!==Request.id)
                }
            })
        },
        AddShiftTimes:(shift)=>{
            this.setState({
                Settings:{
                    ...this.state.Settings,
                    Shifts:this.state.Settings.Shifts.concat(shift)
                }
            })
        }
    }

    componentDidMount() {
        const UserFunctions = {
            AddUser:this.UserData.AddUser,
            UpdateUser:this.UserData.UpdateUser,
            RemoveUser:this.UserData.RemoveUser,
            SetShift:this.UserData.SetShift
        }

        const ScheduleFunctions = {
            AddSchedule:this.ScheduleData.AddSchedule,
            UpdateSchedule:this.ScheduleData.UpdateSchedule,
            RemoveSchedule:this.ScheduleData.RemoveSchedule,
            AddRequestOff:this.ScheduleData.AddRequestOff,
            UpdateRequestOff:this.ScheduleData.UpdateRequestOff,
            RemoveRequestOff:this.ScheduleData.RemoveRequestOff,
            AddShiftTimes:this.ScheduleData.AddShiftTimes
        }

        this.firebaseFunctions = new FirebaseFunctions(UserFunctions,ScheduleFunctions)
        this.firebaseFunctions.getUsers()
        this.firebaseFunctions.getShifts()
        this.firebaseFunctions.getSchedules(this.state.Settings.StartDate,this.state.Settings.EndDate)
        this.firebaseFunctions.getRequestOff(this.state.Settings.StartDate,this.state.Settings.EndDate)
    }

    render() {
        return <DataContext.Provider value={{
            state: this.state,
            setSchedule:(Schedule)=>{
                var start = new Date(Schedule.date)
                var end = new Date(Schedule.date)
                start.setHours(Schedule.StartDate)
                start.setMinutes(0)
                start.setSeconds(0)
                start.setMilliseconds(0)
                end.setMinutes(0)
                end.setSeconds(0)
                end.setMilliseconds(0)
                end.setHours(Schedule.EndDate)
                if(end.getHours()<start.getHours()){
                    end.setDate(end.getDate()+1)
                }
                Schedule.StartTime = start
                Schedule.EndTime = end
                this.firebaseFunctions.setSchedule(Schedule)},
            unlockSchedule:(Schedule)=>{
                console.log("schedule removed lock",Schedule)
                this.firebaseFunctions.setSchedule(Schedule)
                unlockSchedule(Schedule)
            },
            changeDate:(StartDate,EndDate)=>{
                this.setState({
                    Settings:{
                        ...this.state.Settings,
                        StartDate:StartDate,
                        EndDate:EndDate
                        } 
                    })
                this.firebaseFunctions.getSchedules(StartDate,EndDate)
                this.firebaseFunctions.getRequestOff(StartDate,EndDate)
            }
        }}>
            {this.props.children}
        </DataContext.Provider>
    }
}
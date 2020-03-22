import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Moment from 'moment'

const Timeline = props => (
    <tr>
        <td>{props.iTimeLn.record_date}</td>
        <td>{props.iTimeLn.total_cases}</td>
        <td>{props.exercise.new_cases}</td>
        <td>{props.exercise.active_cases}</td>
        <td>{props.exercise.active_cases}</td>
        <td>{props.exercise.active_cases}</td>
    </tr>
)

export default class World extends Component{
    constructor(props){
        super(props)
        this.state = {
            wStats: [],
            date: new Date().toString("hh:mm tt"),
            iStats: [],
            iTimeLn: [],
            stat_by_country: [],
            afctdCountries: []
        }
    }

    componentDidMount(){
        axios({
            "method":"GET",
            "url":"https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php",
            "headers":{
            "content-type":"application/octet-stream",
            "x-rapidapi-host":"coronavirus-monitor.p.rapidapi.com",
            "x-rapidapi-key":"a06c518be4msh8e150bdf583520cp12f4c9jsn078cceab1e31"
            }
            })
            .then((response)=>{
                this.setState({wStats: response.data})
            })
            .catch((error)=>{
              console.log(error)
            })

            axios({
                "method":"GET",
                "url":"https://coronavirus-monitor.p.rapidapi.com/coronavirus/latest_stat_by_country.php",
                "headers":{
                "content-type":"application/octet-stream",
                "x-rapidapi-host":"coronavirus-monitor.p.rapidapi.com",
                "x-rapidapi-key":"a06c518be4msh8e150bdf583520cp12f4c9jsn078cceab1e31"
                },"params":{
                "country":"india"
                }
                })
                .then(response => {
                        this.setState({
                            iStats: response.data.latest_stat_by_country[0]

                        })
                })
                .catch((error)=>{
                  console.log(error)
                })

                axios({
                    "method":"GET",
                    "url":"https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php",
                    "headers":{
                    "content-type":"application/octet-stream",
                    "x-rapidapi-host":"coronavirus-monitor.p.rapidapi.com",
                    "x-rapidapi-key":"a06c518be4msh8e150bdf583520cp12f4c9jsn078cceab1e31"
                    }
                    })
                    .then((response)=>{
                      this.setState({
                        afctdCountries: response.data.countries_stat
                    })
                    })
                    .catch((error)=>{
                      console.log(error)
                    })

                axios({
                    "method":"GET",
                    "url":"https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_particular_country.php",
                    "headers":{
                    "content-type":"application/octet-stream",
                    "x-rapidapi-host":"coronavirus-monitor.p.rapidapi.com",
                    "x-rapidapi-key":"a06c518be4msh8e150bdf583520cp12f4c9jsn078cceab1e31"
                    },"params":{
                    "country":"india"
                    }
                    })
                    .then((response)=>{
                      this.setState({
                        iTimeLn: response.data.stat_by_country
                    })
                    })
                    .catch((error)=>{
                      console.log(error)
                    })
    }

    

    render(){
        return(
            <div>
                <aside className="left-sidebar" data-sidebarbg="skin6">
                    
                    <div className="scroll-sidebar" data-sidebarbg="skin6">
                        
                        <nav className="sidebar-nav">
                            <ul id="sidebarnav">
                                <li className="nav-small-cap sidebar-item"><i data-feather="map" className="feather-icon"> </i> <span className="hide-menu" style={{paddingLeft: '0.5rem'}}> Country-wise</span></li>
                                {this.state.afctdCountries.map((afctcontri) => {
                                    return (
                                        <li className="sidebar-item"> 
                                            <a className="sidebar-link" href={"/country/"+afctcontri.country_name} aria-expanded="false">
                                                <span className="hide-menu text-left">{afctcontri.country_name} ({afctcontri.cases})<br />
                                                    <small className="text-left">Deaths: {afctcontri.deaths}</small>
                                                </span>
                                            </a>
                                        </li>
                                    )
                                    })
                                }
                                
                            </ul>
                        </nav>
                        
                    </div>
                    
                </aside>
                <div className="page-wrapper">
                    <div className="page-breadcrumb">
                        <div className="row">
                            <div className="col-7 align-self-center text-left">
                                <h3 className="page-title text-truncate text-dark font-weight-medium mb-1">Corona Worldwide Stats</h3>
                                <div className="d-flex align-items-center">
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb m-0 p-0">
                                            <li className="breadcrumb-item"><a href="index.html">Dashboard</a>
                                            </li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                            <div className="col-5 align-self-center">
                                <div className="customize-input float-right">
                                    <span className="custom-select custom-select-set text-dark form-control bg-white border-0 custom-shadow custom-radius">
                                        As On: {Moment(this.state.wStats.statistic_taken_at).format("ddd MMM DD YYYY")}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid">
                        <div className="card-group">
                            <div className="card border-right">
                                <div className="card-body">
                                    <div className="d-flex d-lg-flex d-md-block align-items-center">
                                        <div>
                                            <div className="d-inline-flex align-items-center">
                                                <h2 className="text-dark mb-1 font-weight-medium">{this.state.wStats.total_cases}</h2>
                                            </div>
                                            <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">Total Cases</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card border-right">
                                <div className="card-body">
                                    <div className="d-flex d-lg-flex d-md-block align-items-center">
                                        <div>
                                            <h2 className="text-dark mb-1 w-100 text-truncate font-weight-medium">{this.state.wStats.total_recovered}</h2>
                                            <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">Recovered
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card border-right">
                                <div className="card-body">
                                    <div className="d-flex d-lg-flex d-md-block align-items-center">
                                        <div>
                                            <div className="d-inline-flex align-items-center">
                                                <h2 className="text-dark mb-1 font-weight-medium">{this.state.wStats.new_cases}</h2>
                                            </div>
                                            <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">New Cases</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex d-lg-flex d-md-block align-items-center">
                                        <div>
                                            <h2 className="text-dark mb-1 font-weight-medium">{this.state.wStats.total_deaths}</h2>
                                            <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">Total Deaths</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="page-breadcrumb">
                            <div className="row">
                                <div className="col-7 align-self-center text-left">
                                    <h3 className="page-title text-truncate text-dark font-weight-medium mb-1">Corona India Stats</h3>
                                    <div className="d-flex align-items-center mb-4">
                                        <nav aria-label="breadcrumb">
                                            <ol className="breadcrumb m-0 p-0">
                                                <li className="breadcrumb-item"><a href="index.html">Dashboard</a>
                                                </li>
                                            </ol>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-group">
                            <div className="card border-right">
                                <div className="card-body">
                                    <div className="d-flex d-lg-flex d-md-block align-items-center">
                                        <div>
                                            <div className="d-inline-flex align-items-center">
                                                <h2 className="text-dark mb-1 font-weight-medium">{this.state.iStats.total_cases}</h2>
                                            </div>
                                            <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">Total Cases</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card border-right">
                                <div className="card-body">
                                    <div className="d-flex d-lg-flex d-md-block align-items-center">
                                        <div>
                                            <h2 className="text-dark mb-1 w-100 text-truncate font-weight-medium">{this.state.iStats.active_cases}</h2>
                                            <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">Active Cases
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card border-right">
                                <div className="card-body">
                                    <div className="d-flex d-lg-flex d-md-block align-items-center">
                                        <div>
                                            <div className="d-inline-flex align-items-center">
                                                <h2 className="text-dark mb-1 font-weight-medium">{this.state.iStats.new_cases}</h2>
                                            </div>
                                            <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">New Cases</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex d-lg-flex d-md-block align-items-center">
                                        <div>
                                            <h2 className="text-dark mb-1 font-weight-medium">{this.state.iStats.total_recovered === "" ? '0' : this.state.iStats.total_recovered}</h2>
                                            <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">Recovered Cases</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-group">
                            <div className="card border-right">
                                <div className="card-body">
                                    <div className="d-flex d-lg-flex d-md-block align-items-center">
                                        <div>
                                            <div className="d-inline-flex align-items-center">
                                                <h2 className="text-dark mb-1 font-weight-medium">{this.state.iStats.serious_critical === "" ? '0' : this.state.iStats.serious_critical}</h2>
                                            </div>
                                            <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">Critical Cases</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card border-right">
                                <div className="card-body">
                                    <div className="d-flex d-lg-flex d-md-block align-items-center">
                                        <div>
                                            <h2 className="text-dark mb-1 w-100 text-truncate font-weight-medium">{this.state.iStats.new_deaths === "" ? '0' : this.state.iStats.new_deaths}</h2>
                                            <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">New Deaths
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex d-lg-flex d-md-block align-items-center">
                                        <div>
                                            <div className="d-inline-flex align-items-center">
                                                <h2 className="text-dark mb-1 font-weight-medium">{this.state.iStats.total_deaths}</h2>
                                            </div>
                                            <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">Total Deaths</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="d-flex align-items-center mb-4">
                                            <h4 className="card-title">Timeline <small>(India)</small></h4>
                                        </div>
                                        <div className="table-responsive">
                                            <table className="table no-wrap v-middle mb-0">
                                                <thead>
                                                    <tr className="border-0">
                                                        <th className="border-0 font-14 font-weight-medium text-muted">Date
                                                        </th>
                                                        <th className="border-0 font-14 font-weight-medium text-muted px-2">Time
                                                        </th>
                                                        <th className="border-0 font-14 font-weight-medium text-muted">New Cases</th>
                                                        <th className="border-0 font-14 font-weight-medium text-muted text-center">
                                                            Total Cases
                                                        </th>
                                                        <th className="border-0 font-14 font-weight-medium text-muted text-center">
                                                            New Deaths
                                                        </th>
                                                        <th className="border-0 font-14 font-weight-medium text-muted">Total Deaths</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {this.state.iTimeLn.reverse().map((TmLnObj) => {
                                                    return (
                                                        <tr>
                                                                <td>{Moment(TmLnObj.record_date).format("ddd MMM DD YYYY")}</td>
                                                                <td>{Moment(TmLnObj.record_date).format("hh:mm a")}</td>
                                                                <td className="text-center font-weight-medium text-muted px-2 py-4">
                                                                    <div className="popover-icon text-center">
                                                                        <a className={TmLnObj.new_cases === "" ? '"btn btn-success rounded-circle btn-circle font-12 popover-item"' : '"btn btn-danger rounded-circle btn-circle font-12 popover-item"'}
                                                                            href="javascript:void(0)">{TmLnObj.new_cases === "" ? '0' : TmLnObj.new_cases}</a>
                                                                    </div>
                                                                </td>
                                                                <td>{TmLnObj.total_cases === "" ? '0' : TmLnObj.total_cases}</td>
                                                                <td className="text-center font-weight-medium text-muted px-2 py-4">
                                                                    <div className="popover-icon text-center">
                                                                        <a className={TmLnObj.new_deaths === "" ? '"btn btn-success rounded-circle btn-circle font-12 popover-item"' : '"btn btn-danger rounded-circle btn-circle font-12 popover-item"'}
                                                                            href="javascript:void(0)">{TmLnObj.new_deaths === "" ? '0' : TmLnObj.new_deaths}</a>
                                                                    </div>
                                                                </td>
                                                                <td>{TmLnObj.total_deaths === "" ? '0' : TmLnObj.total_deaths}</td>
                                                            </tr>
                                                    )
                                                     })
                                                }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
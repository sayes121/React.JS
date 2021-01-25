import React,{Component} from 'react';
import {Breadcrumb, BreadcrumbItem,Button,Label} from 'reactstrap'; 
import {Link} from 'react-router-dom';
import Loading from './LoadingComponent';
//import {PARTICULARSTOCK} from '../shared/historyData';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import {Line} from 'react-chartjs-2';


 
class StockDetails extends Component {
constructor(props) {
    super(props);
     this.state = {
        columnDefs: [{
            headerName: "Date", 
            field: "timestamp",
            filter:"agDateColumnFilter",
              filterParams: {
            comparator: function(filterLocalDateAtMidnight, cellValue) {
              var dateAsString = cellValue;
              var dateParts = dateAsString.split('/');
              var cellDate = new Date(
                Number(dateParts[2]),
                Number(dateParts[1]) - 1,
                Number(dateParts[0])
              );
              if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
                return 0;
              }
              if (cellDate < filterLocalDateAtMidnight) {
                return -1;
              }
              if (cellDate > filterLocalDateAtMidnight) {
                return 1;
              }
            },
          },
            
           },
          {
            headerName: "Open", field: "open", filter: 'agNumberColumnFilter',
          },{
            headerName: "High", field: "high",  filter: 'agNumberColumnFilter',
          },
          {
            headerName: "Low", field: "low",  filter: 'agNumberColumnFilter',
          },
          {
            headerName: "Close", field: "close",  filter: 'agNumberColumnFilter',
          },
          {
            headerName: "Volumes", field: "volumes",  filter: 'agNumberColumnFilter',
          }
         ],
          rowData:null,
          defaultColDef: {
            flex: 1,
            sortable: true,
            filter: true,
            floatingFilter: true,
            resizable: true,
            },
          LineData:null,
          selectedValue:'',
          dropDownData:[]
    }
    this.handleClick=this.handleClick.bind(this);
    this.handleReset=this.handleReset.bind(this);
}

DateConveter=(timestamp)=>{
 var localDate = new Date(timestamp).toLocaleDateString("en-GB", { 
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
 return localDate;
}
ObjectReformat=(data)=>{
      if(data!==null){
      return data.map(item => {
        const obj = Object.assign({}, item);
        obj['timestamp'] = new Date(obj['timestamp']).toLocaleDateString("en-GB", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
        return obj;
      }); 
    }
         
    }
 

componentDidMount(){
 this.fetchData();
}

fetchData=()=>{
  const symbolName=this.props.matchParam.stocksSymbol;
  fetch(`http://131.181.190.87:3001/history?symbol=${symbolName}`)
  .then(result => result.json())
  .then(rowData => this.setState({rowData}))
} 
renderGraph(data){
  let reformattingLineData={
    datasets: [
        {
        label: 'Stock Data',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
       
        }
    ]

  } 
  if(data!==null){
    let labelArr=this.state.rowData.map(item=>{
      const date=this.DateConveter(item.timestamp)
      return date
    })
    let dataListArr=this.state.rowData.map(item=>{
    return item.volumes
    })
  
 reformattingLineData['labels']=labelArr;
 reformattingLineData['datasets'][0]['data']=dataListArr;
 return reformattingLineData

}
}
renderName=(data)=>{
    if(data && data!==null){
        return  <p>Showing Stocks for <b>{this.state.rowData[0].name}</b></p>
    }
    else return <Loading />
}

handleClick=()=>{
  const symbolName=this.props.matchParam.stocksSymbol;
  const dateformat=this.state.selectedValue.substring(0,10);
  if(symbolName && dateformat){
    fetch(`http://131.181.190.87:3001/history?symbol=${symbolName}&from=${dateformat}`)
    .then(result => result.json())
    .then(rowData => this.setState({rowData}))
  }
}

handleReset=()=>{
 this.fetchData();
}

render() {
    if(this.state.rowData==null || this.props.matchParam.stocksSymbol!==this.state.rowData[0].symbol){
        return <Loading />
    }
    else{
        return (
            <div className="container">
                <div className="row">
                 <Breadcrumb>
                                <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                                <BreadcrumbItem><Link to="/stocks">Stocks</Link></BreadcrumbItem>
                                <BreadcrumbItem active>Stocks Details</BreadcrumbItem>
                </Breadcrumb>
                </div>
                <div className="row">
                {this.renderName(this.state.rowData)}       
                </div>
              <div className="row" style={{marginBottom:'10px'}}>  
              <Label  md={2}> Search Date from :-</Label>
                <div style={{display:'flex',flexDirection:'row'}}>
                <select value={this.state.selectedValue} onChange={e =>
                    this.setState({
                    selectedValue: e.target.value,
                    validationError:
                    e.target.value === ""
                    ? "You must select your favourite team"
                    : "" })
                    }
                    style={{marginRight:"10px"}}>
                    {this.state.rowData.map(date => (
                      <option
                      key={this.DateConveter(date.timestamp)}
                      value={date.timestamp}
                      >
                      {this.DateConveter(date.timestamp)}
                      </option>
                    ))} 
                  </select>
                    <div>
                    {this.state.validationError}
                    <Button outline color="primary" onClick={this.handleClick}   style={{marginRight:"10px"}}> Search</Button>
                    <Button outline color="secondary" onClick={this.handleReset}> Reset</Button>
                  </div>
                </div>
               
                </div>
          
                <div className="row">
                   <div className="ag-theme-balham"
                    style={{
                    height: '200px',
                    width: '100%'}}
                    >
                    <AgGridReact
                    columnDefs={this.state.columnDefs}
                    rowData={this.ObjectReformat(this.state.rowData)}
                    pagination={true}
                    paginationPageSize={50}
                    defaultColDef={this.state.defaultColDef}>
                    </AgGridReact>
                    </div>
                </div>
              
                <div className="row">
                <div className="chart-container" style={{width:'100%',height:'400px',marginTop:'20px'}}>
                <Line data={this.renderGraph(this.state.rowData)}
                options={{
                title:{
                display:true,
                text:'Closing Price',
                fontSize:10,
                toolTips:'enabled'
                },
                legend:{
                display:true,
                position:'right'
                },
                scales: {
                    xAxes: [{
                      scaleLabel: {
                        display: true,
                        labelString: 'Day'
                      }
                    }],
                    yAxes: [{
                        scaleLabel: {
                          display: true,
                          labelString: 'Volume'
                        }
                      }]
                }
                }}
                />
                </div>
                
               
                </div>
              
            </div>
        );
    
    }
  
    }
}
export default StockDetails;
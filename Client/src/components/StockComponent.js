import React,{Component} from 'react';
import {Breadcrumb, BreadcrumbItem } from 'reactstrap'; 
import {Link} from 'react-router-dom';
//import { baseUrl } from '../shared/baseUrl';
//import {STOCKSDATA} from '../shared/stocksData';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

 
class Stock extends Component {
constructor(props) {
    super(props);
    this.state = {
        selectedDish: null,
        //stocksData:STOCKSDATA,
        columnDefs: [{
            headerName: "Symbol", 
            field: "symbol",
            suppressMenu: true,
            onCellClicked: (item) => {
            this.props.history.push(`/stocks/${item.value}`);
          },
          cellStyle: {color: 'blue', 'text-decoration': 'underline'}
          }, {
            headerName: "Name", field: "name",filter:false
          },{
            headerName: "Industry", field: "industry",suppressMenu: true,
          }],
          rowData:null,
          defaultColDef: {
            flex: 1,
            sortable: true,
            filter: true,
          },
    }
}

componentDidMount() {
  fetch('http://131.181.190.87:3001/all')
  .then(response=>{
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
  })
  .then(response => response.json())
  //.then(rowData => console.log('fetchapi',rowData))
  .then(rowData => this.setState({rowData}))
  .catch(error=> console.log(error))
  }
    


render() {
      return (
        <div className="container">
              <div className="row">
             <Breadcrumb>
                            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Stocks</BreadcrumbItem>
                        </Breadcrumb>
            </div>
            <div className="row">
               <div className="ag-theme-balham"
                style={{
                height: '500px',
                width: '100%'}}
                >
                <AgGridReact
                columnDefs={this.state.columnDefs}
                rowData={this.state.rowData}
                pagination={true}
                paginationPageSize={50}
                floatingFilter={true}
                defaultColDef={this.state.defaultColDef}>
                </AgGridReact>
                </div>
            </div>
          
        </div>
    );
}
}
export default Stock;
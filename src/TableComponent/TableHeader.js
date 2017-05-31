import React,{Component} from 'react';

class TableHeader extends Component{
		 render(){

		 const obj=this.props.headerdata;
		 //console.log("header obj",obj)
		 let headers =[];
			  for(let i in obj){
			  		headers.push(i);
					  
			  }
			let header=  headers.splice(0,5);
			  
         let head= header.map((headers,index)=>
				 <th key={index}>{headers}</th>);
		 	return(
		 <thead>
		 	<tr >
				<th>Choose</th>
                 {head}
				 <th>Action</th>
		 	</tr>
		 </thead>
		 	);
		 }
	}
    export default TableHeader;
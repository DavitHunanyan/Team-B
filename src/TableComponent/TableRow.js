import React, { Component } from 'react';
import '../Fetch.js';

class TableRow extends Component{
		     constructor(props){
			     super(props);
		     this.state={
		                guIdArray:[],
						checkedRow:false
		     			}
			    
				 this.checkBoxOnChange=this.checkBoxOnChange.bind(this);
				
		     }
	    
		 checkBoxOnChange(event){
			 let index = event.target.id;
			 if(event.target.checked === true){
				 this.state.guIdArray.push(this.props.dataArray[index].Guid);
				 
			 }else{
				 for(let i=0;i<this.state.guIdArray.length;++i){

					 if(this.props.dataArray[index].Guid === this.state.guIdArray[i])
					 {
                    this.state.guIdArray.splice(i,1);
					
					 }
					
				 }
			 }
			 this.props.guids(this.state.guIdArray);
			 if(this.state.guIdArray.length === 0){
				this.props.isdisabledprop(true);
			 }else{
				 this.props.isdisabledprop(false);
			 }
			 
			//console.log("GuId Array",this.state.guIdArray);
		 }
		
	     render(){
		     const data=this.props.dataArray
		      const row = data.map((data,index)=>
		     	<tr key={index} ref={index}>
					 <td key={index} id="checkbox">
						 <input type="checkbox" ref={index} id={index} onChange ={this.checkBoxOnChange } defaultChecked={this.state.checkedRow} /> 
					 </td>
			     	<td key={data["Full name"]}>
				     	{data["Full name"]}
			     	</td>
			     	<td key={["Company name"]}>
				     	{data["Company name"]}
				     </td>
					  <td key={data.Position}>
			     	    {data.Position}
			     	</td>
			     	<td key= {data.Country}>
			     	    {data.Country}
			     	</td>
					
			     	<td key={data.Email}>
			     	    {data.Email}
			     	</td>
					 
			     	<td ><button id ={index} onClick={this.props.editBtn} className="editbutton">Edit</button></td>
		     	</tr>
		     	);
		     	return(
		     		<tbody>
		     			{row}
					</tbody>
		     	);
		      

	     }

	}
    export default TableRow;
import React, { Component } from 'react';
import pencil from "./pencil.png";

class TableRow extends Component {
	constructor(props) {
		super(props);

		this.checkBoxOnChange = this.checkBoxOnChange.bind(this);

	}

	checkBoxOnChange(event) {
		this.props.checkBoxChanges(event.target);
		let index = event.target.id;
		if (event.target.checked === true) {
			this.props.guids.push(this.props.dataArray[index].Guid);

		} else {
			for (let i = 0; i < this.props.guids.length; ++i) {

				if (this.props.dataArray[index].Guid === this.props.guids[i]) {
					this.props.guids.splice(i, 1);

				}

			}
		}
		if (this.props.guids.length === 0) {
			this.props.isdisabledprop(true);
		} else {
			this.props.isdisabledprop(false);
		}

		//console.log("GuId Array",this.state.guIdArray);
	}
		
	     render(){
		     const data=this.props.dataArray
		      const row = data.map((data,index)=>
		     	<tr key={index} ref={index}>
					 <td key={index} id="checkbox">
						 <input type="checkbox" ref={index} id={index} onChange ={this.checkBoxOnChange }  /> 
					 </td>
			     	<td key={data["Full name"]+"FN"}>
				     	{data["Full name"]}
			     	</td>
			     	<td key={["Company name"]+"CN"}>
				     	{data["Company name"]}
				     </td>
					  <td key={data.Position + "_P"}>
			     	    {data.Position}
			     	</td>
			     	<td key= {data.Country + "_C"}>
			     	    {data.Country}
			     	</td>
			     	<td key={data.Email + "_E"}>
			     	    {data.Email}
			     	</td>
					 
			     	<td id="pencil"><img  alt="pencil"id ={index} onClick={this.props.editBtn} src={pencil} width="20px" height="20px"/></td>
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
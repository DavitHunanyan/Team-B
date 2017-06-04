import React,{Component} from 'react';
class MailListContacts extends Component {
	constructor(props) {
		super(props);
        this.state={
            data:[]
        }
		
	}

	render(){
         const data=this.props.data;
		      const row = data.map((data,index)=>
		     	<tr key={index} ref={index}>
					 {/*<td key={index} id="checkbox">
						 <input type="checkbox" ref={index} id={index} onChange ={this.checkBoxOnChange }  /> 
					 </td>*/}
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
		     	</tr>
		     	);
		     	return(
                        <div className ="inlineBlock">
							<h3>{this.props.header}</h3>
                            <table>
                                
                                <tbody>
                                    {row}
                                </tbody>
                            </table>
                        </div>
        );
    }
	
	}
    export default MailListContacts;
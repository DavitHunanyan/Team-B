import React,{Component} from 'react';
import del from "./delete.jpg";

class MailListContacts extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: []
		}
		this.deleteContact = this.deleteContact.bind(this);
	}
	deleteContact(event) {
		let self = this;
		return fetch("http://crmbetb.azurewebsites.net/api/MailingLists/remove/" + self.props.MailingListId, {
			method: "PUT",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify([self.props.data[event.target.id].Guid])

		}).then(response => {
			if (response.status === 200) {
				self.props.updateContacts();
				self.props.update();

			}
		}).catch(error => {
			console.log(error);
			alert("Something went wrong");
		})
	}
	render(){

         const data=this.props.data;
		      const row = data.map((data,index)=>
		     	<tr key={index} ref={index}>
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
					 <td>
						 <img src={del} alt="" id={index} onClick={this.deleteContact} width="20px" height="20px"></img>
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
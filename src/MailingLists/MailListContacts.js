import React,{Component} from 'react';
import del from "./delete.jpg";

class MailListContacts extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			delete:false,
			targetId:""
		}
		this.deleteContact = this.deleteContact.bind(this);
		this.deletePopUp = this.deletePopUp.bind(this);
		this.changeDeleteState = this.changeDeleteState.bind(this);
	}
	deleteContact() {
		this.setState({delete:false});
		let self = this;
		return fetch("http://crmbetb.azurewebsites.net/api/MailingLists/remove/" + self.props.MailingListId, {
			method: "PUT",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify([self.props.data[this.state.targetId].Guid])

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
	deletePopUp(){
		
		if(this.state.delete){
			return(
				<div className="deleteBox">
					<div className="deletePopUp">
						<h4>Are you sure?</h4>
						<button className="See_Contacts " onClick={this.deleteContact} >Yes</button>
						<button className="See_Contacts" onClick={this.changeDeleteState}>No</button>
					</div>
				</div>
			)
		}
	}
	changeDeleteState(event){
		//console.log(event.target.id);
		this.setState({
			targetId:event.target.id
		})
		this.setState({delete:true});
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
						 <img id ={index} src={del} alt="" onClick={this.changeDeleteState} width="20px" height="20px"></img> 
						 </td>
		     	</tr>
		     	);
		     	return(
                        <div className ="inlineBlock">
							<h3>{this.props.header}</h3>
							{this.deletePopUp()}
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
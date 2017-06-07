import React,{Component} from 'react';

class Edit extends Component {
	constructor(props) {
		super(props);
		this.save = this.save.bind(this);
	}
	save() {
		let editObj = {
			Fullname: this.refs.fullName.value,
			Companyname: this.refs.companyName.value,
			Position: this.refs.position.value,
			Country: this.refs.country.value,
			Email: this.refs.email.value

		}
		let self = this;
		this.props.save();
			return fetch("http://crmbetb.azurewebsites.net/api/Contacts?Guid="+self.props.data.Guid, {
			method: "PUT",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(editObj)

		}).then(response => {
			//console.log("edit",response);
			if (response.status === 204) {
				self.props.update();
			}
		}).catch(error => {
			console.log(error);
			alert("Something went wrong");
		})
	}
			
			render(){ 
				return(
				<div className="AddRow">
					<div className="AddRoWBox"> 
				    <span>Full Name</span>
					<p>	<input type="text" defaultValue={this.props.data["Full name"]} ref="fullName"/></p>
					<span>Company</span>
					<p> <input type="text"  defaultValue={this.props.data["Company name"]}ref="companyName"/></p>
					<span>Position </span>
					<p><input type="text"  defaultValue={this.props.data.Position} ref="position"/></p>
					<span>Country</span>
					<p><input type="text"  defaultValue={this.props.data.Country} ref="country"/></p>
					<span>Email</span>
					<p><input type="email"  defaultValue={this.props.data.Email} ref="email"/></p>

				    <p><button className="btnAll" id="sendBtn" onClick={this.save}>Save</button>
					<button className="btnAll" id="deleteBtn" onClick={this.props.cancel}>Cancel</button></p>

					</div>
				</div>
				);
			}
	
	}
    export default Edit;
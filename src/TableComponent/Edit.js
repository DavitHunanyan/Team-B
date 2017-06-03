import React,{Component} from 'react';
import call from '../Fetch.js';
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
		//console.log("save edited data",editObj);
		//alert("Save edited contact");
		call('http://crmbetb.azurewebsites.net/api/Contacts?Guid=' + this.props.data.Guid, "PUT", editObj).then(function(data) {
			self.props.update();

		});
		this.props.save();
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

				    <p><button id="sendBtn" onClick={this.save}>Save</button>
					<button className="deleteBtn" onClick={this.props.cancel}>Cancel</button></p>

					</div>
				</div>
				);
			}
	
	}
    export default Edit;
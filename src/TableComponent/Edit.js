import React,{Component} from 'react';

class Edit extends Component {
	constructor(props) {
		super(props);
		this.state={
		    	Fullname:"",
                Companyname:"" ,
                Position:"" ,
                Country: "",
                Email: ""
		}
		this.save = this.save.bind(this);
		this.inputOnChange = this.inputOnChange.bind(this);
	}
	save() {
		let editObj = {
			   Fullname:this.state.Fullname,
               Companyname: this.state.Companyname,
               Position: this.state.Position,
               Country: this.state.Country,
               Email: this.state.Email

		}
		let self = this;
		if(this.state.Fullname!=="" && this.state.Companyname!=="" &&
            this.state.Position!=="" && this.state.Country!=="" && this.Email!=="" ){
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
				self.props.save();
			}
		}).catch(error => {
			console.log(error);
			//alert("Something went wrong");
		})
		}
	}
			inputOnChange(){
				this.setState({
					Fullname: this.refs.fullName.value,
					Companyname: this.refs.companyName.value,
					Position: this.refs.position.value,
					Country: this.refs.country.value,
					Email: this.refs.email.value
				})
			}
			render(){ 
				return(
				<div className="AddRow">
					<div className="AddRoWBox"> 
					<form>
						<span>Full Name</span>
						<p>	<input type="text" defaultValue={this.props.data["Full name"]} ref="fullName" required onChange={this.inputOnChange}/></p>
						<span>Company</span>
						<p> <input type="text"  defaultValue={this.props.data["Company name"]}ref="companyName" required onChange={this.inputOnChange}/></p>
						<span>Position </span>
						<p><input type="text"  defaultValue={this.props.data.Position} ref="position" required onChange={this.inputOnChange}/></p>
						<span>Country</span>
						<p><input type="text"  defaultValue={this.props.data.Country} ref="country" required onChange={this.inputOnChange}/></p>
						<span>Email</span>
						<p><input type="email"  defaultValue={this.props.data.Email} ref="email" required onChange={this.inputOnChange}/></p>

						<p><button className="btnAll" id="sendBtn" onClick={this.save}>Save</button>
						<button className="btnAll" id="deleteBtn" onClick={this.props.cancel}>Cancel</button></p>
					</form>

					</div>
				</div>
				);
			}
	
	}
    export default Edit;
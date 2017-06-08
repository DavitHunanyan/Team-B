import React,{Component} from 'react';
class AddContact extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.saveContact = this.saveContact.bind(this);
    }
    saveContact() {
        if (this.refs.fullName.value && this.refs.companyName.value &&
            this.refs.position.value && this.refs.country.value && this.refs.email.value) {
            let newContact = {
                Fullname: this.refs.fullName.value,
                Companyname: this.refs.companyName.value,
                Position: this.refs.position.value,
                Country: this.refs.country.value,
                Email: this.refs.email.value
            }
            this.props.update();
            let self = this;



            return fetch("http://crmbetb.azurewebsites.net/api/Contacts", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newContact)

            }).then(response => {
                if (response.status === 201) {
                    self.props.update();
                    self.props.back();

                }
                if (response.status === 400) {
                    alert("You are already registersed");
                }
            }).catch(error => {
                alert("Something went wrong");
            })
        } else {
            alert("Not valid contact");
        }
    }
	
		render(){
				
			return(
				<div className="AddRow">
					<div className="AddRoWBox"> 
				    <span>Full Name</span>
					<p>	<input type="text"  ref="fullName"/></p>
					<span>Company</span>
					<p> <input type="text" ref="companyName"/></p>
					<span>Position </span>
					<p><input type="text"   ref="position"/></p>
					<span>Country</span>
					<p><input type="text"   ref="country"/></p>
					<span>Email</span>
					<p><input type="text"   ref="email"/></p>

				    <button  className="btnAll" id="sendBtn" onClick={this.saveContact}>Save</button>
					<button className="btnAll" id="deleteBtn" onClick={this.props.back}>Back</button>
					</div>
				</div>
					
			);
		}
	}	
export default AddContact;
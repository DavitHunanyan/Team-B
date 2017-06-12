import React,{Component} from 'react';
class AddContact extends Component {
    constructor(props) {
        super(props);
        this.state = {
                Fullname:"",
                Companyname:"" ,
                Position:"" ,
                Country: "",
                Email: ""
        };
        this.saveContact = this.saveContact.bind(this);
        this.inputOnChange = this.inputOnChange.bind(this);
    }
    saveContact() {
       // console.log(this.state.Fullname);
        if (this.state.Fullname!=="" && this.state.Companyname!=="" &&
            this.state.Position!=="" && this.state.Country!=="" && this.Email!=="") {
           let newContact = {
               Fullname:this.state.Fullname,
               Companyname: this.state.Companyname,
               Position: this.state.Position,
               Country: this.state.Country,
               Email: this.state.Email
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
                  // alert("Not valid contact"); 
                }
            }).catch(error => {
                alert("Something went wrong");
            })
        } else {
           // alert("Not valid contact");
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
					<p>	<input type="text"  ref="fullName" required onChange={this.inputOnChange}/></p>
					<span>Company</span>
					<p> <input type="text" ref="companyName" required onChange={this.inputOnChange}/></p>
					<span>Position </span>
					<p><input type="text"   ref="position"required onChange={this.inputOnChange}/></p>
					<span>Country</span>
					<p><input type="text"   ref="country"required onChange={this.inputOnChange}/></p>
					<span>Email</span>
					<p><input type="email"   ref="email"required onChange={this.inputOnChange}/></p>

				    <button  className="btnAll" id="sendBtn" onClick={this.saveContact}>Save</button>
					<button className="btnAll" id="deleteBtn" onClick={this.props.back}>Back</button>
                    </form>
					</div>
				</div>
					
			);
		}
	}	
export default AddContact;
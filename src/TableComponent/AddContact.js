import React,{Component} from 'react';
import call from '../Fetch.js';
class AddContact extends Component{
		 constructor(props) {
	    super(props);
	    this.state = {
				   
				    };
					this.saveContact = this.saveContact.bind(this);
	  }
	  	saveContact(){
			  //let guid='';
			  if(this.refs.fullName.value && this.refs.companyName.value &&
			   this.refs.position.value && this.refs.country.value && this.refs.email.value){
			let newContact={
				Fullname:this.refs.fullName.value,
				Companyname:this.refs.companyName.value,
				Position:this.refs.position.value,
				Country:this.refs.country.value,
				Email:this.refs.email.value
			}
			this.props.update();
			let self =this;
			call('http://crmbetb.azurewebsites.net/api/Contacts','POST',newContact).then(function(data){
				self.props.update();
			    
			});
			 	//alert("save");
				 this.props.back();
			   }else{
				alert("no valid contact");
			}
		  }
	
		render(){
				
					return(
						<div className="AddRow">
				     	    <p>Full Name <input type="text"  ref="fullName"/></p>
							<p>Company <input type="text" ref="companyName"/></p>
							<p>Position <input type="text"   ref="position"/></p>
							<p>Country <input type="text"   ref="country"/></p>
							<p>Email <input type="text"   ref="email"/></p>

				     		<button  onClick={this.saveContact}>Save</button>
							 <button  onClick={this.props.back}>Back</button>
				     	</div>
					
			);
		}
	}	
export default AddContact;
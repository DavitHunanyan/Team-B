import React, {Component} from 'react';
import '../StyleSheet/MailingLists.css';
import MailListContacts from './MailListContacts.js';
import TemplateSelect from '../TableComponent/TemplateSelect.js';

class MailingLists extends Component {
	constructor(props) {
		super(props);
		this.state = {
			maillists: [],
			mailListContacts: [],
			mailListHeader: "",
			checkedBoxArray: [],
			selectedMailListId: [],
			loading: true,
			deleteBtnDisable: true,
			disSendBtn: true,
			delete: false,
			TemplateId: ""
		}
		this.seeContacts = this.seeContacts.bind(this);
		this.checkBoxOnChange = this.checkBoxOnChange.bind(this);	
		this.delete = this.delete.bind(this);
		this.update = this.update.bind(this);
		this.getSeletValue = this.getSeletValue.bind(this);
		this.sendMail = this.sendMail.bind(this);
		this.deletePopUp = this.deletePopUp.bind(this);
		this.changeDeleteState = this.changeDeleteState.bind(this);
	}

	componentDidMount() {
		let self = this;
		return fetch('http://crmbetb.azurewebsites.net/api/MailingLists').then(function(response) {
			if (response.status === 200) {
				return response.json();
			}
		}).then(response => {
			self.setState({
				maillists: response,
				loading: false
			})
		}).catch(error => {
			alert("Server Error")
		})
	}
	delete() {

		let self = this;
		self.setState({
			deleteBtnDisable: true
		});
		this.changeDeleteState();
		return fetch("http://crmbetb.azurewebsites.net/api/MailingLists", {
			method: "DELETE",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(self.state.selectedMailListId)

		}).then(response => {
			console.log("delete", response);
			if (response.status === 200) {
				self.update();
				alert("Delete");
				self.setState({
					selectedMailListId: []
				});
				for (let i = 0; i < this.state.checkedBoxArray.length; ++i) {
					this.state.checkedBoxArray[i].checked = false;
				}
			}
		}).catch(error => {
			console.log(error);
			alert("Server Error");
		});

	}
	update() {
		let self = this;
		return fetch('http://crmbetb.azurewebsites.net/api/MailingLists').then(function(response) {
			if (response.status === 200) {
				return response.json();
			}
		}).then(response => {
			self.setState({
				maillists: response,
				loading: false
			})
		}).catch(error => {
			alert("Server Error")
		})
	}
	seeContacts(event) {
		console.log(event.target.id);
		let datalist = this.state.maillists[event.target.id].Contacts;
		this.setState({
			mailListContacts: datalist,
			mailListHeader: this.state.maillists[event.target.id].MailingListName
		})
	}
	checkBoxOnChange(event) {
		// console.log(event.target.id);
		this.state.checkedBoxArray.push(event.target);
		let index = event.target.id;
		if (event.target.checked === true) {
			this.state.selectedMailListId.push(this.state.maillists[index].MailingListId);

		} else {
			for (let i = 0; i < this.state.selectedMailListId.length; ++i) {

				if (this.state.maillists[index].MailingListId === this.state.selectedMailListId[i]) {
					this.state.selectedMailListId.splice(i, 1);

				}

			}
		}
		//console.log("MailListId Array",this.state.selectedMailListId);
		if (this.state.selectedMailListId.length > 0) {
			this.setState({
				deleteBtnDisable: false
			});
		} else {
			this.setState({
				deleteBtnDisable: true
			});
		}
	}
	getSeletValue(value) {
		this.state.TemplateId = value;
		if (value !== "" && this.state.selectedMailListId.length > 0) {
			this.setState({
				disSendBtn: false
			})
		} else {
			this.setState({
				disSendBtn: true
			})
		}
		//console.log("In State Id",this.state.TemplateId);
	}

	deletePopUp(){
		if(this.state.delete){
			return(
				<div className="deleteBox">
					<div className="deletePopUp">
						<h4>Are you sure?</h4>
						<button className="See_Contacts" onClick={this.delete}>Yes</button>
						<button className="See_Contacts" onClick={this.changeDeleteState}>No</button>
					</div>
				</div>
			)
		}
	}

	changeDeleteState(){
		this.setState({delete:!this.state.delete});
	}

	sendMail() {
		let self = this;
		this.setState({
			disSendBtn: true,
			selectedMailListId: []
		});
		for (let i = 0; i < this.state.checkedBoxArray.length; ++i) {
			this.state.checkedBoxArray[i].checked = false;
		}

		if (this.state.selectedMailListId.length !== 0 && this.state.TemplateId !== "") {
			return fetch("http://crmbetb.azurewebsites.net/api/SendMail/" + this.state.selectedMailListId + "/" + self.state.TemplateId, {
				method: "POST",
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				}

			}).then(response => {
				console.log(response);
				if (response.status === 200) {
					alert("Mail is sent");
				}
			}).catch(error => {
				alert("Server Error");
			})

		}

	}
    render() {
		if(this.state.loading){
					return(
						<div className="UserTable">
						    <div className="loading">
								<div className="loadingtext">Loading ...</div>
							</div>
			        	</div> 
					);
				}
        const headers = <thead>
                           <tr>
                                <th>Choose</th>
                                <th>Name</th>
                                <th>Contacts </th>
                                <th>Action</th>
                            </tr>
                       </thead>
         const data=this.state.maillists
		      const row = data.map((data,index)=>
		     	<tr key={index} ref={index}>
                     <td key={index} id="checkbox">
						 <input type="checkbox" ref={index} id={index} onChange={this.checkBoxOnChange} /> 
					 </td>
			     	 <td key={data.MailingListName}>
				     	{data.MailingListName}
                     </td>
					  <td key={data.Contacts.length}>
				     	{data.Contacts.length}
                     </td>
			     	<td ><button className="See_Contacts" id={index} onClick={this.seeContacts}  >Contacts</button></td>
		     	</tr>
		     	);
		     	return(
                     <div>
                        <div className ="Block">
							<h3>Mail List</h3>
                            <table>
                                {headers}
                                <tbody>
                                    {row}
                                </tbody>
                            </table>
							
							  <div id="templateSelect">
									<span>Template :</span>
								<TemplateSelect getValue={this.getSeletValue} sendBtnDisable={this.state.disabledSendBtn} />
								<button key="sendBtn" id="sendBtn" disabled={this.state.disSendBtn} onClick={this.sendMail}>Send Mail</button>
							 </div>
							 <div className="btnDiv">
                             <button id="deleteBtn" disabled={this.state.deleteBtnDisable} className="deleteBtn" onClick={this.changeDeleteState}>Delete</button>{this.deletePopUp()}
							 </div>
                        </div>
                        <div className="Block" >
                          <MailListContacts data={this.state.mailListContacts} header={this.state.mailListHeader} />
                        </div>
                     </div>
                     
		     	);
                
    }
}
export default MailingLists;



import React, { Component } from 'react';
import TableHeader from'./TableHeader.js';
import TableRow from './TableRow.js';
import '../StyleSheet/Table.css';
import Edit from './Edit.js';
import AddContact from './AddContact.js';
import UploadFile from './UploadFile.js';
import TemplateSelect from './TemplateSelect.js';
import MailListSelect from './MailListSelect.js';

class Table extends Component {
	constructor(props) {
		super(props);
		this.checkedBoxArray=[];
		this.TemplateId="";
		this.MailListId="";
		this.state = {
			data: [],
			guids: [],
			edit: false,
			editObj: {},
			disabled: true,
			disabledSendBtn: true,
			addContact: false,
			creatListBtndisabled: true,
			uploadFile: false,
			delete: false,
			loading: true,
			disabledAddToList:true
		};
		this.sendMail = this.sendMail.bind(this);
		this.getGuid = this.getGuid.bind(this);
		this.saveFromEdit = this.saveFromEdit.bind(this);
		this.cancel = this.cancel.bind(this);
		this.onClickEditBtn = this.onClickEditBtn.bind(this);
		this.isDisable = this.isDisable.bind(this);
		this.addContact = this.addContact.bind(this);
		this.back = this.back.bind(this);
		this.delete = this.delete.bind(this);
		this.update = this.update.bind(this);
		this.checkBoxChanges = this.checkBoxChanges.bind(this);
		this.createMailList = this.createMailList.bind(this);
		this.mailListName = this.mailListName.bind(this);
		this.uploadFile = this.uploadFile.bind(this);
		this.backfromUploadFile = this.backfromUploadFile.bind(this);
		this.getSeletValue = this.getSeletValue.bind(this);
		this.deletePopUp = this.deletePopUp.bind(this);
		this.changeDeleteState = this.changeDeleteState.bind(this);
		this.onChangefromMailListSelect = this.onChangefromMailListSelect.bind(this);
		this.addToList = this.addToList.bind(this);
	}
	checkBoxChanges(target) {
		this.checkedBoxArray.push(target);
	}
	isDisable(disabled) {
		this.setState({
			disabled: disabled
		});
	}

	getGuid(guidArray) {
		this.setState({
			guids: guidArray
		});
	}
	componentDidMount() {
		let self = this;
		return fetch('http://crmbetb.azurewebsites.net/api/contacts').then(function(response) {
			if (response.status === 200) {
				return response.json();
			}
		}).then(response => {
			console.log(response);
			self.setState({
				data: response,
				loading: false
			})
		}).catch(error => {
			alert("Something went wrong")
		})
	}
	sendMail() {
		let self = this;
		this.setState({
			disabledSendBtn: true,
			guids: []
		});
		for (let i = 0; i < this.checkedBoxArray.length; ++i) {
			this.checkedBoxArray[i].checked = false;
		}

		if (this.state.guids.length !== 0 && this.state.TemplateId !== "") {
			return fetch("http://crmbetb.azurewebsites.net/api/SendMail/" + self.TemplateId, {
				method: "POST",
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(self.state.guids)

			}).then(response => {
				if (response.status === 200) {
					alert("Mail is sent");
				}
			}).catch(error => {
				alert("Something went wrong");
			})

		}

	}
	onClickEditBtn(event) {
		this.setState({
			editObj: this.state.data[event.target.id]
		});
		this.setState({
			edit: true
		});
	}
	cancel() {
		this.setState({
			edit: false
		});
	}
	saveFromEdit() {
		this.setState({
			edit: false
		});
	}
	addContact() {
		this.setState({
			addContact: true
		});
	}
	uploadFile() {
		this.setState({
			uploadFile: true
		});
	}
	backfromUploadFile() {
		this.setState({
			uploadFile: false
		});
	}
	back() {
		this.setState({
			addContact: false
		});
	}

	delete() {
		let self = this;
		for (let i = 0; i < this.checkedBoxArray.length; ++i) {
			this.checkedBoxArray[i].checked = false;
		}
		self.setState({
			disabled: true
		});
		this.changeDeleteState();
		return fetch("http://crmbetb.azurewebsites.net/api/Contacts", {
			method: "DELETE",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(self.state.guids)

		}).then(response => {
			//console.log("delete",response);
			if (response.status === 200) {
				//alert("delete");
				self.update();
			}
		}).catch(error => {
			console.log(error);
			alert("Something went wrong");
		})

	}
	update() {
		let self = this;
		return fetch('http://crmbetb.azurewebsites.net/api/contacts').then(function(response) {
			if (response.status === 200) {
				return response.json();
			}
		}).then(response => {
			self.setState({
				data: response,
				guids: []
			});
		}).catch(error => {
			alert("Something went wrong")
		})
	}
	mailListName() {
		if (this.refs.creatMList.value) {
			this.setState({
				creatListBtndisabled: false

			})
		} else {
			this.setState({
				creatListBtndisabled: true

			})
		}
	}
	createMailList() {
		let self = this;
		if (this.refs.creatMList.value) {
			if (this.state.guids.length > 0) {
				this.setState({
					creatListBtndisabled: true,
					disabled: true,
				})
				return fetch("http://crmbetb.azurewebsites.net/api/MailingLists/new?name=" + self.refs.creatMList.value, {
					method: "POST",
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(self.state.guids)

				}).then(response => {
					//console.log("createMaillist",response);
					if (response.status === 201) {
						alert("MailList is Created");
						for (let i = 0; i < self.checkedBoxArray.length; ++i) {
							self.checkedBoxArray[i].checked = false;
						}
						self.setState({
							guids: []
						});
						self.refs.creatMList.value = "";
					}
				}).catch(error => {
					alert("Something went wrong");
				})

			}
		}
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

	getSeletValue(value) {
		this.TemplateId = value;
		if (value !== "") {
			this.setState({
				disabledSendBtn: false
			})
		} else {
			this.setState({
				disabledSendBtn: true
			})
		}
	//	console.log("In State Id",this.TemplateId);
	}
	onChangefromMailListSelect(event){
		//console.log(event.target.value);
		this.MailListId = event.target.value;
	 if(this.MailListId !=="Choose List" && this.state.guids.length > 0){
		this.setState({
			disabledAddToList:false
		})
	 }else{
		 this.setState({
			disabledAddToList:true
		})
	 }
	}
	addToList(){
		if(this.MailListId!=="" && this.state.guids.length>0){
			let self = this;
		return fetch("http://crmbetb.azurewebsites.net/api/MailingLists/add/" + self.MailListId , {
			method: "PUT",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(self.state.guids)

		}).then(response => {
			if (response.status === 204) {
				for (let i = 0; i < self.checkedBoxArray.length; ++i) {
							self.checkedBoxArray[i].checked = false;
						}
			//	alert("add to mailist")

			}
		}).catch(error => {
			console.log(error);
			alert("Something went wrong");
		})
		}else{
			alert("no select mailing list or no choose contact");
		}
	}
	render(){
				//console.log("this.state.guids",this.state.guids);
				if(this.state.loading){
					return(
						<div className="UserTable">
						    <div className="loading">
								<div className="loadingtext">Loading ...</div>
							</div>
			        	</div> 
					);
				}
				if(this.state.uploadFile){
					return(
						<div className="UserTable">
							<div id="scroll">
			       			<UploadFile back={this.backfromUploadFile} update={this.update} />	
			        		</div>
						</div> 
					);
				}
				if(this.state.addContact){
					return(
						<div className="UserTable">
							<div id="scroll">
			       				<AddContact back={this.back}  update={this.update}/>
			        		</div>
						</div> 
					);
				}
				if(this.state.edit){
					return(
				<div className="UserTable">
					<div id="scroll">
			        <Edit data={this.state.editObj} save={this.saveFromEdit}  cancel={this.cancel} update={this.update}/>
			        </div>
				</div> 
					);
				}
		     	return(
		     	<div className="UserTable">
					<div id="scroll">
			     	<table className="table">
			     	<TableHeader headerdata={this.state.data[0]} className="tableheader" checkedChange={this.checkedChange} checked={this.state.allchecked}/>
			     	<TableRow isdisabledprop={this.isDisable}  dataArray={this.state.data} guids={this.state.guids} editBtn={this.onClickEditBtn} checkBoxChanges={this.checkBoxChanges}/>
			     	</table>
					
			     </div>
				 <div className="BtnBox">
				 	<button key ="addBtn" className="btnAll" id="addBtn"  onClick={this.addContact}>Add Contact</button>
					 <div id="templateSelectBox">
					 <TemplateSelect getValue={this.getSeletValue} sendBtnDisable={this.state.disabledSendBtn} />
				 	<button key="sendBtn" className="btnAll" id="sendBtn" disabled={this.state.disabledSendBtn} onClick={this.sendMail}>Send Mail</button>
					 </div>
					 <div className="btnDiv">
					  <button key="deletBtn" className="btnAll" id="deleteBtn" disabled={this.state.disabled} onClick={this.changeDeleteState}>Delete</button>{this.deletePopUp()} 
					  </div>
					  <div id="maillist">
					  <input type="text" ref="creatMList" placeholder="List Name" onChange={this.mailListName} id="listname"/>
					  <button key="createMailListBtn" className="btnAll" id="createMailListBtn" onClick={this.createMailList} disabled={this.state.creatListBtndisabled}>Create List</button>
					  </div>
					  <button  className="btnAll" id="Upload_btn" onClick={this.uploadFile}>Upload File</button>
					  <div id="maillist">
					  <MailListSelect onChange={this.onChangefromMailListSelect} />
					  <button key="MailListadd" className="btnAll" id="createMailListBtn" onClick={this.addToList}  disabled={this.state.disabledAddToList} >Add to List</button>
					  </div>
					  </div>
				 </div> 

			
		     	);
		     }
     	
	}
    export default Table;
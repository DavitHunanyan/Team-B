import React, { Component } from 'react';
import TableHeader from'./TableHeader.js';
import TableRow from './TableRow.js';
import '../StyleSheet/Table.css';
import call from '../Fetch.js';
import Edit from './Edit.js';
import AddContact from './AddContact';


class Table extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			guids: [],
			edit: false,
			editObj: {},
			disabled: true,
			addContact: false,
			checkedBoxArray: [],
			creatListBtndisabled:true
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
	}
			checkBoxChanges(target) {
				this.state.checkedBoxArray.push(target);
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
				call('http://crmbetb.azurewebsites.net/api/contacts', 'GET').then(response => {
					this.setState({
						data: response
					});
					//console.log("GET Data",response);
				});
			}
			sendMail() {


				if (this.state.guids.length !== 0) {
					call('http://crmbetb.azurewebsites.net/api/SendMail/1', 'POST', this.state.guids).then(function(response) {
						console.log("status",response);
						alert("Send");
					});
				}

				this.setState({
					disabled: true,
					guids: []
				});
				for (let i = 0; i < this.state.checkedBoxArray.length; ++i) {
					this.state.checkedBoxArray[i].checked = false;
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
			back() {
				this.setState({
					addContact: false
				});
			}

			delete() {
				let self = this;
				call('http://crmbetb.azurewebsites.net/api/Contacts', 'DELETE', this.state.guids).then(function(data) {
					self.update();
					//alert("detele");
					self.setState({
						disabled: true
					});
				});
				for (let i = 0; i < this.state.checkedBoxArray.length; ++i) {
					this.state.checkedBoxArray[i].checked = false;
				}

			}
			update() {
				call('http://crmbetb.azurewebsites.net/api/contacts', 'GET').then(response => {
					this.setState({
						data: response,
						guids: []
					});
				});
			}
			mailListName(){
				if(this.refs.creatMList.value){
					this.setState({
					creatListBtndisabled:false	
				
				})
				}else{
					this.setState({
					creatListBtndisabled:true	
				
				})
				}
			}
			createMailList(){
				let self = this;
				if(this.refs.creatMList.value){
						if(this.state.guids.length > 0){
								call('http://crmbetb.azurewebsites.net/api/MailingLists/new?name='+this.refs.creatMList.value, 'POST', this.state.guids).then(function(){
									self.setState({
												creatListBtndisabled: true,
												guids: []
											});
									self.refs.creatMList.value="";

								for (let i = 0; i < self.state.checkedBoxArray.length; ++i) {
									self.state.checkedBoxArray[i].checked = false;
									}
								})
								console.log("creat New Mail List");
								
						}else{
							alert("Did not Choose Contact");
						}
				}else{
					alert("Mail List Name No valid");
				}
			}
			render(){
				//console.log("this.state.guids",this.state.guids);
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
				 	<button key ="addBtn" id="addBtn"  onClick={this.addContact}>Add Contact</button>
				 	<button key="sendBtn" id="sendBtn" disabled={this.state.disabled} onClick={this.sendMail}>Send Mail</button>
					  <button key="deletBtn" id="deleteBtn" disabled={this.state.disabled} className="deleteBtn" onClick={this.delete}>Delete Selected</button>
					  <div id="maillist">
					  <input type="text" ref="creatMList" placeholder="Mail List Name" onChange={this.mailListName}/>
					  <button key="createMailListBtn" id="createMailListBtn" onClick={this.createMailList} disabled={this.state.creatListBtndisabled}>Creat Mail List</button>
					  </div>
					  <  form name="form1" id ="formUploadFile" method="post" enctype="multipart/form-data" action="http://crmbetb.azurewebsites.net/api/Contacts/upload">	
						<input name="image1" type="file" />
						<input type="submit" value="Submit" />
						</form>
				 </div> 

			
		     	);
		     }
     	
	}
    export default Table;
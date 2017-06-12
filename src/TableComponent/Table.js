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
        this.checkedBoxArray = [];
        this.TemplateId = "";
        this.MailListId = "";
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
            deletesuccess: false,
            success: false,
            error: false,
            loading: true,
            disabledAddToList: false
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
        this.successPopUp = this.successPopUp.bind(this);
        this.errorPopUp = this.errorPopUp.bind(this);
        this.deletesuccessPopUp = this.deletesuccessPopUp.bind(this);
        this.disableTrue = this.disableTrue.bind(this);
        this.loading = this.loading.bind(this);
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
        this.setState({
            loading:true
        })
        return fetch('http://crmbetb.azurewebsites.net/api/contacts').then(function(response) {
            if (response.status === 200) {
                return response.json();
            }
        }).then(response => {
            //console.log(response);
            self.setState({
                data: response,
                loading: false
            })
        }).catch(error => {
            alert("No internet connection");
        })
    }
    sendMail() {
        let self = this;
        this.setState({
            disabledSendBtn: true,
            guids: [],
            loading:true
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
                    self.setState({
                        success: true,
                        loading:false
                    })
                }
            }).catch(error => {
                self.setState({
                    error: true
                })
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
                self.setState({
                    deletesuccess: true
                })
                self.update();
            }
        }).catch(error => {
            console.log(error);
            self.setState({
                error: true
            })
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
            self.setState({
                error: true
            })
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
            if (this.refs.creatMList.value!=="") {
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
                        self.setState({
                            success: true
                        })
                        for (let i = 0; i < self.checkedBoxArray.length; ++i) {
                            self.checkedBoxArray[i].checked = false;
                        }
                        self.setState({
                            guids: []
                        });
                        self.refs.creatMList.value = "";
                    }
                }).catch(error => {
                    self.setState({
                        error: true
                    })
                })

            }
        }
    }
    disableTrue(){
         if(this.state.guids.length === 0){
		this.setState({
			disabledAddToList:true,
            disabledSendBtn: true,
            creatListBtndisabled: true
		})
	 }
    }
	deletePopUp(){
		if(this.state.delete){
			return(
				<div className="PopUpBox">
					<div className="PopUp">
						<h4>Are you sure?</h4>
						<button className="See_Contacts" onClick={this.delete}>Yes</button>
						<button className="See_Contacts" onClick={this.changeDeleteState}>No</button>
					</div>
				</div>
			)
		}
	}
		successPopUp(){
			let self = this;
		if(this.state.success){
			setTimeout(function(){
				self.setState({
					success:false
				})
			},1000)
			return(
				<div className="PopUpBox">
					<div className="PopUp">
						<div className="successContainer">
						<div className="success">Success !</div>
						</div>
					</div>
				</div>
			)
		}
	}
	deletesuccessPopUp(){
			let self = this;
		if(this.state.deletesuccess){
			setTimeout(function(){
				self.setState({
					deletesuccess:false
				})
			},1000)
			return(
				<div className="PopUpBox">
					<div className="PopUp">
						<div className="successContainer">
						<div className="delete">Delete !</div>
						</div>
					</div>
				</div>
			)
		}
	}
	errorPopUp(){
				let self = this;
			if(this.state.error){
				setTimeout(function(){
					self.setState({
						error:false
					})
				},2500)
				return(
					<div className="PopUpBox">
						<div className="PopUp">
							<div className="errorContainer">
							<div className="error"><b>Something went wrong !</b></div>
							</div>
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
		if (value !== ""&& this.state.guids.length>0) {
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
			self.setState({
					success:true
				})

			}
		}).catch(error => {
			console.log(error);
				self.setState({
					error:true
				})
		})
		}
	}
    loading(){
        if(this.state.loading){
					return(
						<div className="UserTable">
						    <div className="loading">
								<div className="loadingtext">Loading ...</div>
							</div>
			        	</div> 
					);
				}
    }
	render(){
				//console.log("this.state.guids",this.state.guids);
			if(this.state.loading){
					return(
						<div className="UserTable">
                             {this.loading()}
							<div id="scroll">	
			        		</div>
						</div> 
					);
				}
				if(this.state.uploadFile){
					return(
						<div className="UserTable">
                             {this.loading()}
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
						{this.deletesuccessPopUp()} 
						{this.successPopUp()} 
						{this.errorPopUp()} 
			     	<table className="table">
			     	<TableHeader headerdata={this.state.data[0]} className="tableheader" checkedChange={this.checkedChange} />
			     	<TableRow isdisabledprop={this.isDisable} disableTrue={this.disableTrue} dataArray={this.state.data} guids={this.state.guids} editBtn={this.onClickEditBtn} checkBoxChanges={this.checkBoxChanges}/>
			     	</table>
					
			     </div>
				 <div className="BtnBox">
				 	<button key ="addBtn" className="btnAll" id="addBtn"  onClick={this.addContact}>Add</button>
					 <div id="templateSelectBox">
					 <TemplateSelect getValue={this.getSeletValue} sendBtnDisable={this.state.disabledSendBtn} />
				 	<button key="sendBtn" className="btnAll" id="sendBtn" disabled={this.state.disabledSendBtn} onClick={this.sendMail}>Send</button>
					 </div>
					 <div className="btnDiv">
					  <button key="deletBtn" className="btnAll" id="deleteBtn" disabled={this.state.disabled} onClick={this.changeDeleteState}>Delete</button>{this.deletePopUp()} 
					  </div>
					  <div id="maillist">
					  <input type="text" ref="creatMList" placeholder="List Name" onChange={this.mailListName} id="listname"/>
					  <button key="createMailListBtn" className="btnAll" id="createMailListBtn" onClick={this.createMailList} disabled={this.state.creatListBtndisabled}>Create List</button>
					  </div>
					  <button  className="btnAll" id="Upload_btn" onClick={this.uploadFile}>Upload</button>
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
import React, {Component} from 'react';
import '../StyleSheet/MailingLists.css';
import pencil from "../StyleSheet/pencil.png";
import MailListContacts from './MailListContacts.js';
import TemplateSelect from '../TableComponent/TemplateSelect.js';

class MailingLists extends Component {
    constructor(props) {
        super(props);
        this.checkedBoxArray = [];
        this.TemplateId = "";
        this.state = {
            maillists: [],
            mailListContacts: [],
            mailListHeader: "",
            selectedMailListId: [],
            loading: true,
            deleteBtnDisable: true,
            disSendBtn: true,
            delete: false,
            error: false,
            success: false,
            MailingListId: "",
            SelectMailListIndex: "",
            rename:false,
            maillistNameForRename:"",
            renameInputValue:"",
            renamelistId:"",
            emptylistmessage:""
            
        }
        this.seeContacts = this.seeContacts.bind(this);
        this.checkBoxOnChange = this.checkBoxOnChange.bind(this);
        this.delete = this.delete.bind(this);
        this.update = this.update.bind(this);
        this.getSeletValue = this.getSeletValue.bind(this);
        this.sendMail = this.sendMail.bind(this);
        this.deletePopUp = this.deletePopUp.bind(this);
        this.changeDeleteState = this.changeDeleteState.bind(this);
        this.updateFromContactslist = this.updateFromContactslist.bind(this);
        this.errorPopUp = this.errorPopUp.bind(this);
        this.successPopUp = this.successPopUp.bind(this);
        this.maillistRenamePopUp = this.maillistRenamePopUp.bind(this);
        this.rename  = this.rename.bind(this);
        this.renameInputOnchange = this.renameInputOnchange.bind(this);
        this.save = this.save.bind(this);
        this.cancel = this.cancel.bind(this);
        this.loading = this.loading.bind(this);
    }

    componentDidMount() {
        let self = this;
        return fetch('http://crmbetb.azurewebsites.net/api/MailingLists').then(function(response) {
            if (response.status === 200) {
                 self.setState({
                loading: false
            })
                return response.json();
            }
        }).then(response => {
            self.setState({
                maillists: response,
            })
        }).catch(error => {
            self.setState({
                error: true
            })
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
            if (response.status === 200) {
                //	alert("Delete");
                self.setState({
                    selectedMailListId: [],
                    mailListContacts: [],
                    mailListHeader: ""
                });
                self.update();
                for (let i = 0; i < this.checkedBoxArray.length; ++i) {
                    this.checkedBoxArray[i].checked = false;
                }
            }
        }).catch(error => {
            console.log(error);
            self.setState({
                error: true
            })
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
                loading: false,
                emptylistmessage:""
            })
        }).catch(error => {
            self.setState({
                error: true
            })
        })
    }
    seeContacts(event) {
        let self = this;
        let datalist = this.state.maillists[event.target.id].Contacts;
        this.setState({
            SelectMailListIndex: event.target.id,
            mailListContacts: datalist,
            mailListHeader: this.state.maillists[event.target.id].MailingListName,
            MailingListId: this.state.maillists[event.target.id].MailingListId,
            emptylistmessage:" has no contact"
        })
        return fetch('http://crmbetb.azurewebsites.net/api/MailingLists/' + this.state.maillists[event.target.id].MailingListId).then(function(response) {
            if (response.status === 200) {
                return response.json();
            }
        }).then(response => {
            self.setState({
                mailListContacts: response.Contacts,
                header: response.MailingListName,
            })
        }).catch(error => {
            self.setState({
                error: true
            })
        })
    }
    updateFromContactslist() {
        this.setState({
            loading:true
        })
        let self = this;
        return fetch('http://crmbetb.azurewebsites.net/api/MailingLists/' + this.state.maillists[self.state.SelectMailListIndex].MailingListId).then(function(response) {
            if (response.status === 200) {
                self.setState({
                     loading:false
                    })
                return response.json();
                
            }
        }).then(response => {
            self.setState({
                mailListContacts: response.Contacts,
                header: response.MailingListName,
            })
        }).catch(error => {
            self.setState({
                error: true,
                loading:false
            })
        })
    }
    checkBoxOnChange(event) {
        this.checkedBoxArray.push(event.target);
       
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
         if (this.state.selectedMailListId.length === 1 &&  this.TemplateId !=="") {
            this.setState({
                disSendBtn: false
            })
        } 
        if(this.state.selectedMailListId.length !==1){
            this.setState({
                disSendBtn: true
            })
        }
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
        this.TemplateId = value;
        if (value !== "" && this.state.selectedMailListId.length > 0 && this.state.selectedMailListId.length < 2) {
            this.setState({
                disSendBtn: false
            })
        } else {
            this.setState({
                disSendBtn: true
            })
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
    renameInputOnchange(){
       // console.log("rename",this.refs.rename.value);
        this.setState({
            maillistNameForRename:this.refs.rename.value
        })
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
    save(){
        let self = this;
        if(this.refs.rename.value !==""){
			return fetch("http://crmbetb.azurewebsites.net/api/MailingLists/rename/"+this.state.renamelistId, {
			method: "PUT",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(self.state.maillistNameForRename)

		}).then(response => {
			console.log("edit",response);
			if (response.status === 200) {
				self.setState({
                    rename:false,
                    success:true
                })
                self.update();
			}
		}).catch(error => {
			//console.log(error);
			self.setState({
                    rename:false,
                    error:true
                })
		})
		}
    }
    cancel(){
        this.setState({
            rename:false
        })
    }
    maillistRenamePopUp(){
		if(this.state.rename){
			return(
				<div className="PopUpBox">
					<div className="renamePopUp">
                        <span>Rename mailing list</span>
                        <form>
						<input ref="rename" onChange={this.renameInputOnchange} required  className="renameinput" defaultValue ={this.state.renameInputValue}/>
                        <button className="See_Contacts" onClick={this.save}>Save</button>
                        <button className="See_Contacts" onClick={this.cancel}>Cancel</button>
						</form>
						
					</div>
				</div>
			)
		}
	}
    rename(event){
        this.setState({
            rename:true,
             renameInputValue:this.state.maillists[event.target.id].MailingListName,
             renamelistId:this.state.maillists[event.target.id].MailingListId
        })
        
       // console.log("maillistname",this.state.maillists[event.target.id].MailingListId);
    }
	changeDeleteState(){
		this.setState({delete:!this.state.delete});
	}

	sendMail() {
		let self = this;
		this.setState({
			disSendBtn: true,
			selectedMailListId: [],
            loading:true
		});
		for (let i = 0; i < this.checkedBoxArray.length; ++i) {
			this.checkedBoxArray[i].checked = false;
		}

		if (this.state.selectedMailListId.length !== 0 && this.TemplateId !== "") {
			return fetch("http://crmbetb.azurewebsites.net/api/SendMail/" + this.state.selectedMailListId + "/" + self.TemplateId, {
				method: "POST",
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				}

			}).then(response => {
				if (response.status === 200) {
					self.setState({
					success:true,
                    loading:false
				})
				}else{
                    self.setState({
					error:true,
                    loading:false
				})
                }
			}).catch(error => {
				self.setState({
					error:true,
                    loading:false
				})
			})

		}

	}
    render() {
        if(this.state.loading){
					return(
						<div className="UserTable">
                             {this.loading()}
							<div id="scroll">	
			        		</div>
						</div> 
					);
				}
        const headers = <thead>
                           <tr>
                                <th>Choose</th>
                                <th>Name</th>
                                <th>Count</th>
                                <th colSpan="2">Actions</th>
                            </tr>
                       </thead>
         const data=this.state.maillists
		      const row = data.map((data,index)=>
		     	<tr key={index} ref={index}>
                     <td key={"checkbox" +index} id="checkbox">
						 <input type="checkbox" ref={index} id={index} onChange={this.checkBoxOnChange} /> 
					 </td>
			     	 <td key={data.MailingListName +"MLN"}>
				     	{data.MailingListName}
                     </td>
					  <td id="maillistlength" key={data.Contacts.length+"L"}>
				     	{data.Contacts.length}
                     </td>
                     <td><img  alt="pencil" id ={index} onClick={this.rename} src={pencil} width="20px" height="20px"/></td>
			     	<td id="centert" ><button className="See_Contacts" id={index} onClick={this.seeContacts}  >View</button></td>

		     	</tr>
		     	);
		     	return(
                     <div>
						 {this.errorPopUp()} 
						  {this.successPopUp()} 
                          {this.maillistRenamePopUp()}
                          {this.loading()}
                          <div className="toolbar">
                          <div className="buttoncontainer">
                           <div id="templateSelect">
								<TemplateSelect getValue={this.getSeletValue} sendBtnDisable={this.state.disabledSendBtn} />
								<button key="sendBtn" className="btnAll" id="sendBtn" disabled={this.state.disSendBtn} onClick={this.sendMail}>Send Mail</button>
							 </div>
							 <div className="btnDiv">
                             <button id="deleteBtn" disabled={this.state.deleteBtnDisable} className="btnAll" onClick={this.changeDeleteState}>Delete </button>{this.deletePopUp()}
							 </div>
                             </div>
                             </div>
                        <div className ="BlockLists">
                            <table>
                                {headers}
                                <tbody>
                                    {row}
                                </tbody>
                            </table>
                        </div>
                        <div className="Block" >
                          <MailListContacts update={this.update} updateContacts={this.updateFromContactslist} data={this.state.mailListContacts} header={this.state.mailListHeader} MailingListId={this.state.MailingListId} noContact={this.state.emptylistmessage} />
                        </div>
                     </div>
                     
		     	);
                
    }
}
export default MailingLists;



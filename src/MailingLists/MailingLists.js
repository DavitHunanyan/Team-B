import React, {Component} from 'react';
import '../StyleSheet/MailingLists.css';
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
            SelectMailListIndex: ""
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
                loading: false
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
            MailingListId: this.state.maillists[event.target.id].MailingListId
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
        let self = this;
        return fetch('http://crmbetb.azurewebsites.net/api/MailingLists/' + this.state.maillists[self.state.SelectMailListIndex].MailingListId).then(function(response) {
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
        if (value !== "" && this.state.selectedMailListId.length > 0) {
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
	changeDeleteState(){
		this.setState({delete:!this.state.delete});
	}

	sendMail() {
		let self = this;
		this.setState({
			disSendBtn: true,
			selectedMailListId: []
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
					success:true
				})
				}
			}).catch(error => {
				self.setState({
					error:true
				})
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
                                <th></th>
                                <th>Action</th>
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
			     	<td ><button className="See_Contacts" id={index} onClick={this.seeContacts}  >View</button></td>
		     	</tr>
		     	);
		     	return(
                     <div>
						 {this.errorPopUp()} 
						  {this.successPopUp()} 
                        <div className ="Block">
							<h3>Mailing Lists</h3>
                            <table>
                                {headers}
                                <tbody>
                                    {row}
                                </tbody>
                            </table>
							
							  <div id="templateSelect">
									<span>Template :</span>
								<TemplateSelect getValue={this.getSeletValue} sendBtnDisable={this.state.disabledSendBtn} />
								<button key="sendBtn" className="btnAll" id="sendBtn" disabled={this.state.disSendBtn} onClick={this.sendMail}>Send Mail</button>
							 </div>
							 <div className="btnDiv">
                             <button id="deleteBtn" disabled={this.state.deleteBtnDisable} className="btnAll" onClick={this.changeDeleteState}>Delete </button>{this.deletePopUp()}
							 </div>
                        </div>
                        <div className="Block" >
                          <MailListContacts update={this.update} updateContacts={this.updateFromContactslist} data={this.state.mailListContacts} header={this.state.mailListHeader} MailingListId={this.state.MailingListId} />
                        </div>
                     </div>
                     
		     	);
                
    }
}
export default MailingLists;



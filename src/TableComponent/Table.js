import React, { Component } from 'react';
import TableHeader from'./TableHeader.js';
import TableRow from './TableRow.js';
import '../StyleSheet/Table.css';
import call from '../Fetch.js';
import Edit from './Edit.js';
import AddContact from './AddContact';

class Table extends Component{
			constructor(props){
				super(props);
				this.state={
				  data:[],
				  guids:[],
				  edit:false,
				  editObj:{},
				  disabled:true,
				  addContact:false,
				  allchecked:false,
				  response:[]
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
				this.getAddData = this.getAddData.bind(this);
			}
			isDisable(disabled)	{
					this.setState({disabled:disabled});
			}
			
			getGuid(guidArray){
				this.setState({guids:guidArray});
			}
			componentDidMount(){
		    	call('http://crmbetb.azurewebsites.net/api/contacts','GET').then(response => {
				this.setState({data:response});
				//console.log("GET Data",response);
				});
		     }
			 sendMail(){
				 	 this.update();
				 if(this.state.guids.length!==0){
					call('http://crmbetb.azurewebsites.net/api/SendMail/1','POST',this.state.guids);
				 }
				 alert("Send Ok");
				 this.setState({disabled:true});
				 this.setState({allchecked:true});
			
			 }
			 onClickEditBtn(event){
			      this.setState({editObj:this.state.data[event.target.id]});
			      this.setState({edit:true});
			 }
			 cancel(){
				 this.setState({edit:false});
			 }
			  saveFromEdit(){
				 this.setState({edit:false});
			 }
			 addContact(){
				 this.setState({ addContact:true});
			 }
			 getAddData(data){
				console.log(data);
			 }
			 back(){
				 this.setState({addContact:false});
			 }
			
			delete(){
				let self =this;
				call('http://crmbetb.azurewebsites.net/api/Contacts?Guid='+this.state.guids,'DELETE').then(function(data){
				self.update();
				alert("detele");
				self.setState({disabled:true});
			});
				
			}
			update(){
				
				call('http://crmbetb.azurewebsites.net/api/contacts','GET').then(response => {
				this.setState({data:response});

				});
			}
			render(){
				console.log("this.state.guids",this.state.guids);
				if(this.state.addContact){
					return(
						<div className="UserTable">
					<div id="scroll">
			       <AddContact back={this.back} getAddData={this.getAddData} update={this.update} save={this.back}/>
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
			     	<TableRow isdisabledprop={this.isDisable}  dataArray={this.state.data} guids={this.getGuid} editBtn={this.onClickEditBtn} allchecked={this.state.allchecked}/>
			     	</table>
					
			     </div>
				 	<button key="sendBtn" id="sendBtn" disabled={this.state.disabled} onClick={this.sendMail}>Send Mail</button>
					  <button key="deletBtn" id="deleteBtn" disabled={this.state.disabled} className="deleteBtn" onClick={this.delete}>Delete Selected</button>
					 <button key ="addBtn" id="sendBtn"  onClick={this.addContact}>Add Contact</button>
				 </div> 

			
		     	);
		     }
     	
	}
    export default Table;
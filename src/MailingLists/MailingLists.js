import React, { Component } from 'react';
import '../StyleSheet/MailingLists.css';
import call from '../Fetch.js';
import MailListContacts from './MailListContacts.js';

class MailingLists extends Component {
    constructor(props) {
        super(props);
        this.state={
            maillists:[],
            mailListContacts:[],
            mailListHeader:""
        }
        this.seeContacts = this.seeContacts.bind(this);
    }

    componentDidMount(){
        let self =this;
        call('http://crmbetb.azurewebsites.net/api/MailingLists','GET').then(function(list){
            console.log("maillists",list);
            self.setState({
                maillists:list
            });
        })
    }
    seeContacts(event){
            console.log(event.target.id);
            let datalist =this.state.maillists[event.target.id].Contacts;
            this.setState({
                mailListContacts:datalist,
                mailListHeader:this.state.maillists[event.target.id].MailingListName
            })
    }

    render() {
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
						 <input type="checkbox" ref={index} id={index}  /> 
					 </td>
			     	 <td key={data.MailingListName}>
				     	{data.MailingListName}
                     </td>
					  <td key={data.Contacts.length}>
				     	{data.Contacts.length}
                     </td>
			     	<td ><button  id={index} onClick={this.seeContacts}>See Contacts</button></td>
		     	</tr>
		     	);
		     	return(
                     <div>
                        <div className ="inlineBlock">
                            <table>
                                {headers}
                                <tbody>
                                    {row}
                                </tbody>
                            </table>
                        </div>
                        <div className="inlineBlock">
                          <MailListContacts data={this.state.mailListContacts} header={this.state.mailListHeader} />
                        </div>
                     </div>
                     
		     	);
                
    }
}
export default MailingLists;



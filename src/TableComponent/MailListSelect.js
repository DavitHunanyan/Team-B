import React,{Component} from 'react';

class MailListSelect extends Component {
	constructor(props) {
		super(props);
        this.state={
            MailList:[]
        }
		this.renderEmailList = this.renderEmailList.bind(this);
		
	}
    componentDidMount(){
        let self = this;
		return fetch('http://crmbetb.azurewebsites.net/api/MailingLists').then(function(response) {
			if (response.status === 200) {
				return response.json();
			}
		}).then(response => {
           //console.log("maillist",response);
			self.setState({
				MailList: response,
			})
		}).catch(error => {
			alert("Something went wrong")
		})
     }


	 renderEmailList(data, index) {
        return (<option value={data.MailingListId} key={index} >{data.MailingListName}</option>)
    }
	render () {
		return (
			<select defaultValue="" onChange={this.props.onChange} >
                        <option>Choose List</option>
                        {this.state.MailList.map(this.renderEmailList)}
             </select>
		);
	}
	
	}
    export default MailListSelect;
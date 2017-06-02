import React,{Component} from 'react';
import call from '../Fetch.js';
class UploadFile extends Component {
	constructor(props) {
		super(props);
	}
	render(){
        return(
            <div>
                <form name="form1" method="POST" enctype="multipart/form-data" action="http://crmbetb.azurewebsites.net/api/Contacts/upload">
                <div>
                    <input type="file"/>
                    <input type="submit" value="Upload File" id="sendBtn" />
                </div>
                </form>
                <button className="deleteBtn" onClick={this.props.back}>Back</button>
            </div>
        );
    }
	
	}
    export default UploadFile;
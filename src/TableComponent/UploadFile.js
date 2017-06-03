import React,{Component} from 'react';
class UploadFile extends Component {
	
	render(){
        return(
            <div>
                <form name="form1" method="POST" enctype="multipart/form-data" action="http://crmbetb.azurewebsites.net/api/Contacts/upload">
                
                    <input type="file"/>
                    <input type="submit" value="Upload File" id="sendBtn" />
                
                </form>
                <button className="deleteBtn" onClick={this.props.back}>Back</button>
            </div>
        );
    }
	
	}
    export default UploadFile;
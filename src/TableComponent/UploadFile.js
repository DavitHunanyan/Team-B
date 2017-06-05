import React,{Component} from 'react';
class UploadFile extends Component {
	
	render(){
        return(
            <div className="uploadCSV">
                <form  action="http://crmbetb.azurewebsites.net/api/contacts/upload" encType="multipart/form-data" method="POST" >
                    <input name="data"type="file"></input>
                    <input type="submit" id="sendBtn"></input>
                </form>
                <button className="deleteBtn" onClick={this.props.back}>Back</button>
            </div>
        );
    }
	
	}
    export default UploadFile;
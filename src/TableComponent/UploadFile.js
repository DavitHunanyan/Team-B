import React,{Component} from 'react';
class UploadFile extends Component {
        constructor(props){
            super(props);
            this.state={
                disabled:true
            }

            this.UploadFile =this.UploadFile.bind(this);
            this.fileInputOnChange = this.fileInputOnChange.bind(this);
            
        }

UploadFile(){
    if( document.querySelector('input[type="file"]').files[0]){
    let self = this;
        let data = new FormData();
    	let fileData = document.querySelector('input[type="file"]').files[0];
    	data.append("data", fileData);	
			fetch("http://crmbetb.azurewebsites.net/api/contacts/upload", {
				method: "POST",
				"Content-Type": "multipart/form-data",
				"Accept": "application/json",
				body: data
			}).then(function (res) {
				//console.log("response",res)
                if(res.status === 200){
                    self.props.back();
                    self.props.update();
                }
                if(res.status===400){
                    alert("This file is already uploaded");
                }
				return res.json()
			})//.then(res => console.log(res))
      }else{
          alert("No Selected File");
      }
         }
     fileInputOnChange(){
         if( document.querySelector('input[type="file"]').files[0]){
             this.setState({
                 disabled:false
             })
         }else{
             this.setState({
                 disabled:true
             })
         }
     }
	render(){
        return(
            <div className="uploadCSV">
                
                    <input name="data" type="file" onChange={this.fileInputOnChange}></input>
                   <button className="btnAll" id="sendBtn" disabled={this.state.disabled} onClick={this.UploadFile} >Upload</button>
                
                <button className="btnAll" id="deleteBtn" onClick={this.props.back}>Back</button>
            </div>
        );
    }
	
	}
    export default UploadFile;
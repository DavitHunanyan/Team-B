import React,{Component} from 'react';
class UploadFile extends Component {
        constructor(props){
            super(props);
            this.state={
                disabled:true,
                message:false,
                responseMessage:"",
                error:false
            }

            this.UploadFile =this.UploadFile.bind(this);
            this.fileInputOnChange = this.fileInputOnChange.bind(this);
            this.responseMessagePopUp =this.responseMessagePopUp.bind(this);
            this.ok = this.ok.bind(this);
            this.errorPopUp = this.errorPopUp.bind(this);
            
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
				console.log("response",res)
                if(res.status === 200){
                    self.props.update();
                }
                if(res.status === 500){
                    self.setState({
                     error:true
                    })
                }
                return res.json();
			}).then(res =>{ 
                console.log("Message",res)
                if(typeof(res) ==="object"){
                 self.setState({
                     message:true,
                     responseMessage:res.Message
                    })
                }
                if(typeof(res) ==="string"){
                 self.setState({
                     message:true,
                     responseMessage:res
                    })
                }
        })
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
     ok(){
         this.setState({
            message:false,
         })
         this.props.back();
     }
     responseMessagePopUp(){
			if(this.state.message){
				
				return(
					<div className="PopUpBox">
						<div className="messagePopUp">
							<div className="Container">
							<div id="message">
                                <span>{this.state.responseMessage}</span><br/>
                                <button className="See_Contacts" onClick={this.ok}>Ok</button>
                            </div>
                            
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
				},3000)
				return(
					<div className="PopUpBox">
						<div className="PopUp">
							<div className="errorContainer">
							<div className="error"><b>File or data is corrupt !</b></div>
							</div>
						</div>
					</div>
				)
			}
		}
	render(){
        return(
            <div className="uploadCSV">
                {this.responseMessagePopUp()}
                {this.errorPopUp()}
                    <input name="data" type="file" onChange={this.fileInputOnChange}></input>
                   <button className="btnAll" id="sendBtn" disabled={this.state.disabled} onClick={this.UploadFile} >Upload</button>
                
                <button className="btnAll" id="deleteBtn" onClick={this.props.back}>Back</button>
            </div>
        );
    }
	
	}
    export default UploadFile;
import React,{Component} from 'react';

class TemplateSelect extends Component {
	constructor(props) {
		super(props);
        this.state={
            Template:[]
        }
		this.selectOnChange = this.selectOnChange.bind(this); 
        this.renderTemplate = this.renderTemplate.bind(this);
	}

     componentDidMount(){
        let self = this;
		return fetch('http://crmbetb.azurewebsites.net/api/Templates').then(function(response) {
			if (response.status === 200) {
				return response.json();
			}
		}).then(response => {
           //console.log("maillist",response);
			self.setState({
				Template: response,
			})
		}).catch(error => {
			alert("Something went wrong")
		})
     }
    selectOnChange(event){
				//console.log("You Select ",event.target.value);
                this.props.getValue(event.target.value);
			}
            
	 renderTemplate(data, index) {
        return (<option value={data.Id} key={index} >{data.TemplateName}</option>)
    }
	render(){
        return(
            <select onChange={this.selectOnChange} defaultValue="">
                {this.state.Template.map(this.renderTemplate)}
            <option value ="">No Selected</option>
            </select>
        );
    }
	
	}
    export default TemplateSelect;
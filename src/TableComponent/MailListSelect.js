import React,{Component} from 'react';

class MailListSelect extends Component {
	constructor(props) {
		super(props);
        this.state={
            MailList:[]
        }
		this.selectOnChange = this.selectOnChange.bind(this); 
        this.getInitialState = this.getInitialState.bind(this);
	}
    componentDidMount(){
        let self = this;
		return fetch('http://crmbetb.azurewebsites.net/api/MailingLists').then(function(response) {
			if (response.status === 200) {
				return response.json();
			}
		}).then(response => {
           
			self.setState({
				MailList: response,
			})
		}).catch(error => {
			alert("Something went wrong")
		})
     }

    	
	getInitialState () {
		return {
			options: [
				{ value: true, label: 'Yes' },
				{ value: false, label: 'No' }
			],
			value: null
		};
	}
	onChange(value) {
		this.setState({ value });
		console.log('Boolean Select value changed to', value);
	}
	render () {
		return (
			<div className="section">
				<h3 className="section-heading">{this.props.label}</h3>
				<Select
					onChange={this.onChange}
					options={this.state.options}
					simpleValue
					value={this.state.value}
					/>
				<div className="hint">This example uses simple boolean values</div>
			</div>
		);
	}
	
	}
    export default MailListSelect;
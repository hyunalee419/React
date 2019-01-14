import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { requestApiData } from '../../actions';

class Hello extends Component {

	componentDidMount() {
		console.log('good');
		this.props.requestApiData();
	}

	person = (x, i) =>
			<div key={x.id.value}>
				<h1>{x.gender}</h1>
				<h1>{x.name.first}</h1>
				<h1>{x.name.last}</h1>
				<img src={x.picture.medium}/>
			</div>;

	render() {
		const { results = [] } = this.props.data;

		return (
			results.length
				? <h1>
				 	  {results.map(this.person)}
				  </h1>
				: <h1>loading...</h1>
		)
	}
}

const mapStateProps = state => ({ data: state.data });

const mapDispatchToProps = dispatch =>
	bindActionCreators({ requestApiData }, dispatch);

export default connect(mapStateProps, mapDispatchToProps)(Hello);

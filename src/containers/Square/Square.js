import React, { Component } from 'react'
import classes from './Square.module.css'
import { connect } from 'react-redux'
import { hoverEndpoint, updatePage } from '../../redux/actions/inform'

class Square extends Component {

	hoverItem(point) {
		const squareItemActive = document.querySelector('.squareItem').classList.contains("squareActive")
		if (squareItemActive) {
			this.props.hoverEndpoint({ point })
			this.props.updatePage()
		}
	}

	componentDidMount() {

	}

	render() {

		const objstyle = {
			width: 300 / this.props.quantity,
			height: 300 / this.props.quantity
		}

		return (
			<div className={`squareItem ${classes.Square} ${this.props.quantity === 5 ? classes.width5 : (this.props.quantity === 10 ? classes.width10 : (this.props.quantity === 15 ? classes.width15 : null))}`} style={objstyle} onMouseEnter={() => this.hoverItem(this.props.point)} >

			</div >
		)
	}
}

function mapStateToProps(state) {
	return {
		endpoint: state.inform.endpoint
	}
}

function mapDispatchToProps(dispatch) {
	return {
		hoverEndpoint: obj => dispatch(hoverEndpoint(obj)),
		updatePage: () => dispatch(updatePage())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Square)
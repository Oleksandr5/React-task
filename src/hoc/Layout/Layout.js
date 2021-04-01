import React, { Component } from 'react'
import { connect } from 'react-redux'
import classes from './Layout.module.css'
import Select from '../../components/UI/Select/Select'
import Button from '../../components/UI/Button/Button'
import Square from '../../containers/Square/Square'
import { fetchEndpointData, updateHoverEndpoint } from '../../redux/actions/inform'

class Layout extends Component {

	state = {
		valueSelectedEndpoint: "easyMode",
		hover: false,
		updatePageChecked: false
	}

	btnStart() {
		const squareItems = [...document.querySelectorAll('.squareItem')]
		squareItems.forEach(link => {
			link.classList.add('squareActive')
		})
	}

	selectEndpoint = event => {

		let valueSelectedEndpoint = event.target.value

		this.setState({
			valueSelectedEndpoint
		})

		const squareItems = [...document.querySelectorAll('.squareItem')]
		squareItems.forEach(link => {
			link.classList.remove('squareActive')
		})

		this.props.updateHoverEndpoint({ hoverEndpoint: [] })

	}

	optionEndpoint = event => {

		const thisEndpointOptions = []

		const endpoint = this.props.endpoint

		for (const property in endpoint) {
			thisEndpointOptions.push({ text: property, value: property })
		}

		let thisEndpoint

		thisEndpointOptions.forEach((endpointoption, index) => {

			if (endpointoption.value === this.state.valueSelectedEndpoint) {
				thisEndpoint = endpointoption

				thisEndpointOptions.splice(index, 1)
				thisEndpointOptions.unshift(thisEndpoint)
			}

		})

		return thisEndpointOptions

	}

	pushSquare = endpoint => {

		const quantity = endpoint[this.state.valueSelectedEndpoint].field
		console.log('quantity', quantity)

		const arr = Array(quantity * quantity).fill('')
		console.log('arr', arr)
		const newArr = arr.map((item, i) => {

			let j = i + 1

			if (j <= quantity) {

				return (
					<Square key={j} quantity={quantity} point={{ row: 1, col: j }} />
				)

			} else {

				return (
					<Square key={j} quantity={quantity} point={{ row: (j % quantity) !== 0 ? Math.floor(j / quantity + 1) : (j / quantity), col: (j % quantity) !== 0 ? (j % quantity) : quantity }} />
				)

			}


		})
		console.log('newArr', newArr)
		return newArr
	}

	history() {
		return this.props.hoverEndpoint.map((endpoint, i) => {
			console.log('endpoint', endpoint)
			return (
				<div key={i - Math.random()} className={`rounded px-1 py-3 mb-2 ${classes.itemHistory}`} >
					row: {endpoint.row}, col: {endpoint.col}
				</div>
			)
		})
	}

	componentDidMount() {

		this.props.fetchEndpointData()

	}

	render() {

		const selectEndpoint = <Select
			name="endpoint"
			className={`${classes.selectEndpoint}`}
			onChange={this.selectEndpoint}
			option={this.optionEndpoint()}
		/>

		let endpoint = this.props.endpoint

		return (
			<div className={`container-fluid ${classes.Layout}`} >

				<div className="row mt-3">

					<div className={`col-12 col-sm-7 ${classes.main}`} >

						<div className={`mx-auto d-flex justify-content-between ${classes.mainHeader}`} >
							{selectEndpoint}
							<Button
								type="buttom"
								onClick={this.btnStart}
								className="py-1 btn btn-primary btnStart"
							>
								Start
							</Button>
						</div>

						<div className={`mx-auto d-flex flex-wrap ${classes.endpoint}`} >
							{this.props.endpoint[this.state.valueSelectedEndpoint] ? this.pushSquare(this.props.endpoint) : null}

						</div>
					</div>
					<div className={`col-12 col-sm-4 ${classes.blockHistory}`} >
						<h1 className={`mx-auto ${classes.h1History}`} >History</h1>
						<input type="checkbox" onChange={() => this.setState({ updatePageChecked: !this.state.updatePageChecked })} id={`updatePage`} checked={this.props.updatePageChecked} />
						<div className={`mx-auto overflow-auto webkit_scrollbar_width webkit_scrollbar_style ${classes.divHistory}`} >
							{this.history()}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		endpoint: state.inform.endpoint,
		hoverEndpoint: state.inform.hoverEndpoint,
		updatePageChecked: state.inform.updatePageChecked
	}
}

function mapDispatchToProps(dispatch) {
	return {
		fetchEndpointData: () => dispatch(fetchEndpointData()),
		updateHoverEndpoint: obj => dispatch(updateHoverEndpoint(obj))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
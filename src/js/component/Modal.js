import React, { useState, useContext } from "react";

import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import propTypes from "prop-types";

export const Modal = props => {
	const { store, actions } = useContext(Context);
	const [state, setState] = useState({
		//initialize state here
	});
	const getDelete = id => {
		fetch(`https://assets.breatheco.de/apis/fake/contact/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(res => {
				if (!res.ok) throw Error(res.statusText);
				actions.getData();
				return res.json();
			})
			.then(response => console.log("Success:", response))
			.catch(error => console.error(error));
	};

	return (
		<div className="modal" tabIndex="-1" role="dialog" style={{ display: props.show ? "inline-block" : "none" }}>
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Are you sure?</h5>
						{props.onClose ? (
							<button
								onClick={() => props.onClose()}
								type="button"
								className="close"
								data-dismiss="modal"
								aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						) : (
							""
						)}
					</div>
					<div className="modal-body">
						<p>Warning: unknown consequences after this point... Kidding!</p>
					</div>
					<div className="modal-footer">
						<button onClick={() => props.onClose()} type="button" className="btn btn-primary">
							Cancel
						</button>
						<button
							onClick={() => {
								getDelete(store.deleteId);
								props.onClose();
							}}
							type="button"
							className="btn btn-secondary"
							data-dismiss="modal">
							Confirm
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
/**
 * Define the data-types for
 * your component's properties
 **/
Modal.propTypes = {
	data: PropTypes.object,
	index: PropTypes.number,
	onClose: PropTypes.func,
	show: PropTypes.bool
};

/**
 * Define the default values for
 * your component's properties
 **/
Modal.defaultProps = {
	show: false,
	onClose: null
};

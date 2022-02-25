import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const AddContact = () => {
	const { store, actions } = useContext(Context);
	const [fullName, setFullName] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [address, setAddress] = useState("");

	//

	const addNewContact = (fn, pn, em, ad) => {
		fetch("https://assets.breatheco.de/apis/fake/contact/", {
			method: "POST",
			body: JSON.stringify({
				full_name: fn,
				email: em,
				agenda_slug: "agenda_jsn01",
				address: ad,
				phone: pn
			}), // data can be a `string` or  an {object} which comes from somewhere further above in our application
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

	//

	return (
		<div className="container">
			<div>
				<h1 className="text-center mt-5">Add a new contact</h1>
				<form>
					<div className="form-group">
						<label>Full Name</label>
						<input
							type="text"
							onChange={e => setFullName(e.target.value)}
							value={fullName}
							className="form-control"
							placeholder="Full Name"
						/>
					</div>
					<div className="form-group">
						<label>Email</label>
						<input
							type="email"
							onChange={e => setEmail(e.target.value)}
							value={email}
							className="form-control"
							placeholder="Enter email"
						/>
					</div>
					<div className="form-group">
						<label>Phone</label>
						<input
							type="phone"
							onChange={e => setPhone(e.target.value)}
							value={phone}
							className="form-control"
							placeholder="Enter phone"
						/>
					</div>
					<div className="form-group">
						<label>Address</label>
						<input
							type="text"
							onChange={e => setAddress(e.target.value)}
							value={address}
							className="form-control"
							placeholder="Enter address"
						/>
					</div>
					<button
						onClick={() => addNewContact(fullName, phone, email, address)}
						type="button"
						className="btn btn-primary form-control">
						save
					</button>
					<Link className="mt-3 w-100 text-center" to="/">
						or get back to contacts
					</Link>
				</form>
			</div>
		</div>
	);
};

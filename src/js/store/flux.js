const getState = ({ getStore, setStore }) => {
	return {
		store: {
			//Your data structures, A.K.A Entities
			Mycontacts: []
		},
		actions: {
			//(Arrow) Functions that update the Store
			// Remember to use the scope: scope.state.store & scope.setState()

			getData: () => {
				fetch("https://assets.breatheco.de/apis/fake/contact/agenda/agenda_jsn01")
					.then(response => response.json())
					.then(data => {
						console.log(data);
						setStore({ Mycontacts: data });
					})
					.catch(error => console.log("Looks like there was a problem: \n", error));
			}
		}
	};
};

export default getState;

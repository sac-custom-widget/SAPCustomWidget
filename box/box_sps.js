(function()  {
	let template = document.createElement("template");
	template.innerHTML = `
		<form id="form">
			<fieldset>
				<legend>Color Properties</legend>
				<table>
					<tr>
						<td>Color</td>
						<td><input id="sps_color" type="text" size="10" maxlength="10"></td>
					</tr>
				</table>
				<input type="submit">
			</fieldset>
		</form>
		<style>
		:host {
			display: block;
			padding: 1em 1em 1em 1em;
		}
		</style>
	`;

	class BoxSps extends HTMLElement {
		constructor() {
			super();
			this._shadowRoot = this.attachShadow({mode: "open"});
			this._shadowRoot.appendChild(template.content.cloneNode(true));
			this._shadowRoot.getElementById("form").addEventListener("submit", this._submit.bind(this));
		}

		_submit(e) {
			e.preventDefault();
			this.dispatchEvent(new CustomEvent("propertiesChanged", {
					detail: {
						properties: {
							color: this.color
						}
					}
			}));
		}

		set color(newColor) {
			this._shadowRoot.getElementById("sps_color").value = newColor;
		}

		get color() {
			return this._shadowRoot.getElementById("sps_color").value;
		}
	}

	customElements.define("com-demo-box-sps", BoxSps);
})();

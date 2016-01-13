var StudentModel = Backbone.Model.extend({
	// Modèle d'élève. Contient les données:
	// NOM
	// Prénom
	// Image
	// Présence
	defaults: {
		surname: '',
		name: '',
		picture: 'http://bit.ly/1OMRr64',
		here: false
	}
});
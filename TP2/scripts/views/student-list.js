var StudentListView = Backbone.View.extend ({

	el: '#app',

	events:{
		'submit form': 'addStudent',
		'change input [type="radio"]': 'studentHere' 
	},

	studentHere: function(event) {
		var $input = $(event.currentTarget);
		var inputValue = $input.val();

		var studentPresence = $input.parents('li').attr('data-title');

		console.log('Test1');

		this.myStudentCollection.findWhere({
			surname: studentFamilyName 
		});

		if(targetModel) {
			if(inputValue === 'here') {
				targetModel.set({
					here: true
				});
				console.log('Test2.1');
			} else {
				targetModel.set({
					here: false
				});
				console.log('Test2.2');

			}
		}
	},

	studentCount: function() {
		var everyStudent = this.myStudentCollection.toJSON();
		var studentHereCount = 0;
		var studentNotHereCount = 0;

		for (i=0; i < everyStudent.length; i++) {
			student = everyStudent[i];
			if (student.here) {
				studentHereCount++;
			} else {
				studentNotHereCount++;
			}
		}
		console.log(studentHereCount);
		console.log(studentNotHereCount);
		console.log(everyStudent.length);
	},

	//Ajouter des étudiants ici
	addStudent: function(event) {
		//Kill l'event pour prévenir le rechargement de la page
		event.preventDefault();

		//Récupérer les données du formulaire
		var $form = $(event.currentTarget);
		var studentSurname = $form.find('.student-surname').val();
		var studentName = $form.find('.student-name').val();
		var studentPic = $form.find('.student-pic').val();

		//Créer un nouvel élève qui va stocker les données
		var newStudentModel = new StudentModel({
			surname: studentSurname,
			name: studentName,
			picture:studentPic
		});

		//Ajouter le nouveau modèle dans la collection
		this.myStudentCollection.add(newStudentModel);
		newStudentModel.save();

		//Retourner la vue pour mettre à jour
		this.render();

		this.studentCount();

	},

	//Créer le template d'affichage des étudiants présents/absents
	//On affiche le NOM, Prénom, Image et la donnée Absence/Présence
	getTemplate: function(studentData) {

		var isHere = '';
		var isNotHere = 'checked';

		if (studentData.here) {
			isHere = 'checked';
			isNotHere = '';
		}

		//Regarde si l'utilisateur a mis une image. 
		//Si non, rajoute une image par défaut. 
		if (!studentData.picture) {
			studentData.picture = 'http://bit.ly/1OMRr64';
		}

		var studentTemplate = '\
			<li data-title="'+ studentData.surname +'">\
				<h2>'+ studentData.surname +'</h2>\
				<h3>'+ studentData.name	 +'</h3>\
				<img src="'+ studentData.picture +'"\
				<form>\
					<label>Présent</label>\
					<input '+ isHere +' type="radio" class="student-here" name="presence" value="here"/>\
					<label>Absent</label>\
					<input '+ isNotHere +' type="radio" class="student-here" name="presence" value="notHere"/>\
				</form>\
			</li>\
		';

		//Retourner la string qui est convertie en html grâce à JQuery
		return $(studentTemplate);
	},

	initialize: function() {
		//On lie la vue et la collection en créant une première instanciation de la collection
		this.myStudentCollection = new StudentCollection();

		//Sauvegarde dans localStorage
		newStudentModel.fetch();

		//Retourner la vue
		this.render();

	},

	render: function () {
		//Chosir l'endroit où on va mettre les étudiants ici
		var $renderTarget = this.$('.student-list');

		//Vider l'endroit sélectionner pour éviter qu'il ne se répète
		$renderTarget.empty();

		//Récupérer les données des étudiants de la collection
		var everyStudent = this.myStudentCollection.toJSON();

		//Récupérer et organiser comment afficher les données des étudiants ici
		for(var i =0; i < everyStudent.length; i++) {
			var student = everyStudent[i];

			//Récupérer le template d'affichage pour tous les films
			var studentTemplate = this.getTemplate(student);

			//Retourner la template une fois qu'elle est récupérée
			$renderTarget.append(studentTemplate);
		}
	}
});
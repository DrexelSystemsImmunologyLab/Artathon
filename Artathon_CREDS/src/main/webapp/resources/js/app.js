/**
 * 
 */


window.onload = function() {


}

	$( document ).ready(function() {



		 ItemsVue = new Vue({
			    el: '#app1',
			    data: {
			    	componentKey: 0,
			        clones: []




			    },

			    methods: {

					searchCloneByID: function(){
						var str=document.getElementById('searchInputField').value;

						$("#generalContainer").empty();
						$.getScript("/resources/js/getClones.js",function(){
							searchCloneById(str);
						});

					},
					searchReliableClones: function(){

						$("#generalContainer").empty();
						 $.getScript("/resources/js/getClones.js",function(){
							 searchClones();
							});

					}


					    
			    }
			
			  
	        
				});
			    
		
			    
	});
	
	
	
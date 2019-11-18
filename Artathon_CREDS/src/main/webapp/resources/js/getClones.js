function searchClones(){

   $.ajax({
        url: '/getReliableClones/',
        method: 'GET',
        success: function (clones) {


            this.clones  = clones;
            vclones= clones;
            $.getScript("/resources/js/insertClones.js",function(){
                addClonesTable(clones);
            })



        },
        error: function (error) {
            console.log(error);
        }
    });
}

function searchCloneById(str){

    $.ajax({
        url: '/getCloneById/'+str,
        method: 'GET',
        success: function (clones) {


            this.clones  = clones;
            vclones= clones;
            $.getScript("/resources/js/insertClones.js",function(){
                addClones(clones);
            })



        },
        error: function (error) {
            console.log(error);
        }
    });
}


var margin;
var i = 0,
    duration = 750,
    root;
var tree;
var diagonal;
var svg;
var treemap;
var tooltip;
var   legend;


function addClones(clones){


    $.each(clones, function(i,clone){

        var clonesarr = clone.split("#");
        var cloneID=clonesarr[0];
        var treejson = clonesarr[1];

        var treeData=JSON.parse(treejson);

    // ************** Generate the tree diagram	 *****************
        // Set the dimensions and margins of the diagram
         margin = {top: 20, right: 90, bottom: 30, left: 90},
            width = 2000 - margin.left - margin.right,
            height = 1000 - margin.top - margin.bottom;

        // append the svg object to the body of the page
        // appends a 'group' element to 'svg'
        // moves the 'group' element to the top left margin
         svg = d3.select("#generalContainer").append("svg")
            .attr("width", width + margin.right + margin.left)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate("
                + margin.left + "," + margin.top + ")");

         tooltip = d3.select("body")
            .append("div")
            .attr("class", "my-tooltip")//add the tooltip class
            .style("position", "absolute")
            .style("z-index", "10")
            .style("visibility", "hidden")
            .style("background-color","black")
             .style("color","white");

        legend = svg.append("g")
            .attr("class","legend")
            .attr("transform","translate(50,30)")
            .style("font-size","12px");

        appendLegend();

        // declares a tree layout and assigns the size
         treemap = d3.tree().size([height, width]);

        // Assigns parent, children, height, depth

            root = d3.hierarchy(treeData.tree, function(d) { return d.children; });

            root.x0 = height / 2;
            root.y0 = 0;

        // Collapse after the second level
          //  root.children.forEach(collapse);

            update(root);

            $.each(root.children, function( index, child ) {
                console.log(child.data.data.node_id);
            });


    })
}
// Collapse the node and all it's children
function collapse(d) {
    if(d.children) {
        d._children = d.children
        d._children.forEach(collapse)
        d.children = null
    }
}

function update(source) {

    // Assigns the x and y position for the nodes
    var treeData = treemap(root);

    // Compute the new tree layout.
    var nodes = treeData.descendants(),
        links = treeData.descendants().slice(1);

    // Normalize for fixed-depth.
    nodes.forEach(function(d){ d.y = d.depth * 180});

    // ****************** Nodes section ***************************

    // Update the nodes...
    var node = svg.selectAll('g.node')
        .data(nodes, function(d) {return d.id || (d.id = ++i); });

    // Enter any new modes at the parent's previous position.
    var nodeEnter = node.enter().append('g')
        .attr('class', 'node')
        .attr("transform", function(d) {
            return "translate(" + source.y0 + "," + source.x0 + ")";
        })
        .on('click', click);




    // Add Circle for the nodes
    nodeEnter.append('circle')

        .attr('r', function(d) {
            var radius = parseInt(d["data"]["data"]["copy_number"]) +10;
            console.log(radius);

            return radius ;
        })
        .style("fill", function(d) {

                if(d["data"]["data"]["metadata"]["timepoint"]==null){
                    return "white";
                }

                else if(d["data"]["data"]["metadata"]["timepoint"]=="-8d"){
                    return "Navy";
                }

                else if(d["data"]["data"]["metadata"]["timepoint"]=="-2d"){
                    return "Brown";
                }
                else if(d["data"]["data"]["metadata"]["timepoint"]=="-1h"){
                    return "Olive";
                }

                else if(d["data"]["data"]["metadata"]["timepoint"]=="+1h"){
                    return "Orange";
                }
                else if(d["data"]["data"]["metadata"]["timepoint"]=="+1d"){
                    return "Yellow";
                }

                else if(d["data"]["data"]["metadata"]["timepoint"]=="+3d"){
                    return "Lime";
                }

                else if(d["data"]["data"]["metadata"]["timepoint"]=="+7d"){
                    return "Cyan";
                }

                else if(d["data"]["data"]["metadata"]["timepoint"]=="+14d"){
                    return "Magenta";
                }

                else if(d["data"]["data"]["metadata"]["timepoint"]=="+21d"){
                    return "green";
                }
                else if(d["data"]["data"]["metadata"]["timepoint"]=="+28d"){
                    return "blue";
                }
                else{
                    return "purple";
                }




            return d._children ? "lightsteelblue" : "#fff";
        }).style("stroke",function(d){
        if(d["data"]["data"]["mutations"].length==1 && d.children==null){
            return "red";
        }

     }).style("stroke-width","3").on('mouseover', function(d) {

        var mutationNum= d["data"]["data"]["mutations"].length;


       /* /!*
        * for sequence metadata
        * *!/
       var seqidsKey = Object.keys(d["data"]["data"]["seq_ids"]).toString();
        if(d["data"]["data"]["seq_ids"][seqidsKey]["metadata"]!=null){
            var timepoint =d["data"]["data"]["seq_ids"][seqidsKey]["metadata"]["timepoint"];
        }*/

        var timepoint='no time point';
        if(d["data"]["data"]["metadata"]!=null){
            var timepoint =d["data"]["data"]["metadata"]["timepoint"];
        }



        var copyNum= d["data"]["data"]["copy_number"];

        var tooltipText='Node_id: '+d["data"]["data"]["node_id"]+' Number of mutations: '+mutationNum+' Timepoint: '+timepoint+' Number of copies: '+copyNum+' ';


        return tooltip.style("visibility", "visible")
            .text(tooltipText);
    }).on("mousemove", function() {
        return tooltip.style("top", (d3.event.pageY - 40) + "px").style("left", (d3.event.pageX - 130) + "px");
    }).on("mouseout", function() {
        return tooltip.style("visibility", "hidden");
    });

    // Add labels for the nodes
    nodeEnter.append('text')
        .attr("dy", ".35em")
        .attr("x", function(d) {
            return d.children || d._children ? -13 : 13;
        })
        .attr("text-anchor", function(d) {
            return d.children || d._children ? "end" : "start";
        })
        .text(function(d) { return d["data"]["data"]["mutations"].length; }).style("fill", function(d){

            if(d["data"]["data"]["mutations"].length==1){
                return "red";
            }
            else{
                return "black";
            }
        }).style("font-weight","bold");





    // UPDATE
    var nodeUpdate = nodeEnter.merge(node);

    // Transition to the proper position for the node
    nodeUpdate.transition()
        .duration(duration)
        .attr("transform", function(d) {
            return "translate(" + d.y + "," + d.x + ")";
        });

    // Update the node attributes and style
    nodeUpdate.select('circle.node')
        .attr('r', 10)
        .style("fill", function(d) {
            return d._children ? "lightsteelblue" : "#fff";
        })
        .attr('cursor', 'pointer');


    // Remove any exiting nodes
    var nodeExit = node.exit().transition()
        .duration(duration)
        .attr("transform", function(d) {
            return "translate(" + source.y + "," + source.x + ")";
        })
        .remove();

    // On exit reduce the node circles size to 0
    nodeExit.select('circle')
        .attr('r', 1e-6);

    // On exit reduce the opacity of text labels
    nodeExit.select('text')
        .style('fill-opacity', 1e-6);

    // ****************** links section ***************************

    // Update the links...
    var link = svg.selectAll('path.link')
        .data(links, function(d) { return d.id; })
        .attr("pathLength", function(d) { return (100); });;

    // Enter any new links at the parent's previous position.
    var linkEnter = link.enter().insert('path', "g")
        .attr("class", "link")
        .attr('d', function(d){
            var o = {x: source.x0, y: source.y0}
            return diagonal(o, o)
        });

    // UPDATE
    var linkUpdate = linkEnter.merge(link);

    // Transition back to the parent element position
    linkUpdate.transition()
        .duration(duration)
        .attr('d', function(d){ return diagonal(d, d.parent) });

    // Remove any exiting links
    var linkExit = link.exit().transition()
        .duration(duration)
        .attr('d', function(d) {
            var o = {x: source.x, y: source.y}
            return diagonal(o, o)
        })
        .remove();

    // Store the old positions for transition.
    nodes.forEach(function(d){
        d.x0 = d.x;
        d.y0 = d.y;
    });

    // Creates a curved (diagonal) path from parent to the child nodes
    function diagonal(s, d) {
        var sourcex=s.x;
        var targetx=d.x;
        var sourcey=s.y;
        var targety=d.y;
        var extendedTargetParse=parseInt(targetx,10);
        var extendedTarget = extendedTargetParse+25;
        var extendedTargetTxt = extendedTarget.toString();

        if(sourcex==targetx){
            path = "M" + sourcey + "," + sourcex
                + "C" + (sourcey + targety) / 2 + "," + sourcex
                + " " + (sourcey + targety) / 2 + "," + extendedTargetTxt
                + " " + targety + "," + targetx;
        }else{
            path = "M" + sourcey + "," + sourcex
                + "C" + (sourcey + targety) / 2 + "," + sourcex
                + " " + (sourcey + targety) / 2 + "," + targetx
                + " " + targety + "," + targetx;
        }



        return path
    }

    // Toggle children on click.
    function click(d) {
        if (d.children) {
            d._children = d.children;
            d.children = null;
        } else {
            d.children = d._children;
            d._children = null;
        }
        update(d);
    }
}

function addClonesTable(clones){
    var table = ' <table id = "clonesTable" class="table table-striped"></table>';
    $("#generalContainer").append(table);

    var thcloneid = '<thead><tr><th>Clone ID</th><th>Subject ID</th><th>Functional</th><th>Number of mutations</th><th>Unique sequences</th><th>Instances</th><th>Total sequences</th></tr></thead>';
    $("#clonesTable").append(thcloneid);

    var tbody='<tbody id="tbody_id"></tbody>';
    $("#clonesTable").append(tbody);

    $.each(clones, function(i,clone) {



        var cloneC = JSON.parse(clone);




        var row = '<tr id="dataRow'+i+'"></tr>';
        $("#tbody_id").append(row);

        var func=null;

        if(cloneC.functional=="1"){
            func="Yes";
        }else if(cloneC.functional=="0"){
            func="No";
        }

        var cloneID = '<td>'+cloneC.id+' <button class="btn btn-outline-primary btn-sm" onclick="searchCloneByIdNow('+cloneC.id+')">Tree</button></td>';
        var subjectID = '<td>'+cloneC.subject_id+'</td>';
        var functional = '<td>'+func+'</td>';
        var mutationNum = '<td>'+cloneC.mutations_num+'</td>';
        var uniqueseq = '<td>'+cloneC.unique_sequences+'</td>';
        var instances = '<td>'+cloneC.instances+'</td>';
        var totalseq = '<td>'+cloneC.total_sequences+'</td>';

        $("#dataRow"+i).append(cloneID);
        $("#dataRow"+i).append(subjectID);
        $("#dataRow"+i).append(functional);
        $("#dataRow"+i).append(mutationNum);
        $("#dataRow"+i).append(uniqueseq);
        $("#dataRow"+i).append(instances);
        $("#dataRow"+i).append(totalseq);




    });
    $('#clonesTable').DataTable({
        'order': [[ 1, 'desc' ]],
        "iDisplayLength": 10,
        "aLengthMenu": [[5,10, 15], [5,10, 15]]
    });


}

function searchCloneByIdNow(str){
    $("#generalContainer").empty();
    searchCloneById(str);
}

function appendLegend(){
    legend.append("rect")
        .attr("x", 1565)
        .attr("y", 25)
        .attr("width", 10)
        .attr("height", 10)
        .style("fill", function(d) { return "white" });

    legend.append("text")
        .attr("x", 1565)
        .attr("y", 25)
        .text(function(d) { return "no time point" });

    legend.append("rect")
        .attr("x", 1565)
        .attr("y", 55)
        .attr("width", 10)
        .attr("height", 10)
        .style("fill", function(d) { return "Navy" });

    legend.append("text")
        .attr("x", 1565)
        .attr("y", 55)
        .text(function(d) { return "-8d" });

    legend.append("rect")
        .attr("x", 1565)
        .attr("y", 85)
        .attr("width", 10)
        .attr("height", 10)
        .style("fill", function(d) { return "Brown" });

    legend.append("text")
        .attr("x", 1565)
        .attr("y", 85)
        .text(function(d) { return "-2d" });

    legend.append("rect")
        .attr("x", 1565)
        .attr("y", 115)
        .attr("width", 10)
        .attr("height", 10)
        .style("fill", function(d) { return "Olive" });

    legend.append("text")
        .attr("x", 1565)
        .attr("y", 115)
        .text(function(d) { return "-1h" });

    legend.append("rect")
        .attr("x", 1565)
        .attr("y", 145)
        .attr("width", 10)
        .attr("height", 10)
        .style("fill", function(d) { return "Orange" });

    legend.append("text")
        .attr("x", 1565)
        .attr("y", 145)
        .text(function(d) { return "+1h" });

    legend.append("rect")
        .attr("x", 1565)
        .attr("y", 175)
        .attr("width", 10)
        .attr("height", 10)
        .style("fill", function(d) { return "Yellow" });

    legend.append("text")
        .attr("x", 1565)
        .attr("y", 175)
        .text(function(d) { return "+1d" });

    legend.append("rect")
        .attr("x", 1565)
        .attr("y", 205)
        .attr("width", 10)
        .attr("height", 10)
        .style("fill", function(d) { return "Lime" });

    legend.append("text")
        .attr("x", 1565)
        .attr("y", 205)
        .text(function(d) { return "+3d" });

    legend.append("rect")
        .attr("x", 1565)
        .attr("y", 235)
        .attr("width", 10)
        .attr("height", 10)
        .style("fill", function(d) { return "Cyan" });

    legend.append("text")
        .attr("x", 1565)
        .attr("y", 235)
        .text(function(d) { return "+7d" });

    legend.append("rect")
        .attr("x", 1565)
        .attr("y", 265)
        .attr("width", 10)
        .attr("height", 10)
        .style("fill", function(d) { return "Magenta" });

    legend.append("text")
        .attr("x", 1565)
        .attr("y", 265)
        .text(function(d) { return "+14d" });

    legend.append("rect")
        .attr("x", 1565)
        .attr("y", 295)
        .attr("width", 10)
        .attr("height", 10)
        .style("fill", function(d) { return "green" });

    legend.append("text")
        .attr("x", 1565)
        .attr("y", 295)
        .text(function(d) { return "+21d" });

    legend.append("rect")
        .attr("x", 1565)
        .attr("y", 325)
        .attr("width", 10)
        .attr("height", 10)
        .style("fill", function(d) { return "blue" });

    legend.append("text")
        .attr("x", 1565)
        .attr("y", 325)
        .text(function(d) { return "+28d" });

    legend.append("rect")
        .attr("x", 1565)
        .attr("y", 355)
        .attr("width", 10)
        .attr("height", 10)
        .style("fill", function(d) { return "purple" });

    legend.append("text")
        .attr("x", 1565)
        .attr("y", 355)
        .text(function(d) { return "multiple time points" });

//comment7
}
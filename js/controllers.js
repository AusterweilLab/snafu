// Bind HTML elements

// Cheap hack to style file select button
$("#choose_file").click(function() {
    $("#real_choose_file").click();
});

$("#real_choose_file").change(function() {
    var selected_file = $(this).val();
    $("#fluency_files").val(selected_file);
    $("#fluency_dir").val("");
});

$("#loaddata").click(function() {
	data_parameters.dir = $("#fluency_dir").val();
    data_parameters.filename = $("#fluency_files").val();
    data_parameters.fullpath = data_parameters.dir + "/" + data_parameters.filename;
    command = { "type": "list_subjects_and_categories",
                "fullpath": data_parameters.fullpath
              }
    pysend(command);
});

$("#reset").click(function() {
    data_properties = {};
    network_properties = {};
    data_properties_rvs.update({ data_properties: data_properties });
    network_properties_rvs.update({ network_properties: network_properties });
});

$("#calculate_data_properties").click(function() {
    data_properties = {};
    data_properties_rvs.update({ data_properties: data_properties });
    command = { "type": "data_properties",
                "data_parameters": data_parameters
              }
    pysend(command);
});

$("#generate_network").click(function() {
    network_properties = {};
    network_properties_rvs.update({ network_properties: network_properties });
    command = { "type": "network_properties",
                "data_parameters": data_parameters,
                "network_parameters": network_parameters
              }
    pysend(command);
});

$("#view_network").click(function() {
    openwindow("viewgraph.html", {
        "title": "Graph Viewer",
        "height": 600,
        "width": 1000});
});

$("#export_network").click(function() {
    if (snafu_type == "web") {
        command = { "type": "write_data", "writestring": JSON.stringify(network_properties.graph) }
        pysend(command)
    } else {
		$("#real_export_network").click();
	}
});

$("#export_data").click(function() {
    if (snafu_type == "web") {
        command = { "type": "write_data", "writestring": JSON.stringify(data_properties) }
        pysend(command)
    } else {
		$("#real_export_data").click();
	}
});

$("#real_export_network").change(function() {
	function saveFile(filename) {
		var fs = require('fs');
		fs.writeFile(filename, JSON.stringify(network_properties.graph), function(err) {
			if(err) {
				return console.log(err);
			}
			console.log("File saved");
		});
	}

	var filename = $(this).val();
	saveFile(filename);
});

$("#real_export_data").change(function() {
	function saveFile(filename) {
		var fs = require('fs');
		fs.writeFile(filename, JSON.stringify(data_properties), function(err) {
			if(err) {
				return console.log(err);
			}
			console.log("File saved");
		});
	}

	var filename = $(this).val();
	saveFile(filename);
});

$("#question").click(function() {
    openwindow("help.html", {
        "title": "Help",
        "height": 600,
        "width": 600});
});

// $("#intrusion_list").click() used to work and now it doesn't. 
// #something to do with the element being hidden on start, but not sure why it used to work
// https://stackoverflow.com/a/11050439/353278

$("body").on("click","#intrusion_list",function(e) {
    e.preventDefault();
    openwindow("intrusions.html", {
        "title": "Intrusion list",
        "height": 300,
        "width": 300});
});

$("body").on("click","#perseveration_list",function(e) {
    e.preventDefault();
    openwindow("perseverations.html", {
        "title": "Perseveration list",
        "height": 300,
        "width": 300});
});

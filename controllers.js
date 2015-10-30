
var codforcesAPI = "http://codeforces.com/api/contest.standings?contestId=374&from=1&count=5&showUnofficial=true";
var obj, jsonData = new Array(), contest, problems, rows;
var contestName, problemsNames = [], rank = [], handles = [], penalty = [], score = [], contestantProblemsResults = [];

$(function() {
	
	$.getJSON(codforcesAPI, function(data) {
		obj = data;
		//console.log(obj);

		$.each(data, function(key, value){
			jsonData.push(value);
		});
		//console.log(jsonData[1]);

		contest = jsonData[1]['contest'];
		//console.log(contest);

		problems = jsonData[1]['problems'];
		//console.log(problems);

		rows = jsonData[1]['rows'];
		//console.log(rows);

		// Contest name to be displayed at the header
		contestName = contest['name'];

		// Problems names to be displayed in the table header row (instead of problem 1, problem 2, and so on)
		for(var i = 0; i < problems.length; i++)
		{
			problemsNames.push(problems[i]['index'] + ' - ' + problems[i]['name']);
		}
		
		// Rank
		for(var i = 0; i < rows.length; i++)
		{
			rank.push(rows[i]['rank']);
		}
		
		// Codeforces Handles
		for(var i = 0; i < rows.length; i++)
		{
			handles.push(rows[i]['party']['members'][0]['handle']);
		}		

		// Penalty
		for(var i = 0; i < rows.length; i++)
		{
			penalty.push(rows[i]['penalty']);
		}
		
		// Score
		for(var i = 0; i < rows.length; i++)
		{
			score.push(rows[i]['points']);
		}
		
		// Problem results for each student
		for(var i = 0; i < rows.length; i++)
		{
			var problemsResults = [];
			for(var j = 0; j < rows.length; j++)
			{
				problemsResults.push(rows[i]['problemResults'][j]['points']);
			}
			contestantProblemsResults.push(problemsResults);
		}

		/*
		console.log(contestName);
		console.log(problemsNames);
		console.log(rank);
		console.log(handles);
		console.log(penalty);
		console.log(score);
		console.log(contestantProblemsResults);
		*/
		
		// Displaying Title (Contest Name)
		$("#title").text(contestName);

		// Displaying Table Header Row
		var headerRow = "<tr><th>Rank</th><th>Codeforces Handle</th><th>Penalty</th><th>Score</th><th>"+problemsNames[0]+"</th><th>"+problemsNames[1]+"</th><th>"
		+problemsNames[2]+"</th><th>"+problemsNames[3]+"</th><th>"+problemsNames[4]+"</th></tr>";
		$("#contestants tbody").append(headerRow);

		// Bubble Sorting based on 'Score'
		for (var i= 0 ; i< score.length ; i++){
			for (var j= 0 ; j< score.length ; j++){
				//bubble sort
				if (score[i]>score[j]){
					var temp = score[i];
					// score
					score[i]=score[j];
					score[j] = temp;
					//handle
					temp = handles[i];
					handles[i]=handles[j];
					handles[j]=temp;
					//penalty
					temp = penalty[i];
					penalty[i] = penalty[j];
					penalty[j]=penalty[i];
					//
					temp = contestantProblemsResults[i][0];
					contestantProblemsResults[i][0] = contestantProblemsResults[j][0];
					contestantProblemsResults[j][0] = temp;
					//
					temp = contestantProblemsResults[i][1];
					contestantProblemsResults[i][1] = contestantProblemsResults[j][1];
					contestantProblemsResults[j][1] = temp;
					//
					temp = contestantProblemsResults[i][2];
					contestantProblemsResults[i][2] = contestantProblemsResults[j][2];
					contestantProblemsResults[j][2] = temp;
					//
					temp = contestantProblemsResults[i][3];
					contestantProblemsResults[i][3] = contestantProblemsResults[j][3];
					contestantProblemsResults[j][3] = temp;
					//
					temp = contestantProblemsResults[i][4];
					contestantProblemsResults[i][4] = contestantProblemsResults[j][4];
					contestantProblemsResults[j][4] = temp;
				}
			}
		}

		// Displaying Table Rows
		var row = "";
		for (var i =0 ; i<handles.length ; i++)
		{
			row+= "<tr><td>"+rank[i]+"</td><td>"+handles[i]+"</td><td>"+penalty[i]+"</td><td>"+score[i]+"</td><td>"
			+contestantProblemsResults[i][0]+"</td><td>"+contestantProblemsResults[i][1]+"</td><td>"+contestantProblemsResults[i][2]+
			"</td><td>"+contestantProblemsResults[i][3]+"</td><td>"+contestantProblemsResults[i][4]+"</td></tr>";
			$("#contestants tbody").append(row);
			row="";
		}

	});

});




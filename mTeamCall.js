$(document).ready(function(){
    $.ajax(
        {   
            url: "test.php",
            type: "GET",
            dataType: "json",
            success: function(mteam)
            {
                var team = mteam.teams[0];
                var teamName = team.location+' '+ team.nickname;
                var overallRecord = team.record.overall;
                var awayRecord = team.record.away;
                var homeRecord = team.record.home;
                var divisionRecord = team.record.division;
                
                $('#teamName').append(teamName);
                $('#playoffSeed').append(team.playoffSeed);
                $('#prjRank').append(team.currentProjectedRank);
                $('#overall').append(overallRecord.wins + "-" + overallRecord.losses + "-" + overallRecord.ties);
                $('#home').append(homeRecord.wins + "-" + homeRecord.losses + "-" + homeRecord.ties);
                $('#away').append(awayRecord.wins + "-" + awayRecord.losses + "-" + awayRecord.ties);
                $('#division').append(divisionRecord.wins + "-" + divisionRecord.losses + "-" + divisionRecord.ties);
                $('#pointsFor').append(overallRecord.pointsFor);
                $('#pointsAgainst').append(overallRecord.pointsAgainst);
                
                if(overallRecord.streakType != null & overallRecord.streakType == "WIN" || overallRecord.streakType == "LOSE")
                {
                    $('#winStreak').append(overallRecord.streakLength + " Game " + overallRecord.streakType.charAt(0) + " Streak");
                }
            },
            error: function(err)
            {
                alert("Error: " + err);
            }
        });
    });
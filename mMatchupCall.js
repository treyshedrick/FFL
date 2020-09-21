$('#matchupbtn').one('click',function(){
    $.ajax(
        {   
            url: "matchup.php",
            type: "GET",
            dataType: "json",
            success: function(matchup)
            {
                var myTeam;
                var opponentTeam;
                for(gloop=0; gloop< matchup.schedule.length; gloop++)
                {
                    if(matchup.schedule[gloop].home.teamId == 1 || matchup.schedule[gloop].away.teamId == 1 && matchup.schedule[gloop].home.totalPointsLive != null)
                    {
                        if(matchup.schedule[gloop].home.teamId == 1)
                            {
                                myTeam = matchup.schedule[gloop].home;
                                opponentTeam = matchup.schedule[gloop].away;
                            }
                        else
                            {
                                myTeam = matchup.schedule[gloop].away;
                                opponentTeam = matchup.schedule[gloop].home;
                            }
                        $('#mypoints').append(myTeam.totalPointsLive);
                        $('#opponentpoints').append(opponentTeam.totalPointsLive);
                        $('#matchup').show();
                    }
                }
            },
            error: function(err)
            {
                alert("Error: " + err);
            }
        });
    });
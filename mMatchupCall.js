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
                /* statsGroup Array description
                4: TD Pass | 8: Every 25 Passing Yards | 25: Rush TD
                28: Every 10 rushing yards | 43: TD reception | 48: Every 10 receiving yards
                53: Reception | 72: Fumbles lost | 80: FG Made | 86: Each PAT Made
                */
                var statsGroup = [4,8,25,28,43,48,53,72,80];
                var stats = [0,0,0,0,0,0,0,0,0];

                for(gloop=0; gloop< matchup.schedule.length; gloop++)
                {
                    if(matchup.schedule[gloop].home.totalPointsLive != null && (matchup.schedule[gloop].home.teamId == 1 || matchup.schedule[gloop].away.teamId == 1))
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
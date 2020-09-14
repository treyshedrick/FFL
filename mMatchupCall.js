$('#matchupbtn').one('click',function(){
    $.ajax(
        {   
            url: "matchup.php",
            type: "GET",
            dataType: "json",
            success: function(matchup)
            {
                for(gloop=0; gloop< matchup.schedule.length; gloop++)
                {
                    if(matchup.schedule[gloop].home.teamId == 1 || matchup.schedule[gloop].away.teamId == 1 && matchup.schedule[gloop].home.totalPointsLive != null)
                    {
                        if(matchup.schedule[gloop].home.teamId == 1)
                            {
                                $('#mypoints').append(matchup.schedule[gloop].home.totalPointsLive);
                                $('#opponentpoints').append(matchup.schedule[gloop].away.totalPointsLive);
                            }
                        else
                            {
                                $('#mypoints').append(matchup.schedule[gloop].away.totalPointsLive);
                                $('#opponentpoints').append(matchup.schedule[gloop].home.totalPointsLive);
                            }
                        
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
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
                53: Reception | 72: Fumbles lost | 20: Interceptions Thrown | 19: 2pt Passing Conversion
                */
                var statsGroup = ["4","8","25","28","43","48","53","72","20","19"];
                var stats = [0,0,0,0,0,0,0,0,0,0];
                var benchPoints = 0;

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

                        //Go through each player on my roster and add individual stats to stats array
                        for(rosterNum=0; rosterNum < myTeam.rosterForCurrentScoringPeriod.entries.length; rosterNum++)
                        {
                            var player = myTeam.rosterForCurrentScoringPeriod.entries[rosterNum].playerPoolEntry.player
                            for(x=0; x< player.stats.length; x++)
                            {
                                if(player.stats[x].appliedTotal % 1 == 0 && player.stats[x].appliedTotal != 0 && myTeam.rosterForCurrentScoringPeriod.entries[rosterNum].lineupSlotId !=20)
                                {
                                    for(sloop=0; sloop < statsGroup.length + 1; sloop++)
                                    {
                                        for(asloop=0; asloop < Object.keys(player.stats[x].appliedStats).length; asloop++)
                                        {
                                            if(statsGroup[sloop] == Object.keys(player.stats[x].appliedStats)[asloop])
                                            {
                                                stats[sloop] += player.stats[x].appliedStats[statsGroup[sloop]];
                                            }
                                        }
                                    }
                                }
                                //bench points
                                else if(myTeam.rosterForCurrentScoringPeriod.entries[rosterNum].lineupSlotId == 20 && player.stats[x].appliedTotal % 1 == 0)
                                {
                                    benchPoints += player.stats[x].appliedTotal;
                                }
                            }
                        }
                        //stats coming from my defense and kicker totalpoints - all indivdual stats combined
                        var pointsDefenseKicker = myTeam.totalPointsLive - stats.reduce((a,b) => a + b, 0);
                        $('#passTD').append(stats[0]);
                        $('#passYards').append(stats[1]);
                        $('#rushTD').append(stats[2]);
                        $('#rushYards').append(stats[3]);
                        $('#receptionTD').append(stats[4]);
                        $('#receptionYards').append(stats[5]);
                        $('#reception').append(stats[6]);

                        if(stats[7] < 0)
                        {
                            $('#fumbles').append("Fumbles Lost: " + stats[7]);
                        }
                        if(stats[8] < 0)
                        {
                            $('#int').append("Interceptions Thrown: " + stats[8]);
                        }
                        if(stats[9] > 0)
                        {
                            $('#2ptPass').append("2pt Passing Conversion: " + stats[9]);
                        }

                        $('#defenseKicker').append(pointsDefenseKicker);
                        $('#bench').append(benchPoints);
                        $('#matchup').show();
                    }
                }
            },
            error: function(err)
            {
                alert("Unable to load matchup\nError: " + err);
            }
        });
    });
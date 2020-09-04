$(document).ready(function(){
    $.ajax(
        {   
            url: "test.php",
            type: "GET",
            dataType: "json",
            success: function(mteam)
            {
                $('#teamName').append(mteam.teams[0].location+' '+ mteam.teams[0].nickname);
                $('#prjRank').append(mteam.teams[0].currentProjectedRank);
            },
            error: function(err)
            {
                alert("Error: " + err);
            }
        });
    });
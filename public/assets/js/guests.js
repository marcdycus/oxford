$(function () {
    $.ajax("/guests", {
        type: "GET"
    }).then(function (data) {
        var waitingElem = $(".waitlist");
        var satElem = $(".satguests");

        var gues = data.guests;
        var len = gues.length;
        console.log(gues)

        for (var i = 0; i < len; i++) {
            var new_elem = "<li>";

            if (!gues[i].sat) {
                new_elem += " <button class='change-sat' data-guestId='" + gues[i].id +"' data-newState='true'> " + gues[i].name + " </button></li>";
                waitingElem.append(new_elem);
            }

            if (gues[i].sat) {
                new_elem += " <button class='delete-guest' data-guestId='" + gues[i].id +"' data-newState='false'>" + gues[i].name + " &times;</button></li>";
                satElem.append(new_elem);
            }
        }
    });

    $(document).on("click", ".change-sat", function (event) {
        var newID = $(this).attr("data-guestId");
        var newGuestStat = $(this).data("isSat") === true;

        console.log(newID)
        var newSatState = {
            eaten: newGuestStat
        };

        $.ajax("/guests/" + newID, {
            type: "PUT",
            data: JSON.stringify(newSatState),
            dataType: 'json',
            contentType: 'application/json'
        }).then(function () {
            console.log("changed *sat* to", newGuestStat);

            location.reload();
        });

    });


    document.addEventListener("dragstart", function (event) {
        // console.log("hello1");
        event.dataTransfer.setData("Text", event.target.id);
        event.dataTransfer.setData("guestId", $(event.target).find("button").data("guestid"));
        event.dataTransfer.setData("newState", $(event.target).find("button").data("newstate"));
    });
    document.addEventListener("dragover", function (event) {
        console.log("hello2");
        event.preventDefault();
    });

    document.addEventListener("drop", function (event) {
        // console.log(this);
       
        event.preventDefault();
        // console.log(event);

        var elemId = event.dataTransfer.getData("Text");
        var guestId=event.dataTransfer.getData("guestId");
        var newState = event.dataTransfer.getData("newState");
        var newBurgStat;
        var newEatenState;
        
        if (event.target.className == "eatenBurgers") {
            event.target.appendChild(document.getElementById(elemId));

            newBurgStat = (newState === 'true');

            newEatenState = {
                eaten: newBurgStat
            };
            console.log(guestId);
            // console.log(newBurgStat)
            // $.ajax("/guests/" + guestId, {
            //     type: "PUT",
            //     data: JSON.stringify(newEatenState),
            //     dataType: 'json',
            //     contentType: 'application/json'
            // }).then(function () {
            //     console.log("changed *eaten* to", newBurgStat);
    
            //     location.reload();
            // });
            
        }
        
    });



    $(".create-form").on("submit", function (event) {
        event.preventDefault();

        var newGuest = {
            name: $("#gues").val().trim(),
            sat: $("[name=sat]:checked").val(),
            guestCount: $("#count").val()
        };

        $.ajax("/guests", {
            type: "POST",
            data: JSON.stringify(newGuest),
            dataType: 'json',
            contentType: 'application/json'
        }).then(function () {
            console.log("created new guest");
            console.log(newGuest);
            location.reload();
        });

        // console.log(newBurg)
    });

    $(document).on("click", ".delete-guest", function (event) {
        var id = $(this).attr("data-guestId");

        $.ajax("/guests/" + id, {
            type: "DELETE"
        }).then(function () {
            console.log("deleted guest", id);

            location.reload();
        });
    });
});

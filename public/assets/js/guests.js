$(function() {
    $.ajax("/guests", {
        type: "GET"
    }).then(function(data) {
        var waitingElem = $(".waitlist");
        var satElem = $(".satguests");
        var gues = data.guests;
        var len = gues.length;
        // console.log(gues);
        // console.log(moment().format());
        

        for (var i = 0; i < len; i++) {
            var new_elem = "<li>";

            if (!gues[i].sat) {
                new_elem += "<button class='change-sat reservation' data-guestId='" + gues[i].id + "' data-newState=" + gues[i].sat + "><p>" + gues[i].name + "</p><p class='guestCount'>" + gues[i].guestCount + "</p><p class='arriveTime'>" + gues[i].arriveTime + "</p></button></li>";
                waitingElem.append(new_elem);
            }

            if (gues[i].sat) {
                new_elem += " <button class='delete-guest reservation' data-guestId='" + gues[i].id + "' data-newState=" + gues[i].sat + "> <p class='delete'>&times;</p><p>" + gues[i].name + "</p><p class='guestCount'>" + gues[i].guestCount + "</p><p class='arriveTime'>" + gues[i].satTime + "</p></button></li>";
                satElem.append(new_elem);
            }
        }
    });

    $(document).on("click", ".change-sat", function (event) {
        var newID = $(this).attr("data-guestId");
        var newTime = moment().format('hh:mm:ss');
        var newSatState = {
            sat: true,
            satTime: newTime
        };
        // console.log(newTime);
        $.ajax("/guests/" + newID, {
            type: "PUT",
            data: JSON.stringify(newSatState),
            dataType: 'json',
            contentType: 'application/json'
        }).then(function () {
            console.log("changed *sat* to", newSatState);

            location.reload();
        });

    });


    $(".create-form").on("submit", function (event) {
        var gInput = $('#gues').val()
        var gCount = $('#count').val()
        if (!gInput || !gCount) {
            return false
        } else {
            event.preventDefault();
            var newTime = moment().format('hh:mm:ss');
            var newGuest = {
                name: $("#gues").val().trim(),
                sat: $("[name=sat]:checked").val(),
                guestCount: $("#count").val(),
                arriveTime: newTime,
                satTime: newTime
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
        }
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

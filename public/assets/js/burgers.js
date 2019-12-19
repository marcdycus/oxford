$(function () {
    $.ajax("/burgers", {
        type: "GET"
    }).then(function (data) {
        var freshElem = $("#freshBurgers");
        var eatenElem = $("#eatenBurgers");

        var burgs = data.burgers;
        var len = burgs.length;

        for (var i = 0; i < len; i++) {
            var new_elem = "<li>";

            if (burgs[i].eaten) {
                new_elem += " <button class='change-eaten' data-id='" +
                    burgs[i].id +
                    "' data-newburg='" +
                    !burgs[i].eaten +
                    "'>" + burgs[i].name + "</button>";
                freshElem.append(new_elem);
            }

            if (!burgs[i].eaten) {
                new_elem += " <button class='delete-burger' data-id='" +
                    burgs[i].id +
                    "'>" + burgs[i].name + " &times;</button></li>";
                eatenElem.append(new_elem);
            }
        }
    });

    $(document).on("click", ".change-eaten", function (event) {
        var id = $(this).data("id");
        var newBurgStat = $(this).data("newburg") === true;

        var newEatenState = {
            eaten: newBurgStat
        };

        $.ajax("/burgers/" + id, {
            type: "PUT",
            data: JSON.stringify(newEatenState),
            dataType: 'json',
            contentType: 'application/json'
        }).then(function () {
            console.log("changed *eaten* to", newBurgStat);

            location.reload();
        });

    });

    $(".create-form").on("submit", function (event) {
        event.preventDefault();

        var newBurg = {
            name: $("#bur").val().trim(),
            eaten: $("[name=eaten]:checked").val()
        };

        $.ajax("/burgers", {
            type: "POST",
            data: JSON.stringify(newBurg),
            dataType: 'json',
            contentType: 'application/json'
        }).then(function () {
            console.log("created new burger");

            location.reload();
        });

        console.log(newBurg)
    });

    $(document).on("click", ".delete-burger", function (event) {
        var id = $(this).data("id");

        $.ajax("/burgers/" + id, {
            type: "DELETE"
        }).then(function () {
            console.log("deleted burger", id);

            location.reload();
        });
    });
});

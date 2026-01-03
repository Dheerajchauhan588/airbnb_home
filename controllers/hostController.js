const Home = require("../models/home");

exports.getAddHome = (req, res) => {
    res.render("host/edit-home", {
        pageTitle: "Add Home",
        currentPage: "addHome",
        editing: false,
    });
};

exports.getEditHome = (req, res) => {
    const homeId = req.params.homeId;
    const editing = req.query.editing === "true";

    Home.findById(homeId).then(([homes]) => {
        if (!homes.length) {
            return res.redirect("/host/host-home-list");
        }

        res.render("host/edit-home", {
            home: homes[0],
            pageTitle: "Edit Home",
            currentPage: "host-homes",
            editing: editing,
        });
    });
};

exports.getHostHomes = (req, res) => {
    Home.fetchAll().then(([registeredHomes]) => {
        res.render("host/host-home-list", {
            registeredHomes,
            pageTitle: "Host Homes",
            currentPage: "host-homes",
        });
    });
};

exports.postAddHome = (req, res) => {
    const { houseName, price, location, rating, photoUrl, description } =
    req.body;

    const home = new Home(
        houseName,
        Number(price),
        location,
        Number(rating),
        photoUrl,
        description
    );

    home.save().then(() => {
        res.redirect("/host/host-home-list");
    });
};

exports.postEditHome = (req, res) => {
    const { homeId, houseName, price, location, rating, photoUrl, description } =
    req.body;

    console.log("EDIT ID 👉", homeId);

    const home = new Home(
        houseName,
        Number(price),
        location,
        Number(rating),
        photoUrl,
        description,
        homeId
    );

    home.save().then(() => {
        res.redirect("/host/host-home-list");
    });
};

exports.postDeleteHome = (req, res) => {
    const homeId = req.params.homeId;

    Home.deleteById(homeId).then(() => {
        res.redirect("/host/host-home-list");
    });
};
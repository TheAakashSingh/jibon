const express = require("express");
const app = express();
const path = require("path");
const sessionl = require("express-session");
const bodyParser = require("body-parser");
const sgMail = require("@sendgrid/mail");
require('dotenv').config();
app.set('view engine', 'ejs');
const port = process.env.PORT || 3000;
require("./db/conn");

app.use(sessionl({
    secret: "akubhaijihaito",
    resave: false,
    saveUninitialized: true
}));

const Register = require("./models/userRegister");

const static_path = path.join(__dirname, "../views");
app.use(express.static(static_path));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json()); // Parse JSON bodies

app.get("/", (req, res) => {
    res.render(path.join(static_path, "index"));
});

app.get("/index", (req, res) => {
    res.render(path.join(static_path, "index"));
});
app.get("/active_members", (req, res) => {
    res.render(path.join(static_path, "active_members"));
});
app.get("/premium_plans", (req, res) => {
    res.render(path.join(static_path, "premium_plans"));
});
app.get("/contact", (req, res) => {
    res.render(path.join(static_path, "contact"));
});
app.get("/userRegistration", (req, res) => {
    res.render(path.join(static_path, "index"));
});

app.get("/login", (req, res) => {
    res.render(path.join(static_path, "login"));
});

app.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
            return res.status(500).send("An error occurred");
        }
        res.redirect("/login");
    });
});


const session = require("express-session");
app.use(session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
}));

app.post("/userRegister", async (req, res) => {
    try {
        const {
            lookingfor,
            onbehalf,
            ageform,
            ageto,
            profile_name,
            personage,
            religion_id,
            caste_id,
            sub_caste_id,
            mothertounge,
            height,
            location,
            emailaddress,
            password
        } = req.body;

        if (
            !lookingfor ||
            !onbehalf ||
            !ageform ||
            !ageto ||
            !profile_name ||
            !personage ||
            !religion_id ||
            !caste_id ||
            !sub_caste_id ||
            !mothertounge ||
            !height ||
            !location ||
            !emailaddress ||
            !password
        ) {
            return res.status(400).send("Please provide all the required information");
        }

        const existingUser = await Register.findOne({ email: emailaddress });
        if (existingUser) {
            return res.status(400).send("User with the same email already exists");
        }

        // Create a new user object
        const user = new Register({
            LookingFor: lookingfor,
            onBehalf: onbehalf,
            agedFrom: ageform,
            ageTo: ageto,
            profileName: profile_name,
            age: personage,
            religion: religion_id,
            caste: caste_id,
            sCaste: sub_caste_id,
            motherTongue: mothertounge,
            Height: height,
            Location: location,
            email: emailaddress,
            Password: password
        });

        // Save the user object to the database
        await user.save();

        // Send verification email
        // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        // const msg = {
        //     to: emailaddress,
        //     from: 'jibonkesongi@gmail.com',
        //     subject: 'Account Verification',
        //     text: 'Please click on the link to verify your account.'
        // };

        // sgMail.send(msg)
        //     .then(() => {
        //         console.log('Email sent');
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //     });
        req.session.email = emailaddress;
        res.status(201).redirect("/edit_profile")
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});

// Login check
app.post("/login", async (req, res) => {
    try {
        const { emailaddress, password } = req.body;

        const existingUser = await Register.findOne({ email: emailaddress });

        if (!existingUser || existingUser.Password !== password) {
            return res.status(400).send("Invalid email or password");
        }

        // Store the user's email in the session
        req.session.email = existingUser.email;

        res.status(201).redirect("/profile_details");
    } catch (error) {
        res.status(400).send("Invalid email or password");
    }
});
app.get("/edit_profile", async (req, res) => {
    try {
        if (!req.session.email) {
            return res.status(400).send("User not logged in");
        }

        const existingUser = await Register.findOne({ email: req.session.email });

        if (!existingUser) {
            return res.status(400).send("User not found");
        }

        res.render(path.join(static_path, "edit_profile"), { existingUser: existingUser });
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});

app.get("/profile_details", async (req, res) => {
    try {
        if (!req.session.email) {
            return res.status(400).send("User not logged in");
        }

        const existingUser = await Register.findOne({ email: req.session.email });

        if (!existingUser) {
            return res.status(400).send("User not found");
        }

        res.render(path.join(static_path, "profile_details"), { existingUser: existingUser });
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});
// editProfile
app.post("/updateProfile", async (req, res) => {
    try {
        // new Schemas Data
        const {
            introduction,
            firstName,
            lastName,
            gender,
            dob,
            martialStatus,
            children,
            area,
            mobile,
            country,
            state,
            city,
            postalCode,
            country1,
            state1,
            city1,
            postalCode1,
            highestEducation,
            occupation,
            annualIncome,
            height,
            weight,
            eyeColor,
            hairColor,
            complexion,
            bloodgroup,
            bodyType,
            bodyArt,
            anyDisability,
            language,
            speak,
            read,
            affection,
            humor,
            politicalview,
            religiousService,
            birthCountry,
            residencyCountry,
            citizenshipCountry,
            growUpCountry,
            immigrationStatus,
            ethnicity,
            personalValue,
            familyValue,
            communityValue,
            manglik,
            diet,
            drink,
            smoke,
            livingWith,
            sunSign,
            moonSign,
            timeOfBirth,
            cityOfBirth,
            homeDistrict,
            familyResidency,
            fathersOccupation,
            specialCircumstances,
            generalRequirement,
            page,
            pheight,
            pweight,
            pmartialStatus,
            pwithChildrenAcceptables,
            pcountryOfResidence,
            prelegion,
            pcaste,
            psCaste,
            peducation,
            profession,
            pdrinkingHabits,
            psmokingHabits,
            pdiet,
            pbodyType,
            ppersonalValue,
            pmanglik,
            panyDisability,
            pmotherTongue,
            pfamilyValue,
            ppreferedCountry,
            ppreferedState,
            ppreferedStatus,
            pcomplexion
        } = req.body;

        const existingUser = await Register.findOne({ email: req.session.email });

        if (!existingUser) {
            return res.status(400).send("User not found");
        }

        // Update the user's profile with the additional inputs
        existingUser.introduction = introduction;
        existingUser.firstName = firstName;
        existingUser.lastName = lastName;
        existingUser.gender = gender; // Add this line to update gender
        existingUser.dob = dob;
        existingUser.martialStatus = martialStatus;
        existingUser.children = children; // Add this line to update children
        existingUser.area = area;
        existingUser.mobile = mobile;
        existingUser.country = country;
        existingUser.state = state;
        existingUser.city = city;
        existingUser.postalCode = postalCode;
        existingUser.country1 = country1;
        existingUser.state1 = state1;
        existingUser.city1 = city1;
        existingUser.postalCode1 = postalCode1;
        existingUser.highestEducation = highestEducation;
        existingUser.occupation = occupation;
        existingUser.annualIncome = annualIncome;
        existingUser.height = height; // Add this line to update height
        existingUser.weight = weight; // Add this line to update weight
        existingUser.eyeColor = eyeColor;
        existingUser.hairColor = hairColor;
        existingUser.complexion = complexion;
        existingUser.bloodgroup = bloodgroup;
        existingUser.bodyType = bodyType;
        existingUser.bodyArt = bodyArt;
        existingUser.anyDisability = anyDisability;
        existingUser.language = language; // Add this line to update language
        existingUser.speak = speak;
        existingUser.read = read;
        existingUser.affection = affection;
        existingUser.humor = humor;
        existingUser.politicalview = politicalview;
        existingUser.religiousService = religiousService;
        existingUser.birthCountry = birthCountry;
        existingUser.residencyCountry = residencyCountry;
        existingUser.citizenshipCountry = citizenshipCountry;
        existingUser.growUpCountry = growUpCountry;
        existingUser.immigrationStatus = immigrationStatus;
        existingUser.ethnicity = ethnicity; // Add this line to update ethnicity
        existingUser.personalValue = personalValue;
        existingUser.familyValue = familyValue;
        existingUser.communityValue = communityValue;
        existingUser.manglik = manglik;
        existingUser.diet = diet;
        existingUser.drink = drink;
        existingUser.smoke = smoke;
        existingUser.livingWith = livingWith;
        existingUser.sunSign = sunSign;
        existingUser.moonSign = moonSign;
        existingUser.timeOfBirth = timeOfBirth;
        existingUser.cityOfBirth = cityOfBirth;
        existingUser.homeDistrict = homeDistrict;
        existingUser.familyResidency = familyResidency;
        existingUser.fathersOccupation = fathersOccupation;
        existingUser.specialCircumstances = specialCircumstances;
        existingUser.generalRequirement = generalRequirement;
        existingUser.page = page;
        existingUser.pheight = pheight;
        existingUser.pweight = pweight;
        existingUser.pmartialStatus = pmartialStatus;
        existingUser.pwithChildrenAcceptables = pwithChildrenAcceptables;
        existingUser.pcountryOfResidence = pcountryOfResidence;
        existingUser.prelegion = prelegion;
        existingUser.pcaste = pcaste;
        existingUser.psCaste = psCaste;
        existingUser.peducation = peducation;
        existingUser.profession = profession;
        existingUser.pdrinkingHabits = pdrinkingHabits;
        existingUser.psmokingHabits = psmokingHabits;
        existingUser.pdiet = pdiet;
        existingUser.pbodyType = pbodyType;
        existingUser.ppersonalValue = ppersonalValue;
        existingUser.pmanglik = pmanglik;
        existingUser.panyDisability = panyDisability;
        existingUser.pmotherTongue = pmotherTongue;
        existingUser.pfamilyValue = pfamilyValue;
        existingUser.ppreferedCountry = ppreferedCountry;
        existingUser.ppreferedState = ppreferedState;
        existingUser.ppreferedStatus = ppreferedStatus;
        existingUser.pcomplexion = pcomplexion;


        // Save the updated user object
        const updatedUser = await existingUser.save();
        console.log("updated");

        res.render(path.join(static_path, "profile_details"), { existingUser: existingUser });
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

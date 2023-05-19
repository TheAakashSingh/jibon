const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    LookingFor: {
        type: String
        // required: true
    },
    onBehalf: {
        type: String
        // required: true
    },
    agedFrom: {
        type: Number
        // required: true
    },
    agetTo: {
        type: Number
        // required: true
    },
    profileName: {
        type: String
        // required: true
    },
    age: {
        type: String
        // required: true
    },
    religion: {
        type: String
        // required: true
    },
    caste: {
        type: String
        // required: true
    },
    sCaste: {
        type: String
        // required: true
    },
    motherTongue: {
        type: String
        // required: true
    },
    Height: {
        type: Number
        // required: true
    },
    Location: {
        type: String
        // required: true
    },
    email: {
        type: String,
        required: true,
        // unique: true
    },
    Password: {
        type: String,
        required: true,
        // unique: true
    },
    introduction: {
        type: String
    },
    firstName:{
        type: String
    },
    lastName: {
        type: String
    },
    gender: {
        type: String
    },
    dob: {
        type: String
    },
    martialStatus: {
        type: String
    },
    children:{
        type:Number
    },
    area:{
        type:String
    },
    onBehalf: {
        type: String
    },
    mobile: {
        type: Number
    },
    country: {
        type: String
    },
    state: {
        type: String
    },
    city: {
        type: String
    },
    postalCode: {
        type: Number
    },
    country1: {
        type: String
    },
    state1: {
        type: String
    },
    city1:{
        type: String
    },
    postalCode1:{
        type: Number
    },
    highestEducation:{
        type: String
    },
    occupation:{
        type: String
    },
    annualIncome:{
        type: Number
    },
    height: {
        type: Number
    },
    weight:{
        type: Number
    },
    eyeColor: {
        type: String
    },
    hairColor: {
        type: String
    },
    complexion: {
        type: String
    },
    bloodgroup:{
        type: String
    },
    bodyType: {
        type: String
    },
    bodyArt: {
        type: String
    },
    anyDisability: {
        type: String
    },
    language:{
        type: String
    },
    speak:{
        type: String
    },
    read: {
        type: String
    },
    affection:{
        type: String
    },
    humor: {
        type: String
    },
    politicalview:{
        type: String
    },
    religiousService: {
        type: String
    },
    birthCountry: {
        type: String
    },
    residencyCountry: {
        type: String
    },
    citizenshipCountry: {
        type: String
    },
    growUpCountry:{
        type: String
    },
    immigrationStatus: {
        type: String
    },
    ethnicity: {
        type: String
    },
    personalValue: {
        type: String
    },
    familyValue:{
        type: String
    },
    communityValue: {
        type: String
    },
    manglik: {
        type: String
    },
    diet: {
        type: String
    },
    drink: {
        type: String
    },
    smoke: {
        type: String
    },
    livingWith: {
        type: String
    },
    sunSign: {
        type: String
    },
    moonSign: {
        type: String
    },
    timeOfBirth: {
        type: String
    },
    cityOfBirth: {
        type: String
    },
    homeDistrict: {
        type: String
    },
    familyResidency: {
        type: String
    },
    fathersOccupation: {
        type: String
    },
    specialCircumstances: {
        type: String
    },
    generalRequirement: {
        type: String
    },
    page: {
        type: Number
    },
    pheight: {
        type: String
    },
    pweight: {
        type: String
    },
    pmartialStatus: {
        type: String
    },
    specialCircumstances: {
        type: String
    },pwithChildrenAcceptables:{
        type:String
    },
    pcountryOfResidence: {
        type: String
    },
    prelegion: {
        type: String
    },
    pcaste: {
        type: String
    },
    psCaste: {
        type: String
    },
    peducation: {
        type: String
    },
    profession: {
        type: String
    },
    pdrinkingHabits: {
        type: String
    },
    psmokingHabits: {
        type: String
    },
    pdiet: {
        type: String
    },
    pbodyType: {
        type: String
    },
    ppersonalValue: {
        type: String
    },
    pmanglik: {
        type: String
    },
    panyDisability: {
        type: String
    },
    pmotherTongue: {
        type: String
    },
    pfamilyValue: {
        type: String
    },
    ppreferedCountry: {
        type: String
    },
    ppreferedState: {
        type: String
    },
    ppreferedStatus: {
        type: String
    },
    pcomplexion: {
        type: String
    },
});

// create collection
const Register = mongoose.model("Registration", userSchema);

module.exports = Register;

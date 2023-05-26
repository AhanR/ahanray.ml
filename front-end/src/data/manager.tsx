import { firebaseApp } from "../utils/firebase"
import { LocationNames } from "./route-data"
import { collection, getFirestore, getDocs} from 'firebase/firestore'

interface Data {
    [k:string] : Array<ProjectData> | AchievementData | Array<SkillData> | any
}

export interface ProjectData {
    key : string,
    title : string,
    topics : Array<string>,
    description : string,
    priority : number,
    url?: string,
}

export interface AchievementRecord {
    url : string,
    title : string,
}

export enum skillTypes {
    certification = "certification",
    experience = "experience"
}

export interface AchievementData {
    [k : string] : Array<AchievementRecord>,
}

export interface SkillData {
    title : string,
    tags : Array<string>
}

let data : Data = {
    "/projects" : [
    {
        key : "1",
        title : "This is the project title with higher priority",
        topics : ["topic 1", "topic 2"],
        description : "This is the description for the fake project that I have built",
        url : "https://ahan.epizy.com",
        priority : 3
    },
    {
        key : "2",
        title : "This is the project title",
        topics : ["topic 1", "topic 2"],
        description : "This is the description for the fake project that I have built",
        priority : 0
    },
    {
        key : "3",
        title : "This is the new project title",
        topics : ["topic 1", "topic 2", "topic 3"],
        description : "This is the description for the fake project that I have built",
        priority : 2
    },
    ],
    "/achievements":{
        "certification" : [
            {
                url : "https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~2S6TDQN6EV8K/CERTIFICATE_LANDING_PAGE~2S6TDQN6EV8K.jpeg",
                title : "IBM"
            },
            {
                url : "https://google.com",
                title : "Google.com exp"
            },
            {
                url : "https://ahanray.ml",
                title : "Ahan's website"
            },
        ],
        "experience" : [
            {
                url : "https://google.com",
                title : "Google.com exp"
            },
            {
                url : "https://ahanray.ml",
                title : "Ahan's website exp"
            },
        ],
    },
    "/skills" : [
        {
            title : "Read and write english",
            tags : ["language", "english", "speak", "talk"]
        },
        {
            title : "Read and write hindi",
            tags : ["language", "hindi"]
        },
        {
            title : "Read and write bengali",
            tags : ["language", "bengali"]
        },
        {
            title : "Read and write korean",
            tags : ["language", "korean"]
        },
        {
            title : "Code in python",
            tags : ["language", "python", "coding"]
        },
        {
            title : "Solve DSA",
            tags : ["DSA", "python", "coding", "c++", "c", "trees"]
        },

    ]

}

export const links = {
    github : "https://github.com/ahanr",
    linkedin : "https://linkedin.com/in/ahanr",
    mail : "mailto:ahanray@duck.com"
}

// dictionary type data accessing
export const getData = (str : LocationNames) => {
    return data[str];
}

export const fetchDataFromStore = async () => {
    const firestoreRef = getFirestore(firebaseApp);
    
    // make this json more suitable for the final upload for achievements
    const achievementCertificationData = await getDocs(collection(firestoreRef, "MainWebsiteAchievementsData", "Data", "Certifications"));
    const achievementExperiencesnData = await getDocs(collection(firestoreRef, "MainWebsiteAchievementsData", "Data", "Experiences"));
    let achievementData : AchievementData = {
        "certification" : [],
        "experience" : []
    }
    let tempAchievements : Array<AchievementRecord> = [];
    achievementCertificationData.forEach(elm=>tempAchievements.push({url : elm.data()["URL"], title : elm.data()["Title"]}));
    achievementData["certification"] = tempAchievements;
    tempAchievements = [];
    achievementExperiencesnData.forEach(elm=>tempAchievements.push({url : elm.data()["URL"], title : elm.data()["Title"]}));
    achievementData["experience"] = tempAchievements;
    
    // format skills data
    const skillsData = await getDocs(collection(firestoreRef, "MainWebsiteSkillsData"));
    let tempSkills : Array<SkillData>= [];
    skillsData.forEach(elm => tempSkills.push({ title : elm.data()["title"], tags : elm.data()["tags"] }))

    // format projects data
    const projectsData = await getDocs(collection(firestoreRef, "MainWebsiteProjectsData"));
    let tempProjects : Array<ProjectData> = [];
    projectsData.forEach(elm => tempProjects.push({ key : elm.data()["key"], title : elm.data()["title"], topics : elm.data()["topics"], description : elm.data()["description"], priority : elm.data()["priority"] , url: elm.data()["url"] }))

    // add all the data to the dictionary and add more values to the front end
    data[LocationNames.projects] = tempProjects;
    data[LocationNames.achievements] = achievementData;
    data[LocationNames.skills] = tempSkills;

    // test the data
    console.log(data);
}
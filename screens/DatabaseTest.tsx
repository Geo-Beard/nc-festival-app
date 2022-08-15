import { db } from "../firebase-config/firebase-config";
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { useState } from 'react';
export default function Test() {
    const [userDoc, setUserDoc] = useState(null);
    function Create() {
        const myDoc = doc(db,"events", "artists");
        const docData = {
            "1": {
                "name": "Arcade Fire",
                "day": "Friday",
                "time": 1300,
                "stage": "Main",
                "image": "https://images.unsplash.com/photo-1511373051158-11c3e88dde72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              },
              "2": {
                "name": "Secret Night Gang",
                "day": "Friday",
                "time": 1300,
                "stage": "Tent",
                "image": "https://images.unsplash.com/photo-1526478806334-5fd488fcaabc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1832&q=80"
              },
              "3": {
                "name": "Fallen Colossus",
                "day": "Friday",
                "time": 1300,
                "stage": "Local",
                "image": "https://images.unsplash.com/photo-1481886756534-97af88ccb438?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80"
              },
              "4": {
                "name": "Austrian Death Machine",
                "day": "Friday",
                "time": 1400,
                "stage": "Main",
                "image": "https://images.unsplash.com/photo-1605340406960-f5b496c38b3d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              },
              "5": {
                "name": "Queens of the Stoneage",
                "day": "Friday",
                "time": 1400,
                "stage": "Tent",
                "image": "https://images.unsplash.com/photo-1501612780327-45045538702b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              },
              "6": {
                "name": "Galaxians",
                "day": "Friday",
                "time": 1400,
                "stage": "Local",
                "image": "https://images.unsplash.com/photo-1506091403742-e3aa39518db5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              },
              "7": {
                "name": "Gojira",
                "day": "Friday",
                "time": 1500,
                "stage": "Main",
                "image": "https://images.unsplash.com/photo-1580745089089-a9d84551e657?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              },
              "8": {
                "name": "Kokoroko",
                "day": "Friday",
                "time": 1500,
                "stage": "Tent",
                "image": "https://images.unsplash.com/photo-1508979822114-db019a20d576?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              },
              "9": {
                "name": "Delorean Drivers",
                "day": "Friday",
                "time": 1500,
                "stage": "Local",
                "image": "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1776&q=80"
              },
              "10": {
                "name": "Sleaford Mods",
                "day": "Friday",
                "time": 1600,
                "stage": "Main",
                "image": "https://images.unsplash.com/photo-1527261834078-9b37d35a4a32?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              },
              "11": {
                "name": "System of a Down",
                "day": "Friday",
                "time": 1600,
                "stage": "Tent",
                "image": "https://images.unsplash.com/photo-1503528108408-87b0d1c2b785?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1330&q=80"
              },
              "12": {
                "name": "Sloth Hammer",
                "day": "Friday",
                "time": 1600,
                "stage": "Local",
                "image": "https://images.unsplash.com/photo-1474692295473-66ba4d54e0d3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1684&q=80"
              },
              "13": {
                "name": "Harry Styles",
                "day": "Friday",
                "time": 1700,
                "stage": "Main",
                "image": "https://images.unsplash.com/photo-1553819282-f334e59ec713?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              },
              "14": {
                "name": "Glass Animals",
                "day": "Friday",
                "time": 1700,
                "stage": "Tent",
                "image": "https://images.unsplash.com/photo-1601266289415-e7339a97d19b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              },
              "15": {
                "name": "Paper Tiger",
                "day": "Friday",
                "time": 1700,
                "stage": "Local",
                "image": "https://images.unsplash.com/photo-1619378881076-3d2f5f254aa5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              },
              "16": {
                "name": "The Horrors",
                "day": "Friday",
                "time": 1800,
                "stage": "Main",
                "image": "https://images.unsplash.com/photo-1499424017184-418f6808abf9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              },
              "17": {
                "name": "Mac DeMarco",
                "day": "Friday",
                "time": 1800,
                "stage": "Tent",
                "image": "https://images.unsplash.com/photo-1483393458019-411bc6bd104e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80"
              },
              "18": {
                "name": "Duels",
                "day": "Friday",
                "time": 1800,
                "stage": "Local",
                "image": "https://images.unsplash.com/photo-1549834125-80f9dda633c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              },
              "19": {
                "name": "In Flames",
                "day": "Friday",
                "time": 1900,
                "stage": "Main",
                "image": "https://images.unsplash.com/photo-1461784121038-f088ca1e7714?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              },
              "20": {
                "name": "Modest Mouse",
                "day": "Friday",
                "time": 1900,
                "stage": "Tent",
                "image": "https://images.unsplash.com/photo-1520170975578-25bd5217bf3d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              },
              "21": {
                "name": "Dark Horse",
                "day": "Friday",
                "time": 1900,
                "stage": "Local",
                "image": "https://images.unsplash.com/photo-1525025500848-f00b7d362dec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              },
              "22": {
                "name": "Opeth",
                "day": "Friday",
                "time": 2000,
                "stage": "Main",
                "image": "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              },
              "23": {
                "name": "The Ocean",
                "day": "Friday",
                "time": 2000,
                "stage": "Tent",
                "image": "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              },
              "24": {
                "name": "Sam Fender",
                "day": "Friday",
                "time": 2000,
                "stage": "Local",
                "image": "https://images.unsplash.com/photo-1550096975-ea2d3d2468f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              },
              "25": {
                "name": "Metallica",
                "day": "Friday",
                "time": 2100,
                "stage": "Main",
                "image": "https://images.unsplash.com/photo-1566981731417-d4c8e17a9e82?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              },
              "26": {
                "name": "Bonobo",
                "day": "Friday",
                "time": 2100,
                "stage": "Tent",
                "image": "https://images.unsplash.com/photo-1493078770291-aa3109c60ef2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2153&q=80"
              },
              "27": {
                "name": "Calls Landing",
                "day": "Friday",
                "time": 2100,
                "stage": "Local",
                "image": "https://images.unsplash.com/photo-1544013204-eedd0bd6df1d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1772&q=80"
              },
              "28": {
                "name": "Dethklok",
                "day": "Friday",
                "time": 2200,
                "stage": "Main",
                "image": "https://images.unsplash.com/photo-1517248134117-fdfbd794250d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80"
              },
              "29": {
                "name": "The Mars Volta",
                "day": "Friday",
                "time": 2200,
                "stage": "Tent",
                "image": "https://images.unsplash.com/photo-1416273567255-8abe875affcd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80"
              },
              "30": {
                "name": "Gentleman's Dub Club",
                "day": "Friday",
                "time": 2200,
                "stage": "Local",
                "image": "https://images.unsplash.com/photo-1509143382-48811e579888?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1638&q=80"
              },
              "31": {
                "name": "Jaded Eyes",
                "day": "Saturday",
                "time": 1300,
                "stage": "Main",
                "image": "https://images.unsplash.com/photo-1506091403742-e3aa39518db5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              },
              "32": {
                "name": "",
                "day": "Saturday",
                "time": 1400,
                "stage": "Main",
                "image": "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              },
              "33": {
                "name": "Tiny Planets",
                "day": "Saturday",
                "time": 1500,
                "stage": "Main",
                "image": "https://images.unsplash.com/photo-1506157786151-b8491531f063?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              },
              "34": {
                "name": "Last Call",
                "day": "Saturday",
                "time": 1600,
                "stage": "Main",
                "image": "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              },
              "35": {
                "name": "Lost Meridian",
                "day": "Saturday",
                "time": 1700,
                "stage": "Main",
                "image": "https://images.unsplash.com/photo-1454908027598-28c44b1716c1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              },
              "36": {
                "name": "Four Quarters",
                "day": "Saturday",
                "time": 1800,
                "stage": "Main",
                "image": "https://images.unsplash.com/photo-1521547418549-6a31aad7c177?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              },
              "37": {
                "name": "The Dirty Faces",
                "day": "Saturday",
                "time": 1900,
                "stage": "Main",
                "image": "https://images.unsplash.com/photo-1472653816316-3ad6f10a6592?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80"
              },
              "38": {
                "name": "Super Luxury",
                "day": "Saturday",
                "time": 2000,
                "stage": "Main",
                "image": "https://images.unsplash.com/photo-1582711012124-a56cf82307a0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1840&q=80"
              },
              "39": {
                "name": "Plastic Rabbits",
                "day": "Saturday",
                "time": 2100,
                "stage": "Main",
                "image": "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              },
              "40": {
                "name": "Wolf Alice",
                "day": "Saturday",
                "time": 2200,
                "stage": "Main",
                "image": "https://images.unsplash.com/photo-1573055418049-c8e0b7e3403b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              },
              "41": {
                "name": "Fontaines D.C.",
                "day": "Saturday",
                "time": 1300,
                "stage": "Tent",
                "image": "https://images.unsplash.com/photo-1547525372-7acfcbcd8acc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              },
              "42": {
                "name": "Bad Boy Chiller Crew",
                "day": "Saturday",
                "time": 1400,
                "stage": "Tent",
                "image": "https://images.unsplash.com/photo-1619229667009-e7e51684e8e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              },
              "43": {
                "name": "Tame Impala",
                "day": "Saturday",
                "time": 1500,
                "stage": "Tent",
                "image": "https://images.unsplash.com/photo-1603228254119-e6a4d095dc59?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
              },
              "44": {
                "name": "The Mouse Outfit",
                "day": "Saturday",
                "time": 1600,
                "stage": "Tent",
                "image": "https://images.unsplash.com/photo-1595239094789-4e00e532528a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              },
              "45": {
                "name": "Lost Meridian",
                "day": "Saturday",
                "time": 1700,
                "stage": "Tent",
                "image": "https://images.unsplash.com/photo-1454908027598-28c44b1716c1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              },
              "46": {
                "name": "Khruangbin",
                "day": "Saturday",
                "time": 1800,
                "stage": "Tent",
                "image": "https://images.unsplash.com/photo-1534327737286-52d27a912124?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
              },
              "47": {
                "name": "Too Many Zooz",
                "day": "Saturday",
                "time": 1900,
                "stage": "Tent",
                "image": "https://images.unsplash.com/photo-1473396413399-6717ef7c4093?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              },
              "48": {
                "name": "Foals",
                "day": "Saturday",
                "time": 2000,
                "stage": "Tent",
                "image": "https://images.unsplash.com/photo-1582711012124-a56cf82307a0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1840&q=80"
              },
              "49": {
                "name": "The Libertines",
                "day": "Saturday",
                "time": 2100,
                "stage": "Tent",
                "image": "https://images.unsplash.com/photo-1515175192010-cf3250992719?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80"
              },
              "50": {
                "name": "Arctic Monkeys",
                "day": "Saturday",
                "time": 2200,
                "stage": "Tent",
                "image": "https://images.unsplash.com/photo-1578021127722-1f1ff95b429e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              },
              "51": {
                "name": "Idles",
                "day": "Saturday",
                "time": 1300,
                "stage": "Local",
                "image": "https://images.unsplash.com/photo-1520242739010-44e95bde329e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              },
              "52": {
                "name": "Hak Baker",
                "day": "Saturday",
                "time": 1400,
                "stage": "Local",
                "image": "https://images.unsplash.com/photo-1585279222876-17a681486ded?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1931&q=80"
              },
              "53": {
                "name": "Lianne La Havas",
                "day": "Saturday",
                "time": 1500,
                "stage": "Local",
                "image": "https://images.unsplash.com/photo-1566150951155-4a59643d8a9f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              },
              "54": {
                "name": "Skunk Anansie",
                "day": "Saturday",
                "time": 1600,
                "stage": "Local",
                "image": "https://images.unsplash.com/photo-1575672913784-11a7cd4f25f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80"
              },
              "55": {
                "name": "Metronomy",
                "day": "Saturday",
                "time": 1700,
                "stage": "Local",
                "image": "https://images.unsplash.com/photo-1598214015728-bc73871186d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1476&q=80"
              },
              "56": {
                "name": "Haim",
                "day": "Saturday",
                "time": 1800,
                "stage": "Local",
                "image": "https://images.unsplash.com/photo-1542813884-edb2d564ca91?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              },
              "57": {
                "name": "Hobbies",
                "day": "Saturday",
                "time": 1900,
                "stage": "Local",
                "image": "https://images.unsplash.com/photo-1553695750-ad0b596c4f80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1914&q=80"
              },
              "58": {
                "name": "Trizzy 5star",
                "day": "Saturday",
                "time": 2000,
                "stage": "Local",
                "image": "https://images.unsplash.com/photo-1508973379184-7517410fb0bc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              },
              "59": {
                "name": "Pigeon Detectives",
                "day": "Saturday",
                "time": 2100,
                "stage": "Local",
                "image": "https://images.unsplash.com/photo-1614584120612-a7c9c244aacb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              },
              "60": {
                "name": "Kaiser Chiefs",
                "day": "Saturday",
                "time": 2200,
                "stage": "Local",
                "image": "https://images.unsplash.com/photo-1526478806334-5fd488fcaabc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1516&q=80"
              }
        };
        setDoc(myDoc,docData)
            .then(() => {
                Alert.alert("Document created!");
            })
            .catch(() => {
                Alert.alert("Something went wrong!");
            })
    }
    function Read() {
        const myDoc = doc(db,"timetableCol","timetablesDoc");
        getDoc(myDoc)
            .then((snapshot) => {
                if(snapshot) {
                    setUserDoc(snapshot.data());
                }
            })
    }
    function Update() {
    }
    function Delete() {
    }
    return (
        <View style={styles.container}>
            <Button title="Create New Doc" onPress={Create}></Button>
            <Button title="Read Doc" onPress={Read}></Button>
            {
                userDoc !== null &&
                    <Text>Stage1 Friday @ 1300: {userDoc["roundhay-festival"]["friday"]["stage-1"]["times"][1300]}</Text>
            }
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });









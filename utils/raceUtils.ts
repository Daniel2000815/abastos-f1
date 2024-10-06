import { Timestamp } from "firebase/firestore";
import { isNumber } from "util";
import { isNumberObject } from "util/types";

export function secondsToTimeString(seconds: number) {
    var minutes = Math.floor(seconds/60);
    seconds = seconds%60;
    var miliseconds = (seconds%1).toFixed(3).slice(2);

    return `${minutes}:${Math.floor(seconds/1)}:${miliseconds}`
}

export function timeStringToSeconds(timeString: string) {
    var splited = timeString.split(":")
    if(splited.length != 3)
        throw new Error(`Time string ${timeString} is not in valid format`);

    var splitedNum = splited.map((str,idx) => idx != 2 ? parseInt(str) : parseFloat("0." + str));

    return splitedNum[0] * 60 + splitedNum[1] + splitedNum[2]

}

export function isInt(value: number) {
    if (isNaN(value)) {
      return false;
    }
    return (value | 0) === value;
  }
  
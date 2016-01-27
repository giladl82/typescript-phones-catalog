module phonesCat.models {

    //#region interfaces
    export interface IAndroid {
        os: string;
        ui: string;
    }

    export interface IBattery {
        standbyTime: string;
        talkTime: string;
        type: string;
    }

    export interface ICamera {
        features: string[];
        primary: string;
    }

    export interface IConnectivity {
        bluetooth: string;
        cell: string;
        gps: boolean;
        infrared: string;
        wifi: string;
    }

    export interface IDisplay {
        screenResolution: string;
        screenSize: string;
        touchScreen: boolean;
    }

    export interface IHardware {
        accelerometer: boolean;
        audioJack: string;
        cpu: string;
        fmRadio: boolean;
        physicalKeyboard: boolean;
        usb: boolean;
    }

    export interface ISizeAndWeight {
        dimensions: string[];
        weight: string;
    }

    export interface IStorage {
        flash: string;
        ram: string;
    }

    export interface IPhone {
        age: number;
        id: string;
        imageUrl: string;
        name: string;
        snippet: string;
        checkedForCompare: boolean;
    }

    export interface IPhoneDetails extends IPhone {
        additionalFeatures: string;
        android: IAndroid;
        availability: string[];
        battery: IBattery;
        camera: ICamera;
        connectivity: IConnectivity;
        description: string;
        display: IDisplay;
        hardware: IHardware;
        images: string[];
        sizeAndWeight: ISizeAndWeight;
        storage: IStorage;
    }
    //#endregion

    export class Android implements IAndroid {
        constructor(
            public os: string,
            public ui: string) { }
    }

    export class Battery implements IBattery {
        constructor(
            public standbyTime: string,
            public talkTime: string,
            public type: string) { }
    }

    export class Camera implements ICamera {
        constructor(
            public features: string[],
            public primary: string) { }
    }

    export class Connectivity implements IConnectivity {
        constructor(
            public bluetooth: string,
            public cell: string,
            public gps: boolean,
            public infrared: string,
            public wifi: string) { }
    }

    export class Display implements IDisplay {
        constructor(
            public screenResolution: string,
            public screenSize: string,
            public touchScreen: boolean) { }
    }

    export class Hardware implements IHardware {
        constructor(
            public accelerometer: boolean,
            public audioJack: string,
            public cpu: string,
            public fmRadio: boolean,
            public physicalKeyboard: boolean,
            public usb: boolean) { }
    }

    export class SizeAndWeight implements ISizeAndWeight {
        constructor(
            public dimensions: string[],
            public weight: string) { }
    }

    export class Storage implements IStorage {
        constructor(
            public flash: string,
            public ram: string) { }
    }

    export class Phone implements IPhone {
        constructor(public age: number,
            public id: string,
            public imageUrl: string,
            public name: string,
            public snippet: string,
            public checkedForCompare: boolean) { }
    }

    export class PhoneDetails extends Phone implements IPhoneDetails {

        constructor(public age: number,
            public id: string,
            public imageUrl: string,
            public name: string,
            public snippet: string,
            public additionalFeatures: string,
            public android: IAndroid,
            public availability: string[],
            public battery: IBattery,
            public camera: ICamera,
            public connectivity: IConnectivity,
            public description: string,
            public display: IDisplay,
            public hardware: IHardware,
            public images: string[],
            public sizeAndWeight: ISizeAndWeight,
            public storage: IStorage,
            public checkedForCompare: boolean) {

            super(age, id, imageUrl, name, snippet, checkedForCompare);
        }
    }
} 
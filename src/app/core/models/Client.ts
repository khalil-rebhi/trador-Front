export class Client{
    IdClient:number;
    userApplicationId:string;
    name:string;
    familyName:string;
    phoneNumber:string;
    cin:number;
    password:string;
    email:string;
    birthDate:Date;
    isVerified:boolean = false;
    isPremium:boolean = false;
    dateStartPremium:Date;
    createdAt:Date;
    lastModifiedAt:Date;
    address:string;
    role : string = "USER";
    type ?: string;
    twitter:string;
    instagram:string;
    youtube:string;
    facebook:string;
    BIO:string;
    photo:string;
}
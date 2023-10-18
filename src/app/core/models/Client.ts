export class Client{
    idUser:number;
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
    lastDateChangePassword:Date;
    address:string;
    role : string = "USER";
    type ?: string;
    twitter:string;
    instagram:string;
    youtube:string;
    facebook:string;
    bio:string;
    photo:string;
    enabled?:boolean;
    accountNonLocked?:boolean;
    authorities?: any;
    username?:string;
    accountNonExpired?:boolean;
    credentialsNonExpired?:boolean;

    static fromObject(obj : Client){
        const {enabled, accountNonExpired, accountNonLocked, authorities,credentialsNonExpired,username,...myUser} = obj
        return myUser;
    }
}
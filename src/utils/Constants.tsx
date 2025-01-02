
//colors
export enum Colors {
    // primary = '#0087FF',
    primary = '#24a810',
    lightGreen = '#E6FFF3',
    darkGreen = '#1AC96F',
    background = '#EAF4FB',
    spam = '#FC4236',
    white = '#fff',
    text = '#000',
    lightText = '#C5C5C7',
    border = '#F5F6F8'
}

//format Phone
export const formatPhoneNumber = (phoneNumber: string): string => {
    if (phoneNumber?.length === 10) {
        return `${phoneNumber?.slice(0, 5)} ${phoneNumber?.slice(5)}`;
    }
    return phoneNumber;
};

//Navigation Routes
export enum Routes {
    DASH = 'Dashboard',
    AUTH = 'Auth',
    SPALASH = 'Splash',
    CALLER = 'Caller',
    REGISTER = 'Register',
    SEARCH = 'Search',
}

//Storage Variables
export enum MMKVStorage {
    ACCESS_TOKEN = 'accessToken',
    REFRESH_TOKEN = 'refreshToken',
    USER = 'user'
}

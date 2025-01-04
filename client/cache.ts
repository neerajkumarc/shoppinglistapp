import { TokenCache } from "@clerk/clerk-expo/dist/cache/types";
import * as  SecureStore  from "expo-secure-store";
import { Platform } from "react-native";

const createTokenCache = ():TokenCache => {
return {
    getToken: async (key:string) => {
        try {
            const item = await SecureStore.getItemAsync(key);
            if(item) {
                console.log("used this", item);
            }else{
                console.log("no token was used");
            }
            return item;
        } catch (error) {
            console.log("error", error);
        }
    },
   saveToken: async (key:string, token:string) => {
        try {
            await SecureStore.setItemAsync(key, token);
        } catch (error) {
            console.log("error", error);
        }
    }
}
}

export const tokenCache = Platform.OS === 'web' ? undefined : createTokenCache();
import { CorsOptions } from "cors";
import { envs } from "./envs";

export const corsConfig: CorsOptions = {
    origin: function(origin, callback) {
        const whiteList = [envs.FRONTEND_URL];
        if( whiteList.includes(origin!) ) {
            callback( null, true );
        } else {
            callback( new Error('CORS Error'), false );
        }
    }
}
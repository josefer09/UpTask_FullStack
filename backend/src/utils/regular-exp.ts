export const regularExps = {
    // email
    email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
    // Discord username (e.g., "username#1234")
    discord: /^.{3,32}#[0-9]{4}$/,
    // MongoDb Object Id
    mongoId: /^[a-f\d]{24}$/i,
}
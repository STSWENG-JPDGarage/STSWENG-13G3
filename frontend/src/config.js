let DOMAIN;

const temp = "preview"

if (temp === 'production') {
    DOMAIN = "stsweng-13-backend.vercel.app";  // Production domain
} else if (temp === 'preview') {
    DOMAIN = "stsweng-13-backend.vercel.app";  // Development domain
} else {
    DOMAIN = "http://localhost:4000";  // Local testing domain
}

export { DOMAIN };
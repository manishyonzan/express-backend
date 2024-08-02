let rateLimits = {};
const MAX_REQUESTS = 5;
const WINDOW_MS = 15 * 60 * 1000;

const resetRateLimits = () => {
    rateLimits = {};
    console.log('running')
}

const rateLimiter = (req, res, next) => {
    const ip = req.ip;
    const now = Date.now();

    console.log(rateLimits, "the rate limits", ip);

    if (!rateLimits[ip]) {
        rateLimits[ip] = { requests: 1, startTime: now };
        return next();
    }

    const deltaTime = now - rateLimits[ip].startTime;

    if (deltaTime < WINDOW_MS) {
        rateLimits[ip].requests++;
        if (rateLimits[ip].requests > MAX_REQUESTS) {
            return res.status(429).json({
                message: "Too Many Requests.Please try again after some times"
            })
        }
        return next();
    }

    // Reset rate limit for IP after window passes
    rateLimits[ip] = { requests: 1, startTime: now };
    next();
}

module.exports = {
    rateLimiter,
    resetRateLimits,
};
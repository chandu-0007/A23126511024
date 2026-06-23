const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJrYWRhcmljaGFuZHJhc2VraGFybmFpZHUuMjMuaXRAYW5pdHMuZWR1LmluIiwiZXhwIjoxNzgyMTk3MTQyLCJpYXQiOjE3ODIxOTYyNDIsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiJlYTU1ZWMyNy0zMDMzLTQzMTUtYmNhZi1jZmE3ODRhODljN2QiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJrYWRhcmkgY2hhbmRyYSBzZWtoYXIgbmFpZHUiLCJzdWIiOiI0OTY2MGEzMi1iNmNmLTQzMTAtYmU1MS02Yjg1NzAwYjU2YzkifSwiZW1haWwiOiJrYWRhcmljaGFuZHJhc2VraGFybmFpZHUuMjMuaXRAYW5pdHMuZWR1LmluIiwibmFtZSI6ImthZGFyaSBjaGFuZHJhIHNla2hhciBuYWlkdSIsInJvbGxObyI6ImEyMzEyNjUxMTAyNCIsImFjY2Vzc0NvZGUiOiJNVHF4YXIiLCJjbGllbnRJRCI6IjQ5NjYwYTMyLWI2Y2YtNDMxMC1iZTUxLTZiODU3MDBiNTZjOSIsImNsaWVudFNlY3JldCI6ImNBVUhUamZKRlpqaGVrVHgifQ.GPJ18TnsRGmwg9SpMNiT2jnS-ydLr7XkCy1xfH_MIgI";
export async function Log(stack, level, pkg, message) {
    try {
        await fetch("http://4.224.186.213/evaluation-service/logs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${TOKEN}`,
            },
            body: JSON.stringify({
                stack,
                level,
                package: pkg,
                message,
            }),
        });
    }
    catch (err) {
    }
}
export function requestLogger(req, res, next) {
    console.log("middleware is called");
    Log("backend", "info", "middleware", `${req.method} ${req.url} - ${req.ip}`);
    console.log("loggin middlewware is woring ");
    next();
}
//# sourceMappingURL=logger.js.map
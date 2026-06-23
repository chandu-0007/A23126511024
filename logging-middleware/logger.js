

TOKEN ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJrYWRhcmljaGFuZHJhc2VraGFybmFpZHUuMjMuaXRAYW5pdHMuZWR1LmluIiwiZXhwIjoxNzgyMTkyOTYwLCJpYXQiOjE3ODIxOTIwNjAsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiI5YmYyY2Y2Yi03YmRjLTQ2ZDctYTc1Ny01NmNkZjY3ODc4NGIiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJrYWRhcmkgY2hhbmRyYSBzZWtoYXIgbmFpZHUiLCJzdWIiOiI0OTY2MGEzMi1iNmNmLTQzMTAtYmU1MS02Yjg1NzAwYjU2YzkifSwiZW1haWwiOiJrYWRhcmljaGFuZHJhc2VraGFybmFpZHUuMjMuaXRAYW5pdHMuZWR1LmluIiwibmFtZSI6ImthZGFyaSBjaGFuZHJhIHNla2hhciBuYWlkdSIsInJvbGxObyI6ImEyMzEyNjUxMTAyNCIsImFjY2Vzc0NvZGUiOiJNVHF4YXIiLCJjbGllbnRJRCI6IjQ5NjYwYTMyLWI2Y2YtNDMxMC1iZTUxLTZiODU3MDBiNTZjOSIsImNsaWVudFNlY3JldCI6ImNBVUhUamZKRlpqaGVrVHgifQ.jLWwu0AMM1BV6iEhByXJKkmC6xvvjxQOpT0iWQ1Gnds"

async function Log(stack, level, package_, message) {
  try {
    await fetch("http://4.224.186.213/evaluation-service/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${TOKEN}`
      },
      body: JSON.stringify({ stack, level, package: package_, message })
    });
  } catch (err) {

  }
}

module.exports = { Log };
import dns from "dns";

dns.resolve("vk.com", (err, data) => {
  if (err) {
    if (err.code === "ECONNREFUSED") {
      console.log("No internet connection");
    } else {
      console.log("web is DEAD");
    }
  }
  console.log({ data });
});

dns.lookupService("192.30.253.113", 443, (err, host, service) => {
  if (err) throw err;
  console.log({ host, service });
});

const servers = dns.getServers();
console.log({ servers });

const options = {
  all: true,
  family: 4,
  hints: dns.ADDRCONFIG | dns.V4MAPPED
};

dns.lookup("github.com", options, (err, addresses) => {
  if (err) throw err;
  console.dir({ addresses });
});

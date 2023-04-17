const express = require("express");
const dns = require("dns");

const app = express();

// Preventing DNS Rebinding Attacks: DNS rebinding attacks can occur when an attacker gains control of a victim's DNS server and changes the IP address of a domain. This can allow the attacker to bypass same-origin policy restrictions and access resources on the victim's network. To prevent these attacks, you can use the DNS module to ensure that a request is coming from an approved IP address. Here's an example:
// javascript

// Middleware to resolve IP address
app.use((req, res, next) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  dns.reverse(ip, (err, hostnames) => {
    if (err) {
      console.error(`Error resolving IP address ${ip}: ${err}`);
      next();
    } else {
      req.hostname = hostnames[0];
      next();
    }
  });
});

app.use((req, res, next) => {
  const allowedIps = ["127.0.0.1", "::1", "192.168.1.1"];
  const remoteIp = req.connection.remoteAddress;

  dns.lookup(remoteIp, (err, address, family) => {
    if (err) {
      next(err);
    } else if (allowedIps.includes(address)) {
      next();
    } else {
      res.sendStatus(403);
    }
  });
});

app.get("/", (req, res) => {
  res.send(`Hello, ${req.hostname}!`);
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

/*
Yes, ::1 is the IPv6 loopback address for localhost. It is equivalent to the IPv4 address 127.0.0.1.

If a third-party API connects to your API from localhost, their requests will also have ::1 as the remote IP address. This means that they will be subject to the same access control rules as requests originating from your own machine.

If you want to allow requests from third-party APIs that connect from localhost, you could add the IPv4 address 127.0.0.1 to the allowedIps array in the access control middleware. This will allow requests from both IPv4 and IPv6 loopback addresses.

However, keep in mind that allowing requests from localhost or loopback addresses can potentially open up your API to security vulnerabilities, such as DNS rebinding attacks or Cross-Site Request Forgery (CSRF) attacks. It's important to carefully consider the security implications of allowing or disallowing requests from these addresses based on your specific use case. */

# Running the server

1. Set the port for the server in the environmental variable named `PORT` (default port is 8086)
2. Run the server with `npm start`

Example:

```bash
PORT=7813 npm start
```

# Running the tests

1. Start the server following the above instructions
2. Set the port for the server in an environmental variable and run `./runtests.sh` (default port is 8086)

example

```bash
PORT=7813 ./runtests.sh
```

# Run with Docker

Build:

```bash
docker build -t project1_server .
```

Run:

```bash
docker run -it -p 8086:8086 project1_server
```

Description:
=========================
Art-Box is an ecosystem for creating virtual art exhibitions. It allows you to view countless paintings in a confined space.

Art-Box consists of a server, a client application and a database. One or several exposures can be stored in the database and it is convenient to change them on the server side, without the need to update the client application.

The server can:
=========================
+ Establish a TCP connection with several clients, keep track of connections, process requests to establish / terminate a connection.
+ Accept requests for receiving data, process them and send the information received from the database back to the client.

Database:
=========================
+ Stores basic information about paintings.
+ Supports the ability to download data in .csv format converted to a form understandable by Unreal Engine 4.
+ You can quickly make changes to the database or supplement it, the user will not notice anything.

Tools used (Server):
=========================
+ Node.js
+ TypeScript

Tools used (Database):
=========================
+ MySQL

In the future it is planned: 
=========================
+ Web tool for working with a database.

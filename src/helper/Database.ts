import { connect, connection, disconnect } from "mongoose";

export default class Database {
  public static open(mongoUri: string) {
    return new Promise((resolve, reject) => {
      // Mongoose options
      const options = {
        autoIndex: true, // Build indexes
        // bufferMaxEntries: 0,
        // poolSize: 10, // Maintain up to 10 socket connections
        useNewUrlParser: true,
        useUnifiedTopology: true,
      };
      // connect to mongo db
      connect(mongoUri, options, (err: any) => {
        if (err) {
          return reject(err);
        }
        resolve(Promise);
      });
      connection.on("error", (e) => {
        console.log(e);
        throw new Error(`unable to connect to database: ${mongoUri}`);
      });
    });
  }

  public static close() {
    disconnect();
  }
}

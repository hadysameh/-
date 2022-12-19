import bcrypt from "bcrypt";

async function getHashed(textToHash: string) {
  return new Promise((resolve: any, reject: any) => {
    let saltRounds = 10;
    bcrypt.hash(textToHash, saltRounds, function (err, hash) {
      // Store hash in your password DB.
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
}

async function compareHashed(
  textToCompare: string,
  hashedText: string
): Promise<boolean> {
  // console.log({
  //   textToCompare,
  //   hashedText
  // })
  return new Promise((resolve: any, reject: any) => {
    bcrypt.compare(textToCompare, hashedText).then(function (result) {
      // result == false
      resolve(result);
    });
  });
}
export { getHashed, compareHashed };

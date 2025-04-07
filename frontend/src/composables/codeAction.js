export default async function codeAction() {

  // log a message indicating the challenge is loading
  console.log("Loading coding challenge...");

  // wait 1 second simulate loading delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // log a message indicating the challenge is ready
  console.log("Code challenge ready!");
}

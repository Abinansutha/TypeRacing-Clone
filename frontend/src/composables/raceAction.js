export default async function raceAction() {

  // log a message indicating race is starting
  console.log("Starting race...");

  // wait 1.5 seconds to simulate a countdown
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // log a message indicating the race has started
  console.log("Race started!");
}

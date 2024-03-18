import { Canister, query, text, update, Void } from "azle";

// This is a global variable that is stored on the heap
let name = "";

export default Canister({
  // Query calls complete quickly because they do not go through consensus
  getMessage: query([], text, () => {
    return "Hello, " + name;
  }),
  // Update calls take a few seconds to complete
  // This is because they persist state changes and go through consensus
  setMessage: update([text], text, (newName) => {
    name = newName;
    return "Name set to " + newName;
    // This change will be persisted
  }),
});

import { Canister, query, text, update, Void } from "azle";

let message = "";

export default Canister({
  // Query calls complete quickly because they do not go through consensus
  getMessage: query([], text, () => {
    return message;
  }),
  // Update calls take a few seconds to complete
  // This is because they persist state changes and go through consensus
  setMessage: update([text], Void, (newMessage) => {
    message = newMessage; // This change will be persisted
  }),
});

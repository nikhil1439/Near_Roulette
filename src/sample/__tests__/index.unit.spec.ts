import {
  CreateGame,
  JoinGame,
  endGame
} from "../assembly";
import {PersistentDeque, VMContext, VM, u128 } from "near-sdk-as";

const contract = "nikhil1439.testnet";

let messages: PersistentDeque<string>;

describe("Game Contract Testing", () => {
  

  it("should  create a game", () => {
    VMContext.setAttached_deposit(u128.from('50000000000000000000000'));
    VMContext.setCurrent_account_id(contract)
    expect(CreateGame).toBeTruthy();
  });

  it("should Jjoin a Game", () => {
    VMContext.setAttached_deposit(u128.from('50000000000000000000000'));
    VMContext.setCurrent_account_id("nikhil1969.testnet");
    expect(JoinGame).toBeTruthy();
  });

  
});

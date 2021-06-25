import { context, u128, RNG, PersistentMap, ContractPromiseBatch } from "near-sdk-as";

enum GameState{
  Created,
  Joined,
  Ended
}
@nearBindgen
export class Roulette{
  gameId:u32;
  player:string;
  guess:boolean;
  initialAmount: u128;
  betAmount:u128;
  winner:string;
  gameState: GameState

  constructor(){

    const rng= new RNG<u32>(1,u32.MAX_VALUE);
    const roll = rng.next()
    this.gameId = roll;
    this.player="None";
    this.betAmount=u128.Zero;
    this.guess=false;
    this.initialAmount=context.attachedDeposit;
    this.gameState=GameState.Created;
    this.winner= context.sender;
  }
}
const gameMap= new PersistentMap<u32, Roulette>("gr");

export function CreateGame() : u32{
  const roulette = new Roulette();
  //games.push(roulette);
  gameMap.set(roulette.gameId,roulette);
  return  roulette.gameId;
}

export function JoinGame(_gameId:u32,_guess:boolean) : boolean{

  if(context.attachedDeposit == u128.Zero){
    return false;
  }
  const game = gameMap.getSome(_gameId);
  game.player= context.sender;
  game.guess= _guess;
  game.gameState= GameState.Joined;
  game.betAmount = context.attachedDeposit;
  gameMap.set(_gameId, game);
  return true;
}

export function endGame(_gameId:u32) : string{
  const game = gameMap.getSome(_gameId);
  const rng = new RNG<u32>(1,36);
  const Winning_num = rng.next();

  if(Winning_num%2 == 1){

    if(game.guess== false){
      game.winner = game.player;
    }

  }
  else{
    if(game.guess == true){
      game.winner = game.player;
    }
  }
  game.gameState= GameState.Ended;
  gameMap.set(_gameId,game);

  const to_benificiary = ContractPromiseBatch.create(game.winner);
  to_benificiary.transfer(u128.add(game.betAmount,game.initialAmount));
  return game.winner;

}

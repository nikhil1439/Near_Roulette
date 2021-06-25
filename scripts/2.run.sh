#!/usr/bin/env bash
set -e

echo
echo \$CONTRACT is $CONTRACT
echo \$OWNER is $OWNER
echo

# so this is the solution, to replace "view" with "call" and include a signer
# Step 1: Create a Roulette Game
#near call $CONTRACT CreateGame --amount 10 --account_id $OWNER
#step 2: Join the game
#near call $CONTRACT JoinGame '{"_gameId":2675754037,"_guess":true}' --amount 10 --account_id nikhil1969.testnet
# ------------------------
# Step 3 : End the Game
near call $CONTRACT endGame '{"_gameId":2675754037}' --account_id $OWNER

# ------------------------
# the next method writes to storage.  storage is structured as key-value pairs
#near call $CONTRACT saveMyName --account_id $OWNER
# ------------------------


# ------------------------
# these methods use a collection wrapper around blockchain storage
# you can read more about collections here: https://docs.near.org/docs/concepts/data-storage
#near call $CONTRACT saveMyMessage '{"message":"hey again"}' --account_id $OWNER
#near call $CONTRACT getAllMessages --account_id $OWNER
# ------------------------

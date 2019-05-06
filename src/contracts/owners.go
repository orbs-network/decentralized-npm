package main

import (
	"github.com/orbs-network/orbs-contract-sdk/go/sdk/v1"
	"github.com/orbs-network/orbs-contract-sdk/go/sdk/v1/state"
)

var PUBLIC = sdk.Export(addOwner, hasOwner, isOwner, removeOwner)
var SYSTEM = sdk.Export(_init)

func _init() {}

func addOwner(packageName, publicKey string) {}

// this is a current workaround due to lack of support of bool type
func hasOwner(packageName string) uint32 {
	key := []byte(packageName)
	owners := state.ReadBytes(key)
	if len(owners) == 0 {
		return 0
	}
	return 1
}

func isOwner(packageName, publicKey string) bool {
	return false
}

func removeOwner(packageName, publicKey string) {}

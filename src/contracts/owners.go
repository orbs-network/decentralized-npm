package main

import (
	"bytes"

	"github.com/orbs-network/orbs-contract-sdk/go/sdk/v1"
	"github.com/orbs-network/orbs-contract-sdk/go/sdk/v1/address"
	"github.com/orbs-network/orbs-contract-sdk/go/sdk/v1/state"
)

var PUBLIC = sdk.Export(addOwner, getOwners, removeOwner)
var SYSTEM = sdk.Export(_init)

func _init() {}

func getOwners(packageName string) []byte {
	name := []byte(packageName)
	return state.ReadBytes(name)
}

func hasOwner(packageName string) bool {
	owners := getOwners(packageName)
	return len(owners) != 0
}

func isOwner(packageName string, userAddress []byte) bool {
	owners := getOwners(packageName)
	return bytes.Contains(owners, userAddress)
}

func addOwner(packageName string, userAddress []byte) {
	name := []byte(packageName)
	if !hasOwner(packageName) {
		state.WriteBytes(name, address.GetSignerAddress())
	}
	owners := getOwners(packageName)
	if !isOwner(packageName, userAddress) {
		state.WriteBytes(name, append(owners, userAddress...))
	}
}

func removeOwner(packageName string, userAddress []byte) {
	name := []byte(packageName)
	currUser := address.GetSignerAddress()
	if !hasOwner(packageName) {
		return
	}
	if !isOwner(packageName, currUser) {
		return
	}
	owners := getOwners(packageName)
	updatedAddresses := bytes.Join(bytes.Split(owners, userAddress), []byte{})
	if len(updatedAddresses) == 0 {
		return
	}
	state.WriteBytes(name, updatedAddresses)
}

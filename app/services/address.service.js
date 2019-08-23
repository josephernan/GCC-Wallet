var Q = require('q');
var ObjectId = require('mongodb').ObjectID;

var Address = require('../models/address');

var service = {};

service.create = create;
service.update = update;
service.getAddressbyID = getAddressbyID;
service.getAddressbyWalletID = getAddressbyWalletID;

module.exports = service;

function create(data) {
	var deferred = Q.defer();

	var newAddress = Address(data);

	newAddress.save(function(err, address) {
		if (err) {
			deferred.reject(err);
		} else {
			deferred.resolve(address);
		}
	});

	return deferred.promise;
}

function update(id, data) {
	var deferred = Q.defer();

	Address.findOneAndUpdate(new ObjectId(id), data, function(err, address) {
		if (err) {
			deferred.reject(err);
		} else {
			deferred.resolve(address);
		}
	});

	return deferred.promise;
}

function getAddressbyID(id) {
	var deferred = Q.defer();

	Address.findOne(new ObjectId(id), function(err, address) {
		if (err) {
			deferred.reject(err);
		} else if (address) {
			deferred.resolve(address);
		} else {
			deferred.reject({message: "Address not found!"});
		}
	});

	return deferred.promise;
}

function getAddressbyWalletID(data) {
	var deferred = Q.defer();
	Address.findOne({address:data}, function(err, address) {
		if (err) {
			deferred.reject(err);
		} else if (address) {
			deferred.resolve(address);
		} else {
			deferred.reject({message: "Address not found!"});
		}
	});

	return deferred.promise;
}
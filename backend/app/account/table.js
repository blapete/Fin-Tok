const db = require('../../database/models')
const { Op } = require('sequelize')

class AccountTable {
	static storeAccount({ usernameHash, emailHash, passwordHash }) {
		return db.users
			.create({
				usernameHash: usernameHash,
				passwordHash: passwordHash,
				emailHash: emailHash,
			})
			.then((res) => {
				return res
			})
			.catch((e) => {
				throw e
			})
	}

	static getAccount({ usernameHash, emailHash }) {
		if (usernameHash && emailHash) {
			return db.users
				.findAll({
					where: {
						[Op.or]: [{ usernameHash: usernameHash }, { emailHash: emailHash }],
					},
				})
				.then((res) => {
					let thing = res
					return thing
				})
				.catch((e) => {
					throw e
				})
		} else {
			return db.users
				.findAll({
					where: {
						usernameHash: usernameHash,
					},
				})
				.then((res) => {
					let account
					if (res.length > 0) {
						let userFound = JSON.stringify(res[0])
						account = JSON.parse(userFound)
					}
					return account
				})
				.catch((error) => {
					throw error
				})
		}
	}

	static updateSessionId({ sessionId, usernameHash }) {
		return db.users
			.update(
				{
					session_id: sessionId,
				},
				{
					where: {
						usernameHash: usernameHash,
					},
				}
			)
			.then((res) => {
				return res
			})
			.catch((e) => {
				throw e
			})
	}
}

module.exports = AccountTable

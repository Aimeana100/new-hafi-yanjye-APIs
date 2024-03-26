import bcrypt from 'bcrypt'

export class PasswordManager {
  hashPassword(myPlaintextPassword: string) {
    const saltRounds = 10
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {
        if (hash) return hash
        return err
      })
    })
  }
}

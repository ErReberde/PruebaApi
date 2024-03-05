import { hash, compare, genSaltSync, hashSync} from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { LoginUserDto } from 'src/user/dtos/login-user.dto'
import { User } from 'src/user/user.entity'



const configSaltBcrypt ={
    rounds: 10,

}

export const generatePasswordWithSalt =(password:string) : string => {
   
    let salt = genSaltSync(configSaltBcrypt.rounds)

    let hash = hashSync(password, salt)

    return hash
}

export const comparePassword = (passwordGivenForUser:string, passwordDB:string): Promise<boolean> => {

    let resultCompare = compare(passwordGivenForUser, passwordDB)

    return resultCompare
}


export const generateTokenForUser = (user: User) : string => {

    const token = sign({id: user.id, role: user.role}, process.env.SECRET_WORD,{ expiresIn: "2 days"})

    return token
}
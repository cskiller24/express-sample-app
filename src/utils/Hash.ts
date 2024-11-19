import bcrypt from 'bcryptjs'
import 'dotenv/config'

const hashRounds = (): number => {
    return Number(process.env.HASH_ROUNDS) || 8
}

export const hash = async (str: string): Promise<string> => {
    return await bcrypt.hash(str, hashRounds())
}

export const verify = async (str: string, hashedStr: string): Promise<boolean> => { 
    return await bcrypt.compare(str, hashedStr)
}
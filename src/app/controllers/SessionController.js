import * as Yup from 'yup'
import User from '../models/User'
import Jwt from 'jsonwebtoken'
import authConfig from '../../config/auth'

class SessionController {
    async store(req,res){
        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().required(),
        })

        const userEmailOrPasswordIncorrect = () =>{
            return res.status(400).json({ error: 'Make sure your password or email are correct '})
        }

        if (!(await schema.isValid(req.body))) userEmailOrPasswordIncorrect()
       const {email, password} = req.body

       const user = await User.findOne({
        where: { email },
       })

       if (!user) userEmailOrPasswordIncorrect() 

       if(!(await user.checkPassword(password)))userEmailOrPasswordIncorrect()
       

       return res.json({
         id: user.id,
         email,
         name: user.name,
         admin: user.admin,
         token: Jwt.sign({id:user.id },authConfig.secret ,{ expiresIn: authConfig.expiresIn ,
        }),
        })
    }
}

export default new SessionController()
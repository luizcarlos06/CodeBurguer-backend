/*
store => Cadastrar/ Adicionar
index => Listar Vários
show => Listar apenas um
update => atualizar
delete => deletar
*/

import { v4 } from 'uuid'
import User from '../models/User'
import * as Yup from 'yup'

class UserController {
  async store (req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
      admin: Yup.boolean(),
    })

    try{
      await schema.validateSync(req.body, { abortEarly: false })
    } catch(err){
      return res.status(400).json({error: err.errors})
    }
    
    const { name, email, password, admin } = req.body

    const userExists = await User.findOne({
      where: {email},
    })
   
    if(userExists){
      return res.status(400).json({error : 'This email already exists'})
    }

    const user = await User.create({
      id: v4(),
      name,
      email,
      password,
      admin
    })
    return res.status(201).json({ id: user.id, name, email, admin})
  }
}

export default new UserController()

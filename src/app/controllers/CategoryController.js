import * as Yup from 'yup'
import Category from '../models/Category'


class CategoryController{
    async store(req,res){
        const schema = Yup.object().shape({
            name: Yup.string().required(),
        })
        
        try{
            await schema.validateSync(req.body, { abortEarly: false })
        }catch(err){
            return res.status(400).json({error: err.errors})
        }  
            
        const {name} = req.body

        const categoryExists = await Category.findAll({
            where:{
                name
            }
        })
        
        if(categoryExists){
            return res.status(400).json({error: 'Category already exists'})
        }

        const {id} = await Category.create({name,id})

        return res.json(category)
        }catch(err){
            console.log(err);
        }    
    async index (req, res){
        const category = await Category.findAll()
        return res.json(category)
    }
}

export default new CategoryController()




import * as Yup from 'yup'
import Product from '../models/Product'
import Category from '../models/Category'
import User from '../models/User'
class ProductController{
    async store(req,res){
        try{
            const schema = Yup.object().shape({
                name: Yup.string().required(),
                price: Yup.number().required(),
                category_id: Yup.number().required(),
                offer: Yup.boolean(),
            })
            try{
                await schema.validateSync(req.body, { abortEarly: false })
            }catch(err){
                return res.status(400).json({error: err.errors})
            }

            const {admin: isAdmin} = await User.findByPk(req.userId)

            if (!isAdmin) {
                return res.status(401).json()
            }
            

            const {filename:path} = req.file
            const {name, price, category_id , offer} = req.body

            const product = await Product.create({
                name,
                price,
                category_id,
                path,
                offer
            })
            return res.json(product)
        }catch(err){
            console.log(err);
        }
    }
    async index (req, res){
        const products = await Product.findAll({
            include:[
                {
                    model:Category,
                    as:'category',
                    attributes:['id','name']
                }
            ]
        })
        return res.json(products)
    }

    async update(req,res){
        try{
            const schema = Yup.object().shape({
                name: Yup.string(),
                price: Yup.number(),
                category_id: Yup.number(),
                offer: Yup.boolean(),
            })
            try{
                await schema.validateSync(req.body, { abortEarly: false })
            }catch(err){
                return res.status(400).json({error: err.errors})
            }

            const {admin: isAdmin} = await User.findByPk(req.userId)

            if (!isAdmin) {
                return res.status(401).json()
            }
            
            const {id} = req.params

            const product = await Product.findByPk(id)

            if (!product) {
                return res.status(401).json({error: "Make sure your product ID is correct"})
            }

            let path

            if (req.file) {
                path = req.file.filename
            }


            const {name, price, category_id , offer} = req.body

            await Product.update({
                name,
                price,
                category_id,
                path,
                offer
            },
            {
                where:{
                    id
                }
            })
            return res.status(200).json()
        }catch(err){
            console.log(err);
        }
    }
}

export default new ProductController()




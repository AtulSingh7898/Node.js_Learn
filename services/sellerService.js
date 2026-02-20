const mongoose = require('mongoose')
const sellerModel = require('../Models/sellerModel')
const productModel = require('../Models/productModel')

const findSeller = async ({email, mobile,aadhar}) => {
    await sellerModel.findOne({
      $or: [
        { email:email },
        { mobile_number:mobile},
        { aadhar_number: aadhar },
      ],
    })
}

const getAllProductWithSellerDetails = async(id)=>{
    const products = await productModel.aggregate([
        {
            $match:{product_sellers: new mongoose.Types.ObjectId(id)}
        },
        {
            $lookup: {
                from:'sellers',
                let: {sellerId: '$product_sellers'},
                pipeline:[
                    {
                        $match:{
                            $expr:{$eq:['$_id', '$sellerId']}
                        }
                    },
                    {
                        $project:{
                            _id: 0,
                            first_name:1,
                            last_name:1
                        }
                    }
                ],
                as:'sellerDetails'
            }
        },

        // {
        //    $project: { 
        //     // _id:0,
        //     product_name:1
        //    },
        // }

        
    ])
    console.log(products)
    return products
}

const getAllProducts = async (id) => {
    // const products = await productModel.aggregate([
    //     {
    //         $match:{product_sellers: new mongoose.Types.ObjectId(id)}
    //     },
    //     {
    //         $lookup: {
    //             from:'sellers',
    //             let: {sellerId: '$product_sellers'},
    //             pipeline:[
    //                 {
    //                     $match:{
    //                         $expr:{$eq:['$_id', '$sellerId']}
    //                     }
    //                 },
    //                 {
    //                     $project:{
    //                         _id: 0,
    //                         first_name:1,
    //                         last_name:1
    //                     }
    //                 }
    //             ],
    //             as:'sellerDetails'
    //         }
    //     },

    //     // {
    //     //    $project: { 
    //     //     // _id:0,
    //     //     product_name:1
    //     //    },
    //     // }

        
    // ])
    // console.log(products)
    // return products
}




module.exports = {findSeller, getAllProducts , getAllProductWithSellerDetails}
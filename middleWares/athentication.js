import jwt from "jsonwebtoken"

/*export default function authonticateUser (req,res,next){

(req,res,next)=>{
        const header = req.header("Authorization")
        if (header != null){
            const token = header.replace("Bearer ","")
            //console.log(token)

            jwt.verify(token,"i-computers10Batch",
                (error,decoded)=>{
                   if(decoded == null){
                        res.json({
                            message : " Invalid Token Login Again"
                        })
                   }else{
                        req.user = decoded
                        next()
                   }

                } )
         }else{
            next()
        }  
    }
} */
export default function authonticateUser(req, res, next) {

    const header = req.header("Authorization")

    if (header != null) {

        const token = header.replace("Bearer ", "")

        jwt.verify(token, "i-computers10Batch", (error, decoded) => {

            if (error) {
                return res.status(401).json({
                    message: "Invalid Token. Login Again"
                })
            }

            req.user = decoded
            next()
        })

    } else {
        next()
    }
}


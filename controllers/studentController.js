import Student from "../models/students.js"

export function createStudent(req,res){

    if(req.user == null){
        res.status(403).json({
            message : "Unathorized User Acess"

        })
        return
    }
    if(!req.user.isAdmin){
        res.json({
            message : "only Admin Users Can Create Users"

        })
        return
    }

     //console.log(req.body)  
 const newStudent = new Student({
    name : req.body.name,
    age : req.body.age,
    city : req.body.city
 }
 )

 newStudent.save().then(

    ()=> res.json({
        massage : "DATA RECEIVED"
    })
 )

}

export  async function createStudentAsync(){
    try
    
    {const newStudent = new Student({
    name : req.body.name,
    age : req.body.age,
    city : req.body.city
 }
 )

 await newStudent.save(

    ()=> res.json({
        massage : "DATA RECEIVED"
    })
 )

    }catch(error){
        console.error("Error careating Student", error)
    }
}


export function getStudents(req,res){

    Student.find().then(

    (student)=>{

        res.json(student) 
    })

}

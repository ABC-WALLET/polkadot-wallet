const creatAccount =async (name:string,age:number) => {

    const fullName = name + age;

    return fullName
    
}

const getName:string = creatAccount(mulika,2)

console.log(getName)


class Person{
    type  person{
        name:string,
        id:number

    }

    const createUser = (person)=>{
        const username = person.name;
        const id = person.id;

        return username 

    
    }
}